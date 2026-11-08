---
name: trading-chart-engine
description: Design, generate, and validate rich educational trading charts using the app's native illustration engines (Custom SVG Chart Builder and Lightweight Charts). Activate whenever creating or updating educational articles, roadmap nodes, or technical analysis guides that need visual candlestick charts, market structure annotations (BOS/CHoCH), Order Blocks, FVGs, Fibonacci OTE, Liquidity Pools, or Long/Short risk-reward positions.
---

# Trading Chart Engine Skill

Skill ini memandu AI untuk menghasilkan konfigurasi ilustrasi chart visual yang presisi, mendalam, dan langsung dapat dirender oleh sistem web **TraderLearning-Path**.

Terdapat dua mode engine utama dalam aplikasi:
1. **`custom_builder` (Custom SVG Chart Builder - DIREKOMENDASIKAN UNTUK EDUKASI)**:
   - Digunakan untuk penjelasan konsep presisi, skematik, dan pola anatomi: BOS, CHoCH, Order Block, Fair Value Gap (FVG), Fibonacci OTE, Long/Short Position Box, Polyline Zigzag / Smooth Wave, Info Cards, dan Text Badges.
   - Didukung oleh [`CustomChartRenderer.tsx`](file:///Users/macbookair/Project/TraderLearning-Path/src/components/illustration/CustomChartRenderer.tsx).
2. **`interactive_chart` (TradingView Lightweight Charts v5)**:
   - Digunakan untuk chart candlestick interaktif berbasis data deret waktu (M5, H1, D1) dengan indikator volume, garis level harga horizontal, dan markers.
   - Didukung oleh [`InteractiveTradingChart.tsx`](file:///Users/macbookair/Project/TraderLearning-Path/src/components/illustration/InteractiveTradingChart.tsx).

---

## 1. Custom SVG Chart Builder (`custom_builder`)

Model data didefinisikan pada [`src/types/chartBuilderTypes.ts`](file:///Users/macbookair/Project/TraderLearning-Path/src/types/chartBuilderTypes.ts).

### Struktur Konfigurasi `CustomChartConfig`

```typescript
import { CustomChartConfig } from '../../types/chartBuilderTypes';

const myCustomChart: CustomChartConfig = {
  candles: [
    // Indeks urut dari 0 ke N
    { id: 'c0', index: 0, open: 100, high: 105, low: 98, close: 104, volume: 1200, label: 'Origin' },
    { id: 'c1', index: 1, open: 104, high: 110, low: 103, close: 108, volume: 1800 },
    { id: 'c2', index: 2, open: 108, high: 115, low: 107, close: 114, volume: 2400, label: 'BOS' },
  ],
  boxes: [
    // Area Order Block, FVG, Supply/Demand, atau Liquidity
    {
      id: 'ob-1',
      boxType: 'order_block',
      startIndex: 0,
      endIndex: 4,
      topPrice: 104,
      bottomPrice: 100,
      label: 'Bullish Order Block (OB)',
      labelPosition: 'top-left',
      color: '#10B981', // Hijau untuk Demand/Bullish
      opacity: 0.18,
      showMidLine: true,
      midLineLabel: '50% MT'
    },
    {
      id: 'fvg-1',
      boxType: 'fvg',
      startIndex: 1,
      endIndex: 3,
      topPrice: 107,
      bottomPrice: 105,
      label: 'Fair Value Gap (FVG)',
      color: '#38BDF8', // Biru/Cyan untuk FVG
      opacity: 0.2
    }
  ],
  trendlines: [
    // Garis struktur BOS / CHoCH / Trendline
    {
      id: 'tl-bos',
      x1Index: 1,
      y1Price: 110,
      x2Index: 4,
      y2Price: 110,
      color: '#10B981',
      strokeWidth: 1.5,
      lineStyle: 'dashed',
      label: 'BOS (Break of Structure)',
      labelAlignment: 'center',
      showArrow: true
    }
  ],
  polylines: [
    // Garis gelombang pergerakan harga makro / micro
    {
      id: 'wave-1',
      points: [
        { index: 0, price: 98 },
        { index: 2, price: 115 },
        { index: 3, price: 105 },
        { index: 5, price: 125 }
      ],
      color: '#F59E0B',
      strokeWidth: 2,
      curveType: 'zigzag', // atau 'smooth'
      showDots: true,
      label: 'Swing Wave H1'
    }
  ],
  positions: [
    // Kalkulator Risk to Reward (Long / Short)
    {
      id: 'pos-1',
      type: 'long',
      label: 'Optimal Trade Entry (OTE)',
      entryPrice: 104,
      stopPrice: 97,
      targetPrice: 125,
      startIndex: 3,
      endIndex: 6
    }
  ],
  infoCards: [
    // Kartu penjelasan langkah edukasi bertahap
    {
      id: 'step-1',
      candleIndex: 1,
      price: 118,
      title: 'FASE 1: DISPLACEMENT',
      stepBadge: '1',
      lines: [
        'Candle impulsif bervolume tinggi menembus swing high terdahulu.',
        'Meninggalkan ketidakseimbangan (FVG).'
      ],
      footerBadge: '✓ Konfirmasi Bullish',
      color: '#10B981'
    }
  ],
  badges: [
    // Label teks singkat di chart
    {
      id: 'b-sweep',
      candleIndex: 0,
      price: 96,
      text: 'Liquidity Sweep (SSL)',
      style: 'pill',
      bgColor: '#EF4444',
      textColor: '#FFFFFF'
    }
  ],
  showCandles: true,
  showVolume: true,
  showEma: false,
  candleSpacing: 'normal' // 'compact' | 'normal' | 'wide'
};
```

---

## 2. Interactive Lightweight Chart (`interactive_chart`)

Gunakan saat menyajikan simulasi pergerakan harga realistik:

```typescript
const myInteractiveChart = {
  illustrationMode: 'interactive_chart',
  chartConfig: {
    symbol: 'BTC/USDT',
    title: 'Wyckoff Spring & Sign of Strength (SOS)',
    timeframe: 'H1',
    data: [
      { time: '2026-05-10 08:00', open: 62100, high: 62300, low: 61500, close: 61600, volume: 2890 },
      { time: '2026-05-10 12:00', open: 61600, high: 63400, low: 61550, close: 63200, volume: 3400 },
      { time: '2026-05-11 04:00', open: 62200, high: 62300, low: 61100, close: 61850, volume: 850 }
    ],
    markers: [
      { time: '2026-05-11 04:00', position: 'belowBar', color: '#FACC15', shape: 'arrowUp', text: 'Spring Test' }
    ],
    keyLevels: [
      { price: 61100, title: 'Spring Low Sweep', color: '#F43F5E' },
      { price: 63800, title: 'Resistance Creek', color: '#38BDF8' }
    ]
  }
};
```

> [!IMPORTANT]
> **Aturan Waktu Lightweight Charts**:
> - Gunakan format `'YYYY-MM-DD HH:mm'` atau `'YYYY-MM-DD'` secara berurutan waktu (menaik).
> - Engine kami secara otomatis menormalisasi waktu ke UTC Unix Timestamp di latar belakang.

---

## 3. Cara Memasukkan Chart ke Materi Artikel (`ArticleSection`)

Setiap artikel tersusun atas array `sections`. Tambahkan konfigurasi chart pada section yang membutuhkan visualisasi:

```typescript
{
  id: 'sec-fvg-concept',
  title: 'Anatomi Pembentukan Fair Value Gap (FVG)',
  content: `### Bagaimana FVG Terbentuk?
Fair Value Gap terbentuk ketika pergerakan pasar bergerak sangat kencang (impulsif)...`,
  illustrationMode: 'custom_builder',
  customChartConfig: {
    // Masukkan CustomChartConfig di sini
  }
}
```

---

## 4. Standar Warna & Visual Pedoman

| Elemen | Kode Warna Hex | Makna & Penggunaan |
| :--- | :--- | :--- |
| **Bullish / Demand / OB** | `#10B981` (Emerald) | Area pantulan beli, demand zone, target profit long. |
| **Bearish / Supply / Sweep**| `#EF4444` / `#F43F5E` (Rose) | Area pantulan jual, stop loss, liquidity sweep. |
| **Fair Value Gap (FVG)** | `#38BDF8` (Sky) | Ketidakseimbangan harga / Imbalance zone. |
| **Liquidity Pools (BSL/SSL)**| `#FACC15` / `#F59E0B` (Amber)| Jebakan ritel, equal highs/lows, uang institusi. |
| **Fibonacci OTE Zone** | `#8B5CF6` (Purple) | Golden pocket 62% - 79% retracement. |

---

## 5. Checklist Validasi AI Saat Membuat Materi
- [ ] Apakah setiap candle memiliki `index` berurutan dari 0, 1, 2, ...?
- [ ] Apakah `high >= open`, `high >= close`, `low <= open`, dan `low <= close`?
- [ ] Apakah `box` memiliki `startIndex` dan `endIndex` yang masuk akal terhadap rentang candle?
- [ ] Apakah label teks singkat dan langsung merujuk pada konsep trading?
- [ ] Apakah warna selaras dengan standar palet aplikasi di atas?
