---
name: laravel-testing-suite
description: Comprehensive testing guidelines for Laravel applications using Pest PHP and PHPUnit. Activate when writing unit tests for Repositories and Services, feature tests for HTTP/API endpoints, setting up test factories, mocking dependencies, and ensuring test coverage.
---

# Laravel Testing Suite (Pest & PHPUnit)

Panduan penulisan tes otomatis untuk memastikan keandalan kode pada arsitektur SOLID di Laravel.

---

## 1. Strategi Pengujian (Test Pyramid)

1. **Unit Tests**:
   - Uji logika murni di **Services** (misal kalkulasi diskon, sanitasi string) dan **Repositories** secara terisolasi.
2. **Feature Tests**:
   - Uji end-to-end request lifecycle: route, middleware, FormRequest validation, controller response, dan database assertion.

---

## 2. Testing Repository Layer

Pastikan query Eloquent di Repository bekerja dengan benar terhadap database test:

```php
<?php

use App\Contracts\Repositories\ProductRepository;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new ProductRepository(new Product());
});

it('can retrieve latest products', function () {
    Product::factory()->count(3)->create();

    $results = $this->repository->get();

    expect($results)->toHaveCount(3);
});

it('can store new product', function () {
    $payload = [
        'name'  => 'Mechanical Keyboard',
        'price' => 1500000,
    ];

    $product = $this->repository->store($payload);

    expect($product)->toBeInstanceOf(Product::class);
    $this->assertDatabaseHas('products', ['name' => 'Mechanical Keyboard']);
});
```

---

## 3. Testing Service Layer (dengan Mocking)

Ketika Service menangani upload file atau integrasi eksternal, gunakan Mocking atau Storage fake:

```php
<?php

use App\Http\Requests\Dashboard\Product\StoreRequest;
use App\Services\ProductService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('uploads image and prepares data payload', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->image('keyboard.jpg');
    
    // Mock Form Request
    $request = Mockery::mock(StoreRequest::class);
    $request->shouldReceive('validated')->once()->andReturn([
        'name' => 'Test Product',
        'price' => 50000,
    ]);
    $request->shouldReceive('hasFile')->with('image')->once()->andReturn(true);
    $request->shouldReceive('file')->with('image')->once()->andReturn($file);

    $service = new ProductService();
    $payload = $service->store($request);

    expect($payload['name'])->toBe('Test Product')
        ->and($payload['image'])->not->toBeEmpty();
});
```

---

## 4. Testing Feature / API Endpoints

Feature test untuk endpoint HTTP / JSON:

```php
<?php

use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns list of products for authenticated user', function () {
    $user = User::factory()->create();
    Product::factory()->count(2)->create();

    $response = $this->actingAs($user)
        ->getJson('/api/v1/products');

    $response->assertOk()
        ->assertJsonStructure([
            'success',
            'data' => [
                '*' => ['id', 'name', 'price']
            ]
        ]);
});

it('fails validation when creating product with missing fields', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->postJson('/api/v1/products', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'price']);
});
```

---

## 5. Checklist Sebelum Commit Test
- [ ] Selalu gunakan trait `RefreshDatabase` pada feature test yang menyentuh DB.
- [ ] Hindari hardcoded ID, selalu gunakan Model Factory (`Product::factory()->create()`).
- [ ] Gunakan `Storage::fake()` jika menguji upload file agar tidak mengotori disk asli.
- [ ] Jalankan tes dengan perintah `php artisan test` atau `./vendor/bin/pest`.
