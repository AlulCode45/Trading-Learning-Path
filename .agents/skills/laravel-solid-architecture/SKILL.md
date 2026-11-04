---
name: laravel-solid-architecture
description: Guidelines, code templates, and step-by-step procedures for building and refactoring Laravel applications using the Laravel SOLID Architecture blueprint (Micro-interfaces, Repositories, Services, Form Requests, Enums, Model interfaces, and DI bindings). Activate whenever creating CRUD modules, business logic services, or refactoring controllers in Laravel.
---

# Laravel SOLID Architecture Blueprint

Gunakan panduan dan template ini untuk membuat fitur baru, CRUD, atau melakukan refactoring pada aplikasi Laravel agar konsisten, decoupled, dan mudah di-test sesuai prinsip SOLID.

---

## 1. Arsitektur Folder & Tanggung Jawab (Separation of Concerns)

```text
app/
├── Base/
│   └── Interfaces/              # Kontrak Model reusable (e.g. HasUser, HasCategory, HasSlug)
├── Contracts/
│   ├── Interfaces/
│   │   ├── Eloquent/            # Micro-Interfaces atomik 1-method
│   │   │   ├── GetInterface.php
│   │   │   ├── StoreInterface.php
│   │   │   ├── UpdateInterface.php
│   │   │   ├── DeleteInterface.php
│   │   │   ├── ShowInterface.php
│   │   │   └── PaginateInterface.php
│   │   └── [Entity]Interface.php# Domain Interface (meng-extend micro-interfaces yang relevan)
│   └── Repositories/
│       ├── BaseRepository.php   # Abstract class penampung property Model
│       └── [Entity]Repository.php # Implementasi kueri Eloquent murni
├── Http/
│   ├── Controllers/             # Thin Controller (hanya memanggil Service & Repository)
│   └── Requests/                # Validation Layer terpisah (StoreRequest, UpdateRequest)
├── Models/                      # Eloquent Model & relasi relasional murni
├── Observers/                   # Model lifecycle hooks (misal: auto-generate slug, cleanup)
├── Providers/
│   └── AppServiceProvider.php   # Dependency Injection mapping ($register array)
├── Services/                    # Business Logic, file upload handling, & data transformation
└── Traits/                      # Reusable traits (misal: UploadTrait)
```

---

## 2. Standard Code Templates

### A. Micro Interface (`app/Contracts/Interfaces/Eloquent/GetInterface.php`)
```php
<?php

namespace App\Contracts\Interfaces\Eloquent;

interface GetInterface
{
    public function get(): mixed;
}
```

Tersedia micro-interface atomik lainnya:
- `StoreInterface`: `public function store(array $data): mixed;`
- `UpdateInterface`: `public function update(mixed $id, array $data): mixed;`
- `DeleteInterface`: `public function delete(mixed $id): mixed;`
- `ShowInterface`: `public function show(mixed $id): mixed;`
- `PaginateInterface`: `public function paginate(int $perPage = 15): mixed;`

### B. Domain Interface (`app/Contracts/Interfaces/ProductInterface.php`)
```php
<?php

namespace App\Contracts\Interfaces;

use App\Contracts\Interfaces\Eloquent\DeleteInterface;
use App\Contracts\Interfaces\Eloquent\GetInterface;
use App\Contracts\Interfaces\Eloquent\ShowInterface;
use App\Contracts\Interfaces\Eloquent\StoreInterface;
use App\Contracts\Interfaces\Eloquent\UpdateInterface;

interface ProductInterface extends GetInterface, StoreInterface, UpdateInterface, DeleteInterface, ShowInterface
{
    // Tambahkan custom query method spesifik domain jika ada, contoh:
    // public function getActiveProducts(): mixed;
}
```

### C. Base Repository (`app/Contracts/Repositories/BaseRepository.php`)
```php
<?php

namespace App\Contracts\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    protected Model $model;

    public function getModel(): Model
    {
        return $this->model;
    }
}
```

