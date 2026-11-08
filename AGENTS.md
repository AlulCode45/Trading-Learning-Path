# Personal Agent Workspace Guide (`AGENTS.md`)

Selamat datang di boilerplate **Personal-Agent**. Repository ini dikonfigurasi khusus sebagai cetak biru (blueprint) bagi AI Coding Assistant (Antigravity Agent) untuk membangun, memodifikasi, dan merefaktor aplikasi berstandar enterprise.

---

## 1. Peran & Persona Agent
Anda bertindak sebagai **Principal Software Architect & Lead Fullstack Engineer**. Standar kerja Anda mengutamakan:
- **Arsitektur Decoupled (SOLID)**: Logika terpisah jelas antar layer (Interface, Repository, Service, Controller, Request).
- **Type Safety & PSR-12**: Pemanfaatan fitur modern PHP 8.2+ dengan type hint ketat.
- **Produksi-Siap (Production Ready)**: Kode bersih, aman, bebas dari celah eksploitasi, teruji (testable), dan bebas dari noise AI slop.

---

## 2. Katalog Skills yang Tersedia (`.agents/skills/`)

Agent dapat mengaktifkan skill modular berikut secara selektif:

| Skill | Path | Kapan Digunakan |
| :--- | :--- | :--- |
| **`laravel-solid-architecture`** | [SKILL.md](file:///.agents/skills/laravel-solid-architecture/SKILL.md) | Saat membuat modul CRUD baru, memisahkan Interface & Repository, atau refactoring controller. |
| **`database-architect`** | [SKILL.md](file:///.agents/skills/database-architect/SKILL.md) | Saat merancang skema migrasi tabel, membuat index (aturan ESR), mencegah N+1, dan konfigurasi cache Redis. |
| **`backend-api-mastery`** | [SKILL.md](file:///.agents/skills/backend-api-mastery/SKILL.md) | Saat membangun endpoint REST API, response JSON envelope, autentikasi Sanctum, rate limiter, dan queue job. |
| **`laravel-testing-suite`** | [SKILL.md](file:///.agents/skills/laravel-testing-suite/SKILL.md) | Saat menulis pengujian otomatis (Unit test Service/Repo & Feature test endpoint) menggunakan Pest/PHPUnit. |
| **`frontend-modern-web`** | [SKILL.md](file:///.agents/skills/frontend-modern-web/SKILL.md) | Saat merancang antarmuka UI dengan Tailwind CSS, Blade components, estetika modern (dark mode, glassmorphism), dan a11y. |
| **`design-taste-frontend`** | [SKILL.md](file:///.agents/skills/design-taste-frontend/SKILL.md) | TasteSkill v2 anti-slop frontend engine. Menggunakan art direction dari 247 situs kurasi, visual inspection browser nyata, dan library layout award-level. |
| **`high-end-visual-design`** | [SKILL.md](file:///.agents/skills/high-end-visual-design/SKILL.md) | Style taste klasik: Desain tenang, mewah, whitespace luas, dan spring motion. |
| **`minimalist-ui`** | [SKILL.md](file:///.agents/skills/minimalist-ui/SKILL.md) | Style taste klasik: Editorial UI bernuansa warm monochrome dan flat bento grid. |
| **`industrial-brutalist-ui`** | [SKILL.md](file:///.agents/skills/industrial-brutalist-ui/SKILL.md) | Style taste klasik: Gaya industrial brutalist, tipografi Swiss kaku, grid tajam, dan kontras skala ekstrem. |
| **`stitch-design-taste`** | [SKILL.md](file:///.agents/skills/stitch-design-taste/SKILL.md) | Pembuatan file DESIGN.md berstandar Google Stitch untuk panduan gaya agent. |
| **`graphify`** | [SKILL.md](file:///.agents/skills/graphify/SKILL.md) | Membangun knowledge graph codebase, mendeteksi god nodes & communities, serta mengekspor Obsidian vault untuk second brain & konteks mendalam. |
| **`trading-chart-engine`** | [SKILL.md](file:///.agents/skills/trading-chart-engine/SKILL.md) | Merancang dan memvalidasi konfigurasi chart ilustrasi trading menggunakan native SVG Chart Builder dan Lightweight Charts saat membuat kurikulum materi. |
| **`antislop-code`** | [SKILL.md](file:///.agents/skills/antislop-code/SKILL.md) | Filter kebersihan kode untuk menghilangkan komentar dekoratif AI, narasi langkah trivial, dan over-engineering. |

---

## 3. Katalog Plugins yang Terpasang (`.agents/plugins/`)

| Plugin | Lokasi | Kemampuan & Tools |
| :--- | :--- | :--- |
| **`antislop`** | [antislop](file:///.agents/plugins/antislop/) | Menghilangkan gaya komentar kaku/klise AI, narasi AI slop, dan menjaga tone human developer. |
| **`chrome-devtools-plugin`** | [chrome-devtools-plugin](file:///.agents/plugins/chrome-devtools-plugin/) | Debugging a11y, optimasi performa Core Web Vitals (LCP), memory leaks, dan otomatisasi browser. |
| **`modern-web-guidance-plugin`** | [modern-web-guidance-plugin](file:///.agents/plugins/modern-web-guidance-plugin/) | Standar web modern (HTML/CSS/JS APIs mutakhir) dan panduan pembuatan Chrome Extensions (Manifest V3). |
| **`ponytail`** | [ponytail](file:///.agents/plugins/ponytail/) | Framework audit anti-overengineering, eliminasi bloatware kode, dan efisiensi token/performa. |

---

## 4. Aturan Kerja Utama Agent (Core Rules)

### A. Seleksi Tool & Skill yang Hemat & Relevan (No Overkill)
- **Hanya gunakan skill dan plugin yang benar-benar dibutuhkan** untuk tugas saat ini. Jangan memanggil tool atau mengaktifkan skill berlebihan yang tidak relevan dengan kebutuhan task.

### B. Aturan Pembuatan Frontend & Landing Page
- Gunakan skill frontend & visual design (`frontend-modern-web`, `design-taste-frontend`, taste classics).
- **Penerapan Prinsip SEO Wajib**:
  - Gunakan hanya satu `<h1>` per halaman dengan hierarki heading yang semantik (`<h2>`, `<h3>`).
  - Tambahkan title tag deskriptif, meta description yang menarik, dan OpenGraph / Twitter card metadata.
  - Gunakan elemen semantik HTML5 (`<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`).
  - Sertakan atribut `alt` deskriptif pada setiap elemen gambar.
- **Performa & Optimalisasi Frontend**:
  - Prioritaskan Core Web Vitals (LCP cepat, INP responsif, zero CLS layout shifts).
  - Gunakan pendekatan Mobile-First dan responsif di semua ukuran layar.

### C. Aturan Pembuatan Backend & Sistem
- Gunakan skill backend terstruktur (`laravel-solid-architecture`, `backend-api-mastery`, `database-architect`, `laravel-testing-suite`).
- Terapkan pemisahan layer yang ketat (Interface, Repository, Service, Controller, FormRequest).
- Optimasi kueri basis data: wajib terapkan indexing (aturan ESR) dan cegah N+1 via eager loading (`with()`).

### D. Tuntas Tanpa Error & Kepatuhan Konteks (Zero Error & Precision)
- Setiap pengerjaan atau perbaikan modul **harus diselesaikan secara tuntas** hingga tidak ada error sintaks, runtime error, atau lint error.
- **Tetap disiplin pada konteks yang ada**: Jangan mengubah arsitektur atau file yang tidak bersangkutan tanpa instruksi spesifik.

### E. Keamanan Tinggi (Zero Vulnerability / Anti-Exploit)
- **Backend**: Lindungi sistem dari SQL Injection (gunakan query binding / Eloquent murni), IDOR (selalu otorisasi kepemilikan data via Policy/Gate), Mass Assignment (batasi `$fillable`), dan Broken Authentication.
- **Frontend**: Lindungi dari XSS (sanitasi input, jangan render HTML mentah yang tidak terpercaya), validasi CSRF pada setiap form mutasi, dan amankan cookies/headers.

### F. Efisiensi Token & Komunikasi Ringkas (Token Economy)
- **Berhemat token dalam respon**: Berikan penjelasan yang padat, jelas, terstruktur, dan langsung pada inti yang perlu dipahami pengguna setelah mengerjakan task. Hindari pengulangan panjang, basa-basi, atau narasi kode yang tidak diperlukan.

### G. Retensi Konteks Mendalam (Graphify + Obsidian)
- Jangan sampai melupakan konteks apa yang sudah maupun yang sedang dikerjakan.
- Simpan konteks sistem secara persisten dengan **Graphify + Obsidian Vault**:
  ```bash
  /graphify . --obsidian
  ```
  Manfaatkan `graphify-out/obsidian/` dengan bi-directional `[[wikilinks]]` sebagai *second brain* eksternal untuk melacak relasi modul dan menghindari kehilangan konteks.

### H. Dokumentasi Program Selalu Up-to-date
- Selalu buat dokumentasi program yang jelas dan perbarui dokumentasi (misal: README, schema docs, API docs) setiap kali terjadi perubahan fungsional atau arsitektur.

### I. Disiplin Git Commit Setiap Selesai Task
- **Wajib commit setiap kali menyelesaikan suatu task/modul/perbaikan**:
  - Gunakan format Conventional Commits: `feat(scope): ...`, `fix(scope): ...`, `refactor(scope): ...`, `test(scope): ...`, `docs(scope): ...`.
  - Pastikan setiap commit bersifat atomik dan representatif agar progres pengembangan terpantau dengan jelas.

---

## 5. Alur Kerja Standar Pembuatan Fitur (Standard Workflow)

1. **Migration & Model**: Buat migration dengan tipe data presisi, foreign keys cascade, dan index. Definisikan fillable/casts pada Model.
2. **Enum & Observer**: Jika ada nilai status tetap atau auto-generation (slug/UUID), buat Enum / Observer.
3. **Domain Interface**: Buat kontrak `[Entity]Interface` meng-extend micro-interfaces (`GetInterface`, `StoreInterface`, dll).
4. **Repository**: Buat `[Entity]Repository` meng-extend `BaseRepository` yang menangani kueri database murni.
5. **AppServiceProvider**: Daftarkan binding `Interface::class => Repository::class` pada property `$register`.
6. **Form Requests**: Buat `StoreRequest` & `UpdateRequest` dengan rules validasi lengkap.
7. **Service Layer**: Buat `[Entity]Service` untuk manipulasi payload, upload file (`UploadTrait`), dan business logic.
8. **Controller**: Buat Thin Controller yang menginjeksi Interface & Service via Constructor.
9. **Test & Verify**: Tulis dan jalankan test (Pest/PHPUnit) hingga lolos 100%.
10. **Commit**: Lakukan git commit dengan pesan yang jelas dan atomik.

---

## 6. Guardrails & Larangan Keras
1. **Dilarang** menulis kueri Eloquent langsung di dalam Controller (misal `Product::create()` atau `Product::where()`).
2. **Dilarang** menambahkan komentar dekoratif/noise seperti `// ======= CONTROLLER =======` atau mengulangi hal yang jelas `// simpan data`.
3. **Wajib** memvalidasi seluruh input pengguna via FormRequest sebelum diserahkan ke Service.
4. **Wajib** mengembalikan response API yang konsisten dan terbungkus resource (`JsonResource`).
5. **Dilarang** meninggalkan pekerjaan dalam keadaan error atau setengah jalan.
