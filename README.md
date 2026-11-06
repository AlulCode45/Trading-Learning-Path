# Trading Learning Path

[![License: MIT](https://img.shields.io/badge/License-MIT-10B981.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC.svg)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Runtime-Bun_%2F_Node-FBF0DF.svg)](https://bun.sh/)

**Trading Learning Path** adalah platform edukasi terbuka (*open-source*) berupa **Visual Interactive Roadmap & Technical Documentation Atlas** untuk mempelajari perdagangan pasar finansial secara sistematis—terinspirasi oleh arsitektur kurikulum terbuka seperti `roadmap.sh`.

Dirancang untuk memutus kebisingan informasi di media sosial dengan menyediakan jalur belajar berurutan (*Directed Acyclic Graph / Node-based*), dokumentasi teknis mendalam, kalkulator manajemen risiko interaktif, serta studio pembuatan peta jalan dan chart kustom bagi komunitas.

---

## ✨ Fitur Utama

- **🗺️ Interactive Visual Roadmaps (`/roadmaps`)**
  - Peta jalur belajar berstruktur node (*prerequisite*, *core*, *optional*) dengan pelacakan progres (`not_started`, `in_progress`, `completed`, `skipped`).
  - 5 Kurikulum Utama bawaan:
    1. **Price Action & Market Structure** (Auction Market Theory, BOS/CHoCH, Liquidity Sweep, Multi-Timeframe).
    2. **Smart Money Concepts (SMC) & ICT** (Order Blocks, Fair Value Gap, Premium/Discount Array, Killzones).
    3. **Wyckoff Method & Volume Spread Analysis (VSA)** (Hukum Wyckoff, Siklus Akumulasi/Distribusi, Spring & UTAD).
    4. **Risk Management & Trading Psychology** (Position Sizing, Drawdown Math, Expectancy, Psikologi Eksekusi).
    5. **Quantitative & Algorithmic Trading** (Time-Series Analysis, Backtesting Bias, Sistem Otomatis).
- **📚 Technical Documentation Hub (`/docs`)**
  - Pembaca dokumentasi 3-kolom lengkap dengan daftar isi (*Table of Contents*), studi kasus riil, kesalahan fatal (*common pitfalls*), kuis evaluasi pemahaman per modul, serta diagram visual & chart interaktif.
- **🎨 Studio Pembuat Roadmap & Chart Kustom (`/roadmaps/create`)**
  - **Roadmap Graph Studio**: Editor kanvas interaktif untuk merancang node, mengatur cabang pembelajaran, dan menghubungkan modul.
  - **Custom Chart Builder**: Studio kanvas untuk menyusun template candlestick, anotasi zona *Supply/Demand*, garis struktur (`BOS`/`CHoCH`), dan label likuiditas.
  - **Module Doc Studio**: Editor multi-bab (*multi-chapter*) dengan dukungan WYSIWYG Markdown yang langsung tersinkronisasi dengan halaman `/docs`.
- **🧪 Trading Playground & Simulator (`/playground`)**
  - Simulasi struktur pasar interaktif, kalkulator ukuran posisi (*Position Sizing & Risk Calculator*), dan eksperimen skenario *Risk-to-Reward*.
- **🌐 Community Hub (`/community`)**
  - Publikasikan roadmap buatan sendiri, lakukan *fork* dari roadmap komunitas, berikan *upvote*, dan baca artikel dokumentasi yang ditulis oleh kontributor.
- **🌓 Dark & Light Mode Penuh**
  - Antarmuka adaptif berstandar *Institutional Financial Atlas* yang nyaman dibaca di mode gelap maupun terang.

---

## 🏗️ Arsitektur & Tech Stack

Proyek ini dibangun dengan arsitektur *decoupled* antara Frontend SPA dan Backend REST API:

| Layer | Teknologi |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, React Router v7, Tailwind CSS v4, Lucide Icons, Lightweight Charts |
| **Backend API** | Express 5 (TypeScript), dijalankan di atas **Bun** (dengan fallback kompatibilitas SQLite) |
| **Database** | SQLite (Mode `WAL` berkecepatan tinggi via `bun:sqlite` / `better-sqlite3`) |
| **Arsitektur Server** | Layered Architecture (`Controller` → `Service` → `Repository` → `Database Seed & Schema`) |
| **Build Tool** | Vite 8 |

---

## 📂 Struktur Direktori

```text
Trading-Learning-Path/
├── data/                       # File database SQLite lokal (auto-generated saat server berjalan)
├── docs/                       # Dokumentasi teknis & backlog pengembangan
├── server/                     # Backend REST API (Express + SQLite)
│   ├── controllers/            # HTTP Request/Response handlers (RoadmapController)
│   ├── services/               # Business logic layer (RoadmapService)
│   ├── repositories/           # Data access & SQL queries (RoadmapRepository)
│   ├── db/                     # Inisialisasi skema SQLite & data seeding kurikulum
│   └── index.ts                # Entry point API server (Port 3001)
├── src/                        # Frontend React Application
│   ├── components/             # Komponen UI modular
│   │   ├── chart-builder/      # Studio pembuat candlestick & anotasi teknikal
│   │   ├── docs-builder/       # Studio penulis bab dokumentasi modul
│   │   ├── editor/             # Editor Markdown WYSIWYG
│   │   ├── illustration/       # Engine render chart & SVG teknikal
│   │   ├── landing/            # Widget interaktif halaman utama
│   │   ├── reactbits/          # Elemen mikro-interaktif (SpotlightCard, BorderBeam, dll.)
│   │   └── roadmap-builder/    # Studio graf node roadmap
│   ├── data/                   # Artikel kurikulum bawaan (Price Action, SMC, Wyckoff, Risk, Quant)
│   ├── pages/                  # Halaman rute utama aplikasi
│   ├── types/                  # Definisi tipe TypeScript
│   └── utils/                  # Utilitas & Recommendation Engine
├── index.html                  # Entry HTML utama
├── package.json                # Konfigurasi dependensi & script
└── vite.config.ts              # Konfigurasi bundler Vite & proxy API
```

---

## 🚀 Panduan Instalasi & Menjalankan Proyek Lokal

### Prasyarat
- **[Bun](https://bun.sh/)** (v1.1+ direkomendasikan) atau **Node.js** (v20+)
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/AlulCode45/Trading-Learning-Path.git
cd Trading-Learning-Path
```

### 2. Instal Dependensi
```bash
bun install
```

### 3. Jalankan Mode Pengembangan (Frontend + Backend API)
Perintah berikut akan menjalankan server API (`http://localhost:3001`) dan Vite dev server (`http://localhost:5173`) secara bersamaan:
```bash
bun run dev
```
> Database SQLite (`data/trading_learning_path.db`) beserta seluruh *seed* kurikulum dan kuis akan dibuat secara otomatis saat server pertama kali dijalankan.

### Daftar Script Tersedia
| Perintah | Deskripsi |
| :--- | :--- |
| `bun run dev` | Menjalankan Backend API (`port 3001`) dan Frontend Vite (`port 5173`) secara paralel |
| `bun run server` | Menjalankan hanya Backend API Server |
| `bun run client` | Menjalankan hanya Frontend Vite Dev Server |
| `bun run build` | Mem-build aplikasi frontend ke direktori `dist/` untuk produksi |
| `bun run preview` | Menjalankan pratinjau hasil build produksi |

---

## 🔌 Ringkasan Endpoint REST API

Server berjalan secara default di `http://localhost:3001/api`:

- `GET /api/health` — Cek status kesehatan server API.
- `GET /api/roadmaps` — Mengambil daftar seluruh roadmap utama beserta ringkasan progres.
- `GET /api/roadmaps/:slug` — Mengambil detail lengkap roadmap, daftar node, checklist, sumber belajar, dan kuis.
- `PUT /api/nodes/:nodeId/status` — Memperbarui status belajar pada suatu node (`not_started`, `in_progress`, `completed`, `skipped`).
- `PUT /api/checklists/:checklistId/toggle` — Mengubah status centang item checklist pada node.
- `GET /api/community` — Mengambil daftar roadmap yang dipublikasikan oleh komunitas.
- `GET /api/community/roadmaps/:slug` — Mengambil detail roadmap komunitas berdasarkan slug.
- `POST /api/community` — Mempublikasikan roadmap komunitas baru.
- `POST /api/community/:id/fork` — Melakukan *fork* pada roadmap komunitas.
- `POST /api/community/:id/upvote` — Memberikan *upvote* pada roadmap komunitas.
- `GET /api/community/articles` — Mengambil seluruh artikel dokumentasi yang dibuat komunitas.
- `GET /api/community/articles/:slug` — Mengambil detail artikel dokumentasi komunitas.
- `POST /api/community/articles` — Menyimpan atau memperbarui artikel dokumentasi modul komunitas.

---

## 🤝 Kontribusi (Contributing)

Proyek ini terbuka bagi siapa saja yang ingin berkontribusi—baik berupa penambahan materi kurikulum trading, perbaikan bug, peningkatan UI/UX, maupun fitur interaktif baru.

1. **Fork** repository ini.
2. Buat branch fitur atau perbaikan baru:
   ```bash
   git checkout -b feat/nama-fitur-anda
   ```
3. Pastikan kode mematuhi standar TypeScript (*type-safe*) dan lolos build tanpa error:
   ```bash
   bun run build
   ```
4. Lakukan commit menggunakan format **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`):
   ```bash
   git commit -m "feat(curriculum): tambah modul baru pada jalur wyckoff"
   ```
5. Push ke branch Anda dan buat **Pull Request**.

---

## 📜 Lisensi (Open Source License)

Proyek ini dilisensikan secara terbuka di bawah **[MIT License](./LICENSE)**.  
Anda bebas menggunakan, mempelajari, memodifikasi, dan mendistribusikan ulang kode sumber proyek ini baik untuk keperluan pribadi, edukasi, maupun komersial sesuai dengan ketentuan lisensi MIT.