### D. Repository Implementation (`app/Contracts/Repositories/ProductRepository.php`)
```php
<?php

namespace App\Contracts\Repositories;

use App\Contracts\Interfaces\ProductInterface;
use App\Models\Product;

class ProductRepository extends BaseRepository implements ProductInterface
{
    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    public function get(): mixed
    {
        return $this->model->query()
            ->latest()
            ->get();
    }

    public function show(mixed $id): mixed
    {
        return $this->model->query()->findOrFail($id);
    }

    public function store(array $data): mixed
    {
        return $this->model->query()->create($data);
    }

    public function update(mixed $id, array $data): mixed
    {
        $record = $this->show($id);
        $record->update($data);
        return $record;
    }

    public function delete(mixed $id): mixed
    {
        return $this->show($id)->delete();
    }
}
```

### E. Service Class (`app/Services/ProductService.php`)
```php
<?php

namespace App\Services;

use App\Http\Requests\Dashboard\Product\StoreRequest;
use App\Http\Requests\Dashboard\Product\UpdateRequest;
use App\Models\Product;
use App\Traits\UploadTrait;

class ProductService
{
    use UploadTrait;

    public function store(StoreRequest $request): array
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->upload('products', $request->file('image'));
        }

        return $data;
    }

    public function update(UpdateRequest $request, Product $product): array
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($product->image) {
                $this->remove($product->image);
            }
            $data['image'] = $this->upload('products', $request->file('image'));
        }

        return $data;
    }

    public function delete(Product $product): void
    {
        if ($product->image) {
            $this->remove($product->image);
        }
    }
}
```

### F. Thin Controller (`app/Http/Controllers/Dashboard/ProductController.php`)
```php
<?php

namespace App\Http\Controllers\Dashboard;

use App\Contracts\Interfaces\ProductInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Product\StoreRequest;
use App\Http\Requests\Dashboard\Product\UpdateRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductInterface $productRepository,
        private readonly ProductService $productService
    ) {}

    public function index(): View
    {
        $products = $this->productRepository->get();
        return view('dashboard.pages.products.index', compact('products'));
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $payload = $this->productService->store($request);
        $this->productRepository->store($payload);

        return to_route('products.index')->with('success', trans('alert.add_success'));
    }

    public function update(UpdateRequest $request, Product $product): RedirectResponse
    {
        $payload = $this->productService->update($request, $product);
        $this->productRepository->update($product->id, $payload);

        return to_route('products.index')->with('success', trans('alert.update_success'));
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->productService->delete($product);
        $this->productRepository->delete($product->id);

        return back()->with('success', trans('alert.delete_success'));
    }
}
```

### G. Service Provider Binding (`app/Providers/AppServiceProvider.php`)
```php
<?php

namespace App\Providers;

use App\Contracts\Interfaces\ProductInterface;
use App\Contracts\Repositories\ProductRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    private array $register = [
        ProductInterface::class => ProductRepository::class,
    ];

    public function register(): void
    {
        foreach ($this->register as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
    }
}
```

---

## 3. Workflow Langkah Kerja Agent saat Membuat Fitur Baru

Ikuti urutan berikut secara disiplin saat membuat CRUD/Fitur baru:
1. **Migration & Model**: Buat di `database/migrations/` dan `app/Models/`. Tentukan cast dan relasi.
2. **Enum & Observer**: Jika ada kolom status/tipe konstan, buat PHP 8.1+ backed enum. Jika ada lifecycle action (slug/cleanup), buat Observer.
3. **Domain Interface**: Definisikan `app/Contracts/Interfaces/[Entity]Interface.php` meng-extend micro-interfaces yang dibutuhkan.
4. **Repository**: Implementasikan `app/Contracts/Repositories/[Entity]Repository.php` meng-extend `BaseRepository`.
5. **DI Binding**: Daftarkan pasangan Interface => Repository di `app/Providers/AppServiceProvider.php`.
6. **Form Requests**: Buat `StoreRequest` & `UpdateRequest` dengan rules validasi lengkap.
7. **Service Layer**: Buat `app/Services/[Entity]Service.php` untuk manipulasi payload & asset upload.
8. **Controller**: Buat thin controller dengan Constructor Dependency Injection.
