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

Seringkali elemen chart bertumpuk dan berantakan jika koordinat ditaruh sembarangan. **Patuhi 6 aturan layout berikut**:

### A. Alokasi Koordinat Vertikal (Price Staggering)
- **Jangan menaruh `Badge`, `Trendline Label`, dan `InfoCard` pada koordinat harga (`price`) yang sama di candle index yang berdekatan!**
- Terapkan sistem zonasi vertikal 3 lapis:
  1. **Lantai Bawah (Harga Terendah / Di Bawah Candle Low)**:
     - Khusus untuk anotasi Support, Demand Zone, SSL Sweep, atau Stop Loss Long.
     - Contoh: Jika candle low ada di $100, letakkan badge sweep di $96 atau $95.
  2. **Lantai Tengah (Area Body Candle)**:
     - Khusus untuk garis ekuilibrium (50% MT / 50% CE) dan garis Entry position.
  3. **Lantai Atas (Harga Tertinggi / Di Atas Candle High)**:
     - Khusus untuk penanda Resistance, Supply Zone, BSL Sweep, atau Target Take Profit.
     - Letakkan `infoCards` penjelasan fase pada ruang lapang di bagian atas atau samping kanan.

### B. Posisi Info Cards yang Bernapas
- **Info Card memiliki lebar 150-180px dan tinggi 60-110px.**
- **Hindari menaruh `infoCard` tepat di atas lilin yang sedang padat dengan garis BOS/Trendline.**
- Letakkan `infoCard` di bar awal (misal index 1-3) jika aksi breakout terjadi di bar kanan (index 5-8), atau letakkan di bar kosong setelah rangkaian candle (misal `candleIndex: lastIndex + 1`).
- Berikan harga `price` yang berada di puncak atau dasar chart dengan selisih minimal 10-15% dari candle terdekat.

### C. Jarak Indeks Horizontal (Candle Spacing)
- Jangan menumpuk lebih dari 1 `badge` pada satu candle index.
- Jika ada 2 event berdekatan (misal Candle 3 adalah Sweep dan Candle 4 adalah CHoCH), pasang badge pertama di Candle 3 (di bawah low) dan badge kedua di Candle 4 (di atas high), bukan pada sisi yang sama.
- Berikan `candleSpacing: 'normal'` (42px) atau `'wide'` (54px) jika chart memuat banyak anotasi detail.

### D. Rentang Box & Label Alignment
- Pada `boxes` (Order Block / FVG):
  - Atur `labelPosition`:
    - Gunakan `'top-left'` untuk Bullish Order Block / Demand.
    - Gunakan `'bottom-left'` atau `'top-right'` untuk Bearish Order Block / Supply.
  - Jangan biarkan label box menabrak label trendline BOS.

### E. Polylines & Trendlines
- Polylines (`zigzag`) menghubungkan titik-titik ekstrim (Wick High ke Wick Low). Pastikan koordinat `price` sama persis dengan `high` atau `low` candle yang bersangkutan.
- Pada `trendlines`, gunakan `labelAlignment: 'center'` jika garis mendatar panjang (misal penembusan BOS), atau `labelAlignment: 'end'` jika garis miring tren.

---

## 2. Struktur Konfigurasi `CustomChartConfig` Lengkap

