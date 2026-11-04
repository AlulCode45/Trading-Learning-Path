# Workspace Rule: Coding Standards, Security & Performance Guidelines

Aturan standar pengembangan kode pada workspace ini:

## 1. PHP 8.2+ & Type Safety
- **Strict Types**: Wajib menggunakan deklarasi tipe lengkap untuk parameter method, return type, dan class properties.
- **Constructor Promotion**: Gunakan PHP 8 constructor property promotion untuk dependency injection:
  ```php
  public function __construct(
      private readonly ProductInterface $productRepository,
      private readonly ProductService $productService,
  ) {}
  ```
- Hindari penggunaan type `mixed` jika tipe spesifik dapat didefinisikan (misal `Product`, `Collection`, `int`, `string`).

## 2. Prinsip SOLID & Laravel Architecture
- **Single Responsibility**: Pisahkan logika validasi ke FormRequest, manipulasi payload/file ke Service, dan kueri data ke Repository.
- **Dependency Inversion**: Controller hanya boleh bergantung pada Interface abstraksi, bukan konkret class Repository.
- **Dilarang**: Menulis kueri Eloquent langsung (seperti `Product::where(...)`) di dalam Controller.

## 3. Keamanan Sistem & Anti-Exploit (Zero Vulnerability)
- **SQL Injection**: Selalu gunakan query binding atau Eloquent builder. Dilarang konkatenasi string mentah ke kueri SQL.
- **IDOR Protection**: Selalu verifikasi hak akses pengguna terhadap resource via Laravel Policy / Gate (`authorize('update', $model)`).
- **XSS & CSRF**: Sanitasi seluruh input pengguna, jangan gunakan render unescaped HTML (`{!! $var !!}`) untuk input pengguna. Pastikan token CSRF aktif pada form dan AJAX request.
- **Mass Assignment**: Selalu tentukan properti `$fillable` secara eksplisit pada setiap Model Eloquent.

## 4. Frontend & SEO Best Practices
- **SEO Mandatory**: Satu `<h1>` semantik per halaman, tag `<title>` deskriptif, meta description relevan, OpenGraph metadata, dan alt text pada gambar.
- **Aksesibilitas & Performa**: Enforce WCAG 2.1 AA (contrast, keyboard focus), prioritaskan Core Web Vitals (LCP cepat, zero CLS).

## 5. Penyelesaian Tuntas & Bebas Error (Zero Error)
- Setiap task atau perbaikan modul harus diselesaikan tuntas tanpa meninggalkan sintaks error, runtime exception, atau broken tests.
- Dilarang mengubah kode di luar konteks yang diminta pengguna.
