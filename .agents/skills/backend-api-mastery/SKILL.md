---
name: backend-api-mastery
description: Architectural standards and engineering best practices for building robust REST APIs with Laravel. Activate when designing API endpoints, formatting JSON responses (JsonResource), configuring authentication (Sanctum), handling exceptions, rate limiting, and managing asynchronous background queues.
---

# Laravel REST API Engineering Guide

Panduan standar pembuatan RESTful API modern di Laravel dengan respons konsisten, autentikasi aman, dan pemrosesan asinkron.

---

## 1. Standarisasi Format JSON Response

Semua endpoint API harus mengembalikan format response yang konsisten:

### A. Success Response Helper / Structure
```json
{
  "success": true,
  "message": "Resource retrieved successfully.",
  "data": {
    "id": 1,
    "name": "Mechanical Keyboard",
    "price": 1500000
  },
  "meta": {
    "timestamp": 1729864200
  }
}
```

### B. Error Response Structure
```json
{
  "success": false,
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field is required."
    ]
  }
}
```

### C. Standard Trait (`app/Traits/ApiResponse.php`)
```php
<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponse
{
    public function success(mixed $data = null, string $message = 'Success', int $statusCode = Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ], $statusCode);
    }

    public function error(string $message = 'Error', int $statusCode = Response::HTTP_BAD_REQUEST, mixed $errors = null): JsonResponse
    {
        $payload = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $payload['errors'] = $errors;
        }

        return response()->json($payload, $statusCode);
    }
}
```

---

## 2. API Resources (DTO & Data Masking)

Jangan pernah mengembalikan Eloquent Model secara langsung ke client untuk mencegah kebocoran atribut sensitif (`password`, `remember_token`, secret internal).
Gunakan `JsonResource`:

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'slug'        => $this->slug,
            'price'       => (float) $this->price,
            'image_url'   => $this->image ? asset('storage/' . $this->image) : null,
            'created_at'  => $this->created_at?->toIso8601String(),
        ];
    }
}
```

---

## 3. Autentikasi & Otorisasi (Laravel Sanctum)

- Gunakan Laravel Sanctum untuk SPA atau Mobile Token Auth.
- Simpan token di header: `Authorization: Bearer <token>`.
- Batasi masa berlaku token atau gunakan personal access token dengan ability/scope terarah:
  ```php
  $user->createToken('auth-token', ['read:products', 'create:orders'])->plainTextToken;
  ```
- Lindungi routes menggunakan middleware `auth:sanctum` dan abilities middleware jika spesifik peran:
  ```php
  Route::middleware(['auth:sanctum', 'ability:create:orders'])->group(function () {
      Route::post('/orders', [OrderController::class, 'store']);
  });
  ```

---

## 4. Rate Limiting & Keamanan

Konfigurasi pembatasan kueri di `AppServiceProvider` atau `RouteServiceProvider`:
```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

RateLimiter::for('auth', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});
```

---

## 5. Background Jobs untuk Operasi Berat (> 200ms)

Operasi seperti pengiriman email, generate PDF, sinkronisasi payment gateway pihak ketiga, atau image resizing harus diproses via Queue:
```php
SendInvoiceEmailJob::dispatch($order)->onQueue('emails');
```
Pastikan class Job mengimplementasikan interface `ShouldQueue` dan memiliki konfigurasi retry / exponential backoff:
```php
public int $tries = 3;
public int $backoff = 60;
```
