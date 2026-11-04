---
name: database-architect
description: Comprehensive database engineering and schema design for relational databases (MySQL, PostgreSQL, SQLite) and Redis caching within Laravel applications. Activate when designing migrations, optimizing slow queries (EXPLAIN), preventing N+1 problems, indexing tables, or managing cache strategies.
---

# Database Architecture & Migration Best Practices

Panduan arsitektur basis data, desain skema, migrasi Laravel, optimasi kueri, dan strategi indexing performa tinggi.

---

## 1. Desain Skema & Laravel Migrations

### A. Konvensi Primary Key & Tipe Data
- Gunakan `id()` (`BIGINT UNSIGNED AUTO_INCREMENT`) untuk skema standar, atau `uuid()` / `ulid()` untuk data terdistribusi atau data sensitif publik.
- Gunakan tipe data se-spesifik mungkin:
  - Jangan gunakan `VARCHAR(255)` untuk enum atau status singkat; gunakan `string('status', 30)` atau unsigned tinyInteger.
  - Untuk mata uang/uang, **selalu gunakan integer (dalam sen)** atau `decimal('amount', 12, 2)`. Jangan gunakan float atau double!

### B. Foreign Key Constraints
- Selalu definisikan foreign key secara eksplisit dengan cascade behavior yang terukur:
  ```php
  $table->foreignId('user_id')
        ->constrained('users')
        ->cascadeOnDelete();
  ```
- Untuk relasi opsional:
  ```php
  $table->foreignId('category_id')
        ->nullable()
        ->constrained('categories')
        ->nullOnDelete();
  ```

---

## 2. Strategi Indexing Performa Tinggi

### A. Aturan ESR (Equality, Sort, Range)
Saat membuat composite index untuk filter query kompleks, urutkan kolom berdasarkan:
1. **Equality (`=`)**: Kolom yang dicocokkan dengan nilai pasti pertama kali.
2. **Sort (`ORDER BY`)**: Kolom yang digunakan untuk pengurutan.
3. **Range (`>`, `<`, `BETWEEN`, `LIKE 'abc%'`)**: Kolom rentang di posisi terakhir.

Contoh kasus query:
```php
Product::where('status', 'active')
    ->where('price', '>=', 50000)
    ->orderBy('created_at', 'desc')
    ->get();
```
Index migration yang tepat:
```php
$table->index(['status', 'created_at', 'price'], 'idx_products_status_created_price');
```

### B. Index pada Kolom Pencarian & Status
- Kolom yang sering dijadikan klausa `WHERE`, `JOIN`, atau `ORDER BY` wajib diindeks.
- Jika menggunakan `SoftDeletes`, perhatikan bahwa query otomatis menambahkan `WHERE deleted_at IS NULL`. Pertimbangkan composite index yang menyertakan `deleted_at`.

---

## 3. Pencegahan Masalah N+1 & Query Tuning

### A. Eager Loading Wajib
- Jangan pernah memanggil relasi di dalam loop Blade atau Collection:
  ```php
  // BURUK: Menghasilkan N+1 Query
  $posts = Post::all();
  foreach ($posts as $post) {
      echo $post->author->name;
  }

  // BAIK: Eager Loading
  $posts = Post::with(['author', 'category'])->get();
  ```
- Gunakan `loadCount()` atau `withCount()` untuk agregasi jumlah tanpa menarik seluruh data record:
  ```php
  $categories = Category::withCount('products')->get();
  ```

### B. Kueri Diagnostik (EXPLAIN)
- Cek kueri lambat di MySQL/PostgreSQL menggunakan `EXPLAIN`:
  ```php
  DB::enableQueryLog();
  // ... run query ...
  dd(DB::getQueryLog());
  ```
- Hindari **Full Table Scan (ALL)** pada tabel dengan jutaan record.

---

## 4. Redis Caching & Cache Invalidation

1. **Cache-Aside Pattern**:
   ```php
   $products = Cache::remember('products.popular', now()->addHours(6), function () {
       return Product::where('is_featured', true)->latest()->take(10)->get();
   });
   ```
2. **Explicit Cache Invalidation**:
   - Selalu bersihkan cache terkait saat terjadi mutasi data (create, update, delete) via Service atau Model Observer:
   ```php
   Cache::forget('products.popular');
   ```
