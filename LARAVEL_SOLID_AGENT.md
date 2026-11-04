---
name: laravel-solid-architecture
description: Guidelines, code templates, and instructions for generating and refactoring Laravel applications using the Laravel SOLID Architecture blueprint (Micro-interfaces, Repositories, Services, Form Requests, Enums, Model interfaces, and DI bindings).
---

# Laravel SOLID Architecture Blueprint

Gunakan panduan dan template ini untuk membuat fitur baru, membuat CRUD, atau melakukan refactoring pada aplikasi Laravel sesuai dengan prinsip SOLID.

---

## 1. Aturan & Peran Struktur Folder

1. **`app/Contracts/Interfaces/Eloquent/` (Micro-Interfaces)**
   - Buat interface atomik 1-method untuk setiap operasi data dasar (`GetInterface`, `StoreInterface`, `UpdateInterface`, `DeleteInterface`, `ShowInterface`, `PaginateInterface`).

2. **`app/Contracts/Interfaces/` (Domain Interfaces)**
   - Buat `[Entity]Interface` yang meng-`extend` micro-interface yang dibutuhkan saja.

3. **`app/Contracts/Repositories/` (Data Access Layer)**
   - `BaseRepository`: Kelas abstrak penampung `public Model $model`.
   - `[Entity]Repository`: Mengimplementasikan `[Entity]Interface` dan mewarisi `BaseRepository`. Hanya berisi kueri Eloquent murni.

4. **`app/Services/` (Business Logic & Payload Layer)**
   - Bertanggung jawab memproses data dari `FormRequest`, mengolah upload file/gambar via `UploadTrait`, serta menyiapkan array payload untuk Repository.

5. **`app/Http/Controllers/` (Thin Controllers)**
   - Controller menginjeksi `[Entity]Interface` dan `[Entity]Service` via Constructor.
   - Dilarang menulis kueri Eloquent langsung di Controller.

6. **`app/Http/Requests/` (Validation Layer)**
   - Buat `StoreRequest` dan `UpdateRequest` terpisah untuk setiap domain.

7. **`app/Providers/AppServiceProvider.php` (Dependency Injection Map)**
   - Daftarkan pasangan `Interface::class => Repository::class` di dalam array `$register`.

8. **`app/Base/Interfaces/` & `app/Observers/`**
   - Gunakan `Base/Interfaces/` untuk struktur kontrak Model (seperti `HasUser`, `HasCategory`).
   - Gunakan `Observers/` untuk lifecycle event seperti pembuat slug otomatis.

---

## 2. Template Kode Standard

### A. Micro Interface (`app/Contracts/Interfaces/Eloquent/GetInterface.php`)
```php
<?php

namespace App\Contracts\Interfaces\Eloquent;

interface GetInterface
{
    public function get(): mixed;
}
```

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
}
```

### C. Repository Class (`app/Contracts/Repositories/ProductRepository.php`)
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
        return $this->show($id)->update($data);
    }

    public function delete(mixed $id): mixed
    {
        return $this->show($id)->delete();
    }
}
```

### D. Service Class (`app/Services/ProductService.php`)
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
}
```

### E. Controller Class (`app/Http/Controllers/Dashboard/ProductController.php`)
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
        private ProductInterface $productRepository,
        private ProductService $productService
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
        if ($product->image) {
            $this->productService->remove($product->image);
        }
        $this->productRepository->delete($product->id);

        return back()->with('success', trans('alert.delete_success'));
    }
}
```

### F. Service Provider Binding (`app/Providers/AppServiceProvider.php`)
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

## 3. Langkah Kerja Agent saat Membuat Fitur Baru

Ketika diminta membuat fitur CRUD/Module baru (misal `Product`):
1. **Model & Migration**: Buat di `app/Models/Product.php` & migration DB.
2. **Enum & Observer**: Jika membutuhkan status konstan atau auto-slug.
3. **Domain Interface**: Buat `app/Contracts/Interfaces/ProductInterface.php`.
4. **Repository**: Buat `app/Contracts/Repositories/ProductRepository.php`.
5. **AppServiceProvider**: Daftarkan `ProductInterface::class => ProductRepository::class` ke array `$register`.
6. **Form Requests**: Buat `StoreRequest` & `UpdateRequest` di `app/Http/Requests/...`.
7. **Service**: Buat `app/Services/ProductService.php`.
8. **Controller**: Buat `app/Http/Controllers/.../ProductController.php` dengan Dependency Injection.
