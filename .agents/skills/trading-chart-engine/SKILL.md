---
name: trading-chart-engine
description: Design, generate, and validate rich educational trading charts using the app's native illustration engines (Custom SVG Chart Builder and Lightweight Charts). Activate whenever creating or updating educational articles, roadmap nodes, or technical analysis guides that need visual candlestick charts, market structure annotations (BOS/CHoCH), Order Blocks, FVGs, Fibonacci OTE, Liquidity Pools, or Long/Short risk-reward positions.
---

# Trading Chart Engine Skill & Layout Anti-Clashing Rules

Skill ini memandu AI untuk menghasilkan konfigurasi ilustrasi chart visual yang **rapi, presisi, bernafas lega (spacious), dan bebas dari tumpukan elemen (zero overlapping)** menggunakan sistem web **TraderLearning-Path**.

Terdapat dua mode engine utama dalam aplikasi:
1. **`custom_builder` (Custom SVG Chart Builder - UTAMA UNTUK ANATOMI & KONSEP)**:
   - Digunakan untuk visualisasi konsep presisi: Candlestick, BOS/CHoCH, Order Block, FVG, Fibonacci OTE, Long/Short Box, Polyline Zigzag / Smooth Wave, Info Cards, dan Badges.
   - Didukung oleh [`CustomChartRenderer.tsx`](file:///Users/macbookair/Project/TraderLearning-Path/src/components/illustration/CustomChartRenderer.tsx).
2. **`interactive_chart` (TradingView Lightweight Charts v5)**:
   - Digunakan untuk simulasi deret waktu pasar riil (M5, H1, D1) dengan indikator volume, garis level harga horizontal, dan markers.
   - Didukung oleh [`InteractiveTradingChart.tsx`](file:///Users/macbookair/Project/TraderLearning-Path/src/components/illustration/InteractiveTradingChart.tsx).

---

## 1. Aturan Emas Anti-Tumpukan Elemen (Anti-Clashing & Breathing Space)

Seringkali elemen chart bertumpuk dan berantakan jika koordinat ditaruh sembarangan. **Patuhi 7 aturan layout presisi berikut**:

### A. Alokasi Koordinat Vertikal (3-Tier Vertical Zoning)
- **DILARANG menaruh `Badge` atau `InfoCard` tepat di dalam area body candle!**
- Terapkan sistem zonasi vertikal 3 lapis:
  1. **Lantai Bawah (Harga Terendah / Di Bawah Candle Low)**:
     - Khusus untuk anotasi Support, Demand Zone, SSL Sweep, atau Stop Loss Long.
     - Berikan jarak minimal 3% - 6% di bawah low lilin terendah.
     - Contoh: Jika lilin swing low ada di $61.500, letakkan badge sweep di $60.200 (bukan di $61.500).
  2. **Lantai Tengah (Area Body Candle)**:
     - Area ini milik Lilin Candlestick, Box Order Block, dan Trendline Struktur (BOS).
     - Jangan menaruh card atau badge di sini kecuali garis entry order position.
  3. **Lantai Atas (Harga Tertinggi / Di Atas Candle High)**:
     - Khusus untuk penanda Resistance, Supply Zone, BSL Sweep, atau Target Take Profit.
     - Berikan jarak minimal 4% - 8% di atas high lilin tertinggi.

### B. Posisi Info Cards yang Bernapas & Anchoring
- **Info Card memiliki lebar 165-220px dan tinggi 70-110px.**
- **Gunakan `alignX` dan `alignY` secara terencana**:
  - `alignX: 'left'`: Card memanjang ke kanan dari `candleIndex`. Gunakan ini jika card ditaruh di sisi kanan chart (misal setelah lilin terakhir `candleIndex: lastIndex + 1`) agar tidak merangsek ke kiri menutupi lilin!
  - `alignX: 'center'`: Card berada di tengah `candleIndex` (cocok jika di atas/bawah area kosong).
  - `alignY: 'top'`: Card digambar ke bawah dari `price`.
  - `alignY: 'bottom'`: Card digambar ke atas dari `price` (sangat bagus ditaruh di atas puncak lilin).
- **Hindari menaruh `infoCard` tepat di atas lilin yang sedang padat dengan garis BOS/Trendline.**
- Letakkan `infoCard` di bar kosong sebelah kanan rangkaian candle (misal `candleIndex: lastIndex + 1` dengan `alignX: 'left'`), atau di atas swing low awal yang sepi.

### C. Jarak Indeks Horizontal (Candle Spacing)
- **Gunakan `'wide'` (92px step) atau `'ultra-wide'` (120px step) secara default untuk seluruh chart edukasi yang memiliki penjelasan step/InfoCard!**
  - `'compact'` (48px step): Hanya untuk deretan lilin teknikal murni tanpa kartu teks.
  - `'normal'` (68px step): Untuk chart sederhana dengan 1-2 badge kecil.
  - `'wide'` (92px step): **Standar utama** chart materi & artikel komprehensif.
  - `'ultra-wide'` (120px step): Untuk skenario studi kasus dengan multi-fase InfoCard dan teks panjang.
- Jangan menumpuk lebih dari 1 `badge` pada satu candle index.

### D. Candle Labels di Sumbu X (Otomatis Staggering)
- Engine chart kini otomatis mendeteksi label lilin yang berdekatan atau teks panjang dan membaginya ke dalam 2 baris berselang-seling (staggered 2-tier) dengan garis panduan titik-titik.
- Meskipun demikian, gunakan label lilin yang ringkas dan padat (misal: "Konsolidasi", "Judas Sweep", "Displacement", "Retest", "Ekspansi").

### E. Ukuran Badge (`size: 'sm' | 'md' | 'lg'`)
- Untuk badge dengan kalimat panjang (seperti *"Funding Rate +0.08% (Greed Ekstrem)"*), gunakan `size: 'sm'` agar tidak memakan ruang visual 3 kolom lilin sekaligus.
- Manfaatkan `alignX: 'left'` atau `alignX: 'center'` agar posisi badge presisi di atas titik wicks.

### F. Rentang Box & Label Alignment
- Pada `boxes` (Order Block / FVG):
  - Atur `labelPosition`:
    - Gunakan `'top-left'` atau `'bottom-left'` untuk Bullish Order Block / Demand.
    - Gunakan `'top-right'` atau `'bottom-right'` untuk Bearish Order Block / Supply.
  - Hindari posisi label yang menabrak teks trendline BOS.

### G. Polylines & Trendlines
- Polylines (`zigzag`) menghubungkan titik-titik ekstrim (Wick High ke Wick Low). Pastikan koordinat `price` sama persis dengan `high` atau `low` candle yang bersangkutan.
- Pada `trendlines`, gunakan `labelAlignment: 'center'` jika garis mendatar panjang (misal penembusan BOS), atau `labelAlignment: 'end'` jika garis miring tren.

---

## 2. Struktur Konfigurasi `CustomChartConfig` Lengkap

Model data didefinisikan pada [`src/types/chartBuilderTypes.ts`](file:///Users/macbookair/Project/TraderLearning-Path/src/types/chartBuilderTypes.ts).

```typescript
import { CustomChartConfig } from '../../types/chartBuilderTypes';

const myCleanChart: CustomChartConfig = {
  title: 'ANATOMI LIQUIDITY SWEEP & REVERSAL',
  subtitle: 'BTC/USDT H1 • Bullish Displacement & Order Block Entry',
  candleSpacing: 'wide', // 92px step: lapang & tidak bertumpuk
  candles: [
    { id: 'c0', index: 0, open: 100, high: 104, low: 98, close: 103, volume: 1200, label: 'Konsolidasi' },
    { id: 'c1', index: 1, open: 103, high: 105, low: 93, close: 97, volume: 2800, label: 'Judas Sweep' },
    { id: 'c2', index: 2, open: 97, high: 110, low: 96, close: 108, volume: 3900, label: 'Displacement' },
    { id: 'c3', index: 3, open: 108, high: 116, low: 107, close: 115, volume: 3400, label: 'BOS High' },
    { id: 'c4', index: 4, open: 115, high: 116, low: 103, close: 105, volume: 1400, label: 'Pullback Retest' },
    { id: 'c5', index: 5, open: 105, high: 125, low: 104, close: 123, volume: 4200, label: 'Ekspansi TP' },
  ],
  boxes: [
    {
      id: 'ob-demand',
      boxType: 'order_block',
      startIndex: 1,
      endIndex: 4,
      topPrice: 103,
      bottomPrice: 94,
      label: 'Bullish Order Block (OB)',
      labelPosition: 'bottom-left',
      color: '#10B981',
      opacity: 0.18,
      showMidLine: true,
      midLineLabel: '50% MT'
    }
  ],
  trendlines: [
    {
      id: 'tl-bos',
      x1Index: 0,
      y1Price: 104,
      x2Index: 3,
      y2Price: 104,
      color: '#10B981',
      strokeWidth: 1.6,
      lineStyle: 'dashed',
      label: 'BOS Valid Body Close',
      labelAlignment: 'center',
      showArrow: true
    }
  ],
  badges: [
    // Lantai Atas: di atas high lilin
    {
      id: 'b-bos',
      candleIndex: 3,
      price: 120,
      text: 'Break of Structure (BOS)',
      style: 'pill',
      size: 'sm',
      bgColor: '#10B981',
      textColor: '#FFFFFF'
    },
    // Lantai Bawah: di bawah low lilin (tidak menabrak body)
    {
      id: 'b-sweep',
      candleIndex: 1,
      price: 88,
      text: 'Liquidity Sweep $93 (SSL)',
      style: 'badge',
      size: 'sm',
      bgColor: '#EF4444',
      textColor: '#FFFFFF'
    }
  ],
  infoCards: [
    // Card 1: Ditaruh di atas konsolidasi awal (Lantai Atas lapang)
    {
      id: 'card-step1',
      candleIndex: 0,
      price: 132,
      alignX: 'left',
      alignY: 'top',
      width: 200,
      title: 'FASE 1: MANIPULASI',
      stepBadge: '1',
      lines: [
        'Lilin C1 menusuk SSL di $93 (Judas Swing).',
        'Whale menyerap likuiditas jual ritel.'
      ],
      footerBadge: '⚠️ Stop Loss Ritel Tersapu',
      color: '#F59E0B'
    },
    // Card 2: Ditaruh di area kosong setelah lilin terakhir (Lantai Tengah lapang)
    {
      id: 'card-step2',
      candleIndex: 6,
      price: 112,
      alignX: 'left',
      alignY: 'middle',
      width: 200,
      title: 'FASE 2: REAKSI & EKSPANSI',
      stepBadge: '2',
      lines: [
        'Harga retest 50% MT Order Block.',
        'Institusi mendorong ekspansi ke target.'
      ],
      footerBadge: '✓ Konfirmasi Reversal Valid',
      color: '#10B981'
    }
  ],
  showCandles: true,
  showVolume: true,
  showEma: false
};
```

---

## 3. Standar Warna & Visual Pedoman

| Elemen | Kode Warna Hex | Makna & Penggunaan |
| :--- | :--- | :--- |
| **Bullish / Demand / OB** | `#10B981` (Emerald) | Area pantulan beli, demand zone, target profit long. |
| **Bearish / Supply / Sweep**| `#EF4444` / `#F43F5E` (Rose) | Area pantulan jual, stop loss, liquidity sweep. |
| **Fair Value Gap (FVG)** | `#38BDF8` (Sky) | Ketidakseimbangan harga / Imbalance zone. |
| **Liquidity Pools (BSL/SSL)**| `#FACC15` / `#F59E0B` (Amber)| Jebakan ritel, equal highs/lows, uang institusi. |
| **Fibonacci OTE Zone** | `#8B5CF6` (Purple) | Golden pocket 62% - 79% retracement. |

---

## 4. Checklist Pra-Eksekusi (Wajib Dicek Sebelum Simpan)
- [ ] **Spacious Spacing**: Apakah `candleSpacing` sudah disetel `'wide'` atau `'ultra-wide'` jika terdapat InfoCard/Badge?
- [ ] **Zero Overlap Body Lilin**: Pastikan tidak ada `badge` atau `infoCard` yang ditaruh di dalam range harga `open..close..high..low` dari lilin pada indeks yang bersangkutan!
- [ ] **Anchoring InfoCard**: Apakah InfoCard di sisi kanan menggunakan `alignX: 'left'` atau ditempatkan di `lastIndex + 1` agar tidak merangsek menutupi lilin di kirinya?
- [ ] **Breathing Space Vertikal**: Apakah harga tertinggi `infoCard` atau `trendline` memiliki jarak minimal 5-10% dari candle ekstrim agar tidak berhimpitan dengan frame atas/bawah?
- [ ] **Badge Density**: Apakah badge dengan teks panjang sudah menggunakan `size: 'sm'`?
- [ ] **Kesesuaian Candle**: Apakah `high >= open`, `high >= close`, `low <= open`, dan `low <= close`?
- [ ] **Validasi Build**: Jalankan `bun run build` untuk memastikan tipe data `CustomChartConfig` valid 100%.
