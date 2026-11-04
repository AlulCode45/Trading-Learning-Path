# Visual Design System: Trading Learning Path (TLP)
*Document Version: 1.0.0 — Generated with stitch-design-taste & design-taste-frontend*

---

## 1. Atmosphere & Visual Philosophy
- **Aesthetic Direction**: *Tactical Financial Desk meets Academic Curriculum*. Tenang, terorganisir, presisi, dan bebas dari distraksi neon "crypto-hype".
- **Density**: 7/10 (High utility, structured whitespace, compact metrics).
- **Variance**: 6/10 (Modular hierarchical DAG tree, balance between structured roadmap canvas and editorial reading drawers).
- **Motion**: 5/10 (Subtle fluid transitions for node expansion, hover focus, and progress fills; zero gratuitous bouncing animations).

---

## 2. Color Calibration

| Token Name | Hex Code | Purpose & Constraints |
| :--- | :--- | :--- |
| `surface-canvas` | `#090D16` | Deep obsidian slate. Latar belakang utama aplikasi dan canvas roadmap. |
| `surface-card` | `#0F172A` | Background kartu, container node, dan drawer materi. |
| `surface-elevated` | `#1E293B` | Elemen melayang (popover, tooltips, dropdown menus). |
| `border-subtle` | `#1E293B` | Garis pembatas kartu dan garis pandu canvas. |
| `border-focus` | `#334155` | Status hover netral pada node roadmap. |
| `accent-emerald` | `#10B981` | Aksen primer. Menandakan pertumbuhan, node selesai (*Mastered*), dan jalur aktif. |
| `state-in-progress` | `#F59E0B` | Kuning amber hangat. Menandakan node yang sedang aktif dipelajari. |
| `state-locked` | `#475569` | Muted slate. Node yang belum memenuhi prasyarat. |
| `text-primary` | `#F8FAFC` | Teks utama, judul bab, dan nama node roadmap. |
| `text-secondary` | `#94A3B8` | Subjudul, ringkasan materi, durasi belajar, dan metadata creator. |

> **Banned Colors**: Dilarang menggunakan pure black (`#000000`), generic AI purple-blue gradients, atau neon glow yang menyilaukan.

---

## 3. Typographic Architecture
- **Headings & Node Titles**: `Cabinet Grotesk` atau `Geist` (`letter-spacing: -0.02em`, font-weight `600` / `700`).
- **Body & Learning Content**: `Geist Sans` atau `Satoshi` (`line-height: 1.65`, optimal 65-75 CPL).
- **Metrics, Tickers, R:R & Percentages**: `JetBrains Mono` atau `Geist Mono` (`font-feature-settings: 'tnum' 1`).

---

## 4. Roadmap Canvas & Node Mechanics
1. **Interactive Node**:
   - `rounded-lg` dengan border `1.5px` solid.
   - Status badge minimalis di sisi kiri (dot 8px).
   - Saat diklik: membuka Slide-over Drawer dari sisi kanan tanpa me-reload canvas.
2. **Konektor SVG**:
   - Kurva Bézier halus (`cubic-bezier(0.4, 0, 0.2, 1)`) dengan lebar stroke `2px`.
   - Warna transparan slate saat inaktif, dan berubah menjadi emerald bercahaya lembut saat prasyarat tuntas.
3. **Responsive Adaptation**:
   - Desktop (`>= 1024px`): Zoomable & draggable 2D Canvas.
   - Mobile (`< 1024px`): Stacked interactive tree dengan alur vertikal linier.