Model data didefinisikan pada [`src/types/chartBuilderTypes.ts`](file:///Users/macbookair/Project/TraderLearning-Path/src/types/chartBuilderTypes.ts).

```typescript
import { CustomChartConfig } from '../../types/chartBuilderTypes';

const myCleanChart: CustomChartConfig = {
  candles: [
    // Indeks urut dari 0 ke N
    { id: 'c0', index: 0, open: 100, high: 104, low: 98, close: 103, volume: 1200, label: 'Konsolidasi' },
    { id: 'c1', index: 1, open: 103, high: 105, low: 95, close: 99, volume: 2800, label: 'Judas Sweep' },
    { id: 'c2', index: 2, open: 99, high: 110, low: 98, close: 108, volume: 3900, label: 'Displacement' },
    { id: 'c3', index: 3, open: 108, high: 116, low: 107, close: 115, volume: 3400, label: 'BOS High' },
    { id: 'c4', index: 4, open: 115, high: 116, low: 106, close: 107, volume: 1400, label: 'Pullback Retest' },
    { id: 'c5', index: 5, open: 107, high: 124, low: 106, close: 122, volume: 4200, label: 'Ekspansi TP' },
  ],
  boxes: [
    // Box Order Block di area diskon
    {
      id: 'ob-demand',
      boxType: 'order_block',
      startIndex: 1,
      endIndex: 5,
      topPrice: 105,
      bottomPrice: 97,
      label: 'Bullish Order Block (OB)',
      labelPosition: 'top-left',
      color: '#10B981',
      opacity: 0.18,
      showMidLine: true,
      midLineLabel: '50% MT'
    },
    // FVG Imbalance di atas OB
    {
      id: 'fvg-gap',
      boxType: 'fvg',
      startIndex: 2,
      endIndex: 4,
      topPrice: 107,
      bottomPrice: 105,
      label: 'Fair Value Gap (FVG)',
      color: '#38BDF8',
      opacity: 0.22
    }
  ],
  trendlines: [
    // Garis BOS horizontal di puncak C0-C1
    {
      id: 'tl-bos',
      x1Index: 1,
      y1Price: 105,
      x2Index: 4,
      y2Price: 105,
      color: '#10B981',
      strokeWidth: 1.6,
      lineStyle: 'dashed',
      label: 'BOS Valid Body Close',
      labelAlignment: 'center',
      showArrow: true
    }
  ],
  polylines: [
    // Garis struktur swing High/Low
    {
      id: 'poly-wave',
      points: [
        { index: 0, price: 98 },
        { index: 1, price: 95 },
        { index: 3, price: 116 },
        { index: 4, price: 106 },
        { index: 5, price: 124 }
      ],
      color: '#F59E0B',
      strokeWidth: 2,
      curveType: 'zigzag',
      showDots: true,
      label: 'Struktur Swing H1'
    }
  ],
  positions: [
    // Kalkulasi R:R yang jelas dan tidak berhimpitan
    {
      id: 'pos-entry',
      type: 'long',
      label: 'Limit Buy di 50% MT',
      entryPrice: 101,
      stopPrice: 94,
      targetPrice: 122,
      startIndex: 3,
      endIndex: 6
    }
  ],
  infoCards: [
    // Ditaruh di koordinat lapang (candleIndex 1, harga 128 di atas range)
    {
      id: 'card-step1',
      candleIndex: 1,
      price: 128,
      title: 'FASE 1: SWEEP & ABSORPTION',
      stepBadge: '1',
      lines: [
        'Lilin C1 menusuk SSL di $95 (Stop Hunt).',
        'Whale menyerap likuiditas jual ritel.'
      ],
      footerBadge: '✓ Konfirmasi Reversal',
      color: '#10B981'
    }
  ],
  badges: [
    // Badge terpisah jauh: di bawah candle low ($92)
    {
      id: 'badge-ssl',
      candleIndex: 1,
      price: 92,
      text: 'Liquidity Sweep (SSL)',
      style: 'pill',
      bgColor: '#EF4444',
      textColor: '#FFFFFF'
    }
  ],
  showCandles: true,
  showVolume: true,
  showEma: false,
  candleSpacing: 'normal'
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
- [ ] **Anti-Overlap Badge & Card**: Apakah ada `badge` dan `infoCard` di bar index yang sama dan harga yang berdekatan? Jika ya, geser salah satunya.
- [ ] **Breathing Space Vertikal**: Apakah harga tertinggi `infoCard` atau `trendline` memiliki jarak minimal 5-10% dari candle ekstrim agar tidak berhimpitan dengan frame atas/bawah?
- [ ] **Batas Horizontal**: Apakah `endIndex` box dan position tidak melampaui jumlah candle secara berlebihan?
- [ ] **Kesesuaian Candle**: Apakah `high >= open`, `high >= close`, `low <= open`, dan `low <= close`?
- [ ] **Validasi Build**: Jalankan `bun run build` untuk memastikan tipe data `CustomChartConfig` valid 100%.
