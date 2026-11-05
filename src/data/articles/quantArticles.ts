import { EducationalArticle } from '../../types';

export const QUANT_ARTICLES: Record<string, EducationalArticle> = {
  // Master Guide Quantitative
  'quantitative-algo-trading-mastery': {
    id: 'art-quant-mastery',
    slug: 'quantitative-algo-trading-mastery',
    title: 'Trading Kuantitatif & Algoritmik: Dari Pemodelan Matematika Python Hingga Eksekusi Live API',
    category: 'Quantitative',
    level: 1,
    readingTimeMinutes: 24,
    difficulty: 'Advanced',
    summary: 'Masterclass komprehensif algorithmic trading: analisis deret waktu finansial, uji stasioneritas ADF, model momentum & mean-reversion, eliminasi overfitting, walk-forward Monte Carlo, metrik Sharpe/Sortino, dan integrasi Pine Script v5 / WebSocket.',
    prerequisites: ['what-is-trading-fundamentals', 'risk-management-psychology-mastery'],
    tableOfContents: [
      { id: 'deret-waktu-finansial', title: '1. Deret Waktu Finansial: Log Returns & Uji ADF' },
      { id: 'vektorisasi-python', title: '2. Pemrosesan Vektorisasi Python (Pandas & NumPy)' },
      { id: 'dua-keluarga-strategi', title: '3. Dua Model Kuantitatif Inti: Momentum vs Mean-Reversion' },
      { id: 'arsitektur-backtesting', title: '4. Arsitektur Engine: Vectorized vs. Event-Driven' },
      { id: 'eliminasi-bias', title: '5. Mengeliminasi Dosa Backtest: Overfitting & Lookahead Bias' },
      { id: 'metrik-institusional', title: '6. Evaluasi Kinerja Institusional (Sharpe, Sortino, VaR)' },
      { id: 'automasi-cloud', title: '7. Otomatisasi Cloud: Pine Script v5 Webhook & Live API' }
    ],
    sections: [
      {
        id: 'deret-waktu-finansial',
        title: '1. Deret Waktu Finansial: Log Returns & Uji ADF',
        content: `### Mengapa Harga Mentah Menipu Model Statistik?
Harga mentah aset finansial ($P_t$) bersifat *Non-Stationary* (memiliki kecenderungan tren dan varians yang berubah terhadap waktu). Menerapkan analisis regresi langsung pada harga mentah akan memicu korelasi palsu (*Spurious Regression*).
- **Log Returns (Pengembalian Logaritmik)**:
  $$r_t = \\ln(P_t) - \\ln(P_{t-1})$$
  Bersifat simetris dan aditif sepanjang waktu, serta mendekati distribusi stasioner.
- **Uji Augmented Dickey-Fuller (ADF)**:
  Uji hipotesis statistik untuk memastikan deret return tidak memiliki akar unit (*Unit Root*). Jika $p$-value $< 0.05$, deret data dinyatakan stasioner dan aman dianalisis.`
      },
      {
        id: 'vektorisasi-python',
        title: '2. Pemrosesan Vektorisasi Python (Pandas & NumPy)',
        content: `### Kecepatan Operasi Array SIMD
Dalam kuantitatif finansial, perulangan \`for\` di Python murni terlalu lambat untuk mengolah jutaan bar tick-by-tick. Vektorisasi mengeksekusi operasi matematika langsung pada level mesin C:

\`\`\`python
import numpy as np
import pandas as pd

# Menghitung Log Returns dan Sinyal Moving Average secara vektorisasi instan
df['log_ret'] = np.log(df['close'] / df['close'].shift(1))
df['fast_ma'] = df['close'].rolling(window=20).mean()
df['slow_ma'] = df['close'].rolling(window=50).mean()

# Cegah Lookahead Bias dengan pergeseran .shift(1)
df['signal'] = np.where(df['fast_ma'] > df['slow_ma'], 1, -1)
df['strategy_ret'] = df['signal'].shift(1) * df['log_ret']
\`\`\``
      },
      {
        id: 'dua-keluarga-strategi',
        title: '3. Dua Model Kuantitatif Inti: Momentum vs Mean-Reversion',
        content: `### Dua Arsitektur Strategi Finansial:
1. **Model Momentum (Trend Following)**:
   - Premis: Aset yang menguat cenderung terus menguat karena herd behavior.
   - Filter Regim: Menggunakan ATR atau VIX untuk menonaktifkan model saat volatilitas pasar mengalami shock ekstrem.
2. **Model Mean-Reversion (Ornstein-Uhlenbeck)**:
   - Premis: Deviasi harga atau spread pasangan kointegrasi akan kembali ke rata-ratanya.
   - Normalisasi Z-Score:
     $$Z_t = \\frac{P_t - \\mu_t}{\\sigma_t}$$
   - Beli saat $Z_t < -2.0$, Jual saat $Z_t > +2.0$, dan Exit saat $Z_t = 0$.`
      },
      {
        id: 'arsitektur-backtesting',
        title: '4. Arsitektur Engine: Vectorized vs. Event-Driven',
        content: `### Dua Pendekatan Engine Pengujian:
- **Vectorized Backtesting**: Cepat (menguji ratusan parameter dalam hitungan detik), ideal untuk penyaringan ide awal. Namun mengabaikan latensi order, fill parsial, dan antrean bid/ask.
- **Event-Driven Backtesting**: Mensimulasikan jalannya waktu bar demi bar dengan objek \`OrderEvent\`, \`FillEvent\`, dan komisi slippage dinamis yang menyerupai bursa nyata.`
      },
      {
        id: 'eliminasi-bias',
        title: '5. Mengeliminasi Dosa Backtest: Overfitting & Lookahead Bias',
        content: `### Tiga Bias Mematikan:
1. **Lookahead Bias**: Kode tanpa sengaja membaca data masa depan (misal memakai High hari ini untuk buy di pembukaan hari ini).
2. **Survivorship Bias**: Hanya menguji saham-saham yang saat ini masih hidup di indeks, melupakan perusahaan yang bangkrut.
3. **Overfitting (Curve Fitting)**: Terlalu banyak parameter yang disetel hingga menghafal derau masa lalu.
- *Solusi Rigor*: Terapkan pemisahan dataset ketat (60% Train, 20% Validate, 20% Out-of-Sample) serta Walk-Forward Analysis dan simulasi Monte Carlo 10,000 iterasi.`
      },
      {
        id: 'metrik-institusional',
        title: '6. Evaluasi Kinerja Institusional (Sharpe, Sortino, VaR)',
        content: `### Metrik Evaluasi Hedge Fund:
- **Sharpe Ratio**: Kelebihan return di atas suku bunga bebas risiko per unit total volatilitas.
- **Sortino Ratio**: Hanya menghukum volatilitas negatif (Downside Deviation).
- **Calmar Ratio**: CAGR dibagi Maximum Drawdown (MDD).
- **Value at Risk (VaR)** & **CVaR**: Mengukur besaran potensi kerugian ekstrem pada persentil 99% (Tail Risk).`
      },
      {
        id: 'automasi-cloud',
        title: '7. Otomatisasi Cloud: Pine Script v5 Webhook & Live API',
        content: `### Menjembatani Algoritma ke Bursa Riil
- **TradingView Pine Script v5**: Mengembangkan state machine bebas repainting dengan mengevaluasi kondisi hanya pada \`barstate.isconfirmed\`.
- **Webhook Alerts**: Mengirim instruksi eksekusi instan melalui payload JSON via HTTP POST ke gateway broker API.
- **WebSocket Gateway**: Koneksi persisten berlatensi rendah untuk streaming order book Level 2 dan konfirmasi fill order.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengoptimasi puluhan parameter indikator hingga menghasilkan kurva ekuitas mulus sempurna di masa lalu.',
        correction: 'Sistem yang overfitted pasti akan hancur seketika saat dihadapkan pada data riil di masa depan.'
      },
      {
        mistake: 'Mengabaikan biaya transaksi, komisi broker, dan slippage dalam simulasi backtest.',
        correction: 'Strategi frekuensi tinggi yang profit di atas kertas sering kali merugi karena tergerus biaya spread dan komisi.'
      }
    ],
    keyTakeaways: [
      'Stasioneritas adalah fondasi mutlak pemodelan kuantitatif.',
      'Event-driven backtesting memberikan simulasi eksekusi paling realistis.',
      'Walk-forward analysis dan Monte Carlo menguji ketahanan parameter strategi.',
      'Manajemen risiko ekor (CVaR) melindungi dana dari peristiwa Angsa Hitam.'
    ],
    relatedTopics: [
      { slug: 'quant-time-series-stationarity', title: 'Time Series Stationarity', category: 'Quantitative' },
      { slug: 'quant-python-pandas-vectorization', title: 'Python Vectorization', category: 'Quantitative' }
    ],
    references: [
      { title: 'Advances in Financial Machine Learning', author: 'Marcos López de Prado', year: '2018' },
      { title: 'Quantitative Trading', author: 'Ernie Chan', year: '2009' }
    ]
  },

  // Node articles Quantitative
  'quant-time-series-stationarity': {
    id: 'art-quant-stationarity',
    nodeId: 'quant-1-1',
    slug: 'quant-time-series-stationarity',
    title: 'Analisis Deret Waktu Finansial, Uji ADF, & Log Returns',
    category: 'Quantitative',
    level: 1,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Mengapa harga mentah non-stasioner tidak bisa dimodelkan langsung, cara menghitung log returns, dan uji Augmented Dickey-Fuller (ADF).',
    prerequisites: ['what-is-trading-fundamentals'],
    tableOfContents: [
      { id: 'non-stationarity', title: '1. Masalah Non-Stasioneritas Harga' },
      { id: 'log-returns-math', title: '2. Matematika Log Returns' },
      { id: 'uji-adf-python', title: '3. Menjalankan Uji ADF di Python' }
    ],
    sections: [
      {
        id: 'non-stationarity',
        title: '1. Masalah Non-Stasioneritas Harga',
        content: `Harga mentah memiliki varians yang tidak konstan dan rata-rata yang terus berubah, menghasilkan korelasi palsu pada model statistik standar.`
      },
      {
        id: 'log-returns-math',
        title: '2. Matematika Log Returns',
        content: `r_t = ln(P_t / P_t-1). Log return simetris dan mendekati distribusi normal stasioner.`
      },
      {
        id: 'uji-adf-python',
        title: '3. Menjalankan Uji ADF di Python',
        content: `Gunakan fungsi adfuller dari pustaka statsmodels. Jika p-value < 0.05, data terbukti stasioner.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Melakukan regresi linear langsung pada grafik harga aset.',
        correction: 'Selalu ubah deret harga menjadi deret returns sebelum pengujian statistik.'
      }
    ],
    keyTakeaways: [
      'Data stasioner memiliki rata-rata dan varians konstan sepanjang waktu.',
      'Log returns adalah standar emas dalam ekonometrika keuangan.'
    ],
    relatedTopics: [
      { slug: 'quant-python-pandas-vectorization', title: 'Python Vectorization', category: 'Quantitative' }
    ],
    references: [
      { title: 'Analysis of Financial Time Series', author: 'Ruey S. Tsay', year: '2010' }
    ]
  },

  'quant-python-pandas-vectorization': {
    id: 'art-quant-vectorization',
    nodeId: 'quant-1-2',
    slug: 'quant-python-pandas-vectorization',
    title: 'Python Finansial: Pandas, NumPy, & Pemrosesan Vektorisasi',
    category: 'Quantitative',
    level: 1,
    readingTimeMinutes: 14,
    difficulty: 'Intermediate',
    summary: 'Mengolah data OHLCV historis jutaan bar dalam milidetik tanpa perulangan for-loop lambat menggunakan array vektorisasi.',
    prerequisites: ['quant-time-series-stationarity'],
    tableOfContents: [
      { id: 'kecepatan-vektorisasi', title: '1. Vektorisasi vs Loop Lambat' },
      { id: 'manipulasi-dataframe', title: '2. Manipulasi DataFrame Cepat' },
      { id: 'mencegah-lookahead', title: '3. Mencegah Lookahead Bias dengan .shift(1)' }
    ],
    sections: [
      {
        id: 'kecepatan-vektorisasi',
        title: '1. Vektorisasi vs Loop Lambat',
        content: `NumPy menjalankan kalkulasi pada instruksi mesin SIMD C, menghasilkan kecepatan komputasi 50-100x lebih cepat dibanding for-loop Python biasa.`
      },
      {
        id: 'manipulasi-dataframe',
        title: '2. Manipulasi DataFrame Cepat',
        content: `Hitung moving averages, log returns, dan sinyal strategi menggunakan array vektorisasi Pandas secara deklaratif.`
      },
      {
        id: 'mencegah-lookahead',
        title: '3. Mencegah Lookahead Bias dengan .shift(1)',
        content: `Sinyal transaksi harus digeser 1 bar ke depan (.shift(1)) agar order tidak menggunakan data masa depan.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menggunakan perulangan iterrows() yang lambat pada dataset tick besar.',
        correction: 'Gunakan operasi vektorisasi NumPy / Pandas.'
      }
    ],
    keyTakeaways: [
      'Vektorisasi adalah kunci efisiensi komputasi finansial.',
      'Selalu terapkan .shift(1) pada sinyal transaksi.'
    ],
    relatedTopics: [
      { slug: 'quant-momentum-trend-following', title: 'Momentum Models', category: 'Quantitative' }
    ],
    references: [
      { title: 'Python for Finance', author: 'Yves Hilpisch', year: '2018' }
    ]
  },

  'quant-momentum-trend-following': {
    id: 'art-quant-momentum',
    nodeId: 'quant-2-1',
    slug: 'quant-momentum-trend-following',
    title: 'Model Kuantitatif Momentum & Regime Trend Filter',
    category: 'Quantitative',
    level: 2,
    readingTimeMinutes: 13,
    difficulty: 'Advanced',
    summary: 'Membangun algoritma Time-Series Momentum (TSMOM) dan Cross-Sectional Momentum dengan filter volatilitas ATR dinamis.',
    prerequisites: ['quant-python-pandas-vectorization'],
    tableOfContents: [
      { id: 'tsmom-vs-csmom', title: '1. Time-Series vs Cross-Sectional Momentum' },
      { id: 'regime-volatilitas', title: '2. Filter Rezim Volatilitas Dinamis' },
      { id: 'volatility-targeting', title: '3. Protokol Volatility Targeting' }
    ],
    sections: [
      {
        id: 'tsmom-vs-csmom',
        title: '1. Time-Series vs Cross-Sectional Momentum',
        content: `TSMOM mengukur kekuatan aset relatif terhadap sejarahnya sendiri; CSMOM meranking seluruh aset dan membeli desil teratas.`
      },
      {
        id: 'regime-volatilitas',
        title: '2. Filter Rezim Volatilitas Dinamis',
        content: `Gunakan rasio ATR atau VIX untuk menurunkan ukuran eksposur saat volatilitas pasar melonjak ekstrem.`
      },
      {
        id: 'volatility-targeting',
        title: '3. Protokol Volatility Targeting',
        content: `Sesuaikan bobot portofolio berbanding terbalik dengan volatilitas instrumen.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengabaikan rezim pasar bergejolak (choppy market) pada model momentum.',
        correction: 'Gunakan filter volatilitas untuk mematikan alokasi saat pasar sideways.'
      }
    ],
    keyTakeaways: [
      'Momentum adalah salah satu anomali pasar paling teruji secara empiris.',
      'Penyesuaian target volatilitas meredam drawdown ekstrem.'
    ],
    relatedTopics: [
      { slug: 'quant-mean-reversion-ornstein-uhlenbeck', title: 'Mean Reversion', category: 'Quantitative' }
    ],
    references: [
      { title: 'Expected Returns', author: 'Antti Ilmanen', year: '2011' }
    ]
  },

  'quant-mean-reversion-ornstein-uhlenbeck': {
    id: 'art-quant-mean-reversion',
    nodeId: 'quant-2-2',
    slug: 'quant-mean-reversion-ornstein-uhlenbeck',
    title: 'Model Mean-Reversion, Z-Score, & Proses Ornstein-Uhlenbeck',
    category: 'Quantitative',
    level: 2,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Mengukur deviasi harga dari nilai ekuilibrium melalui Z-Score dan menghitung waktu paruh pengembalian (Half-Life).',
    prerequisites: ['quant-momentum-trend-following'],
    tableOfContents: [
      { id: 'zscore-normalisasi', title: '1. Normalisasi Z-Score' },
      { id: 'proses-ou', title: '2. Proses Stokastik Ornstein-Uhlenbeck' },
      { id: 'half-life-math', title: '3. Menghitung Half-Life Pengembalian' }
    ],
    sections: [
      {
        id: 'zscore-normalisasi',
        title: '1. Normalisasi Z-Score',
        content: `Z = (Harga - Mean) / Standar Deviasi. Beli saat Z < -2.0; Jual saat Z > +2.0; Tutup saat Z = 0.`
      },
      {
        id: 'proses-ou',
        title: '2. Proses Stokastik Ornstein-Uhlenbeck',
        content: `Model matematis kecepatan pengembalian nilai rata-rata deviasi harga.`
      },
      {
        id: 'half-life-math',
        title: '3. Menghitung Half-Life Pengembalian',
        content: `Half-Life = ln(2) / theta. Mengukur berapa lama waktu rata-rata yang dibutuhkan agar deviasi kembali ke tengah.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menerapkan mean-reversion pada aset yang sedang mengalami tren trending kuat.',
        correction: 'Pastikan pasangan aset terbukti terkointegrasi melalui uji Engle-Granger.'
      }
    ],
    keyTakeaways: [
      'Z-score memberikan sinyal oversold/overbought objektif.',
      'Half-life mengukur kecepatan perputaran modal.'
    ],
    relatedTopics: [
      { slug: 'quant-orderbook-microstructure-l2', title: 'Order Book Microstructure', category: 'Quantitative' }
    ],
    references: [
      { title: 'Algorithmic Trading', author: 'Ernie Chan', year: '2013' }
    ]
  },

  'quant-orderbook-microstructure-l2': {
    id: 'art-quant-orderbook',
    nodeId: 'quant-2-3',
    slug: 'quant-orderbook-microstructure-l2',
    title: 'Mikrostruktur Pasar: Order Book Level 2/3 & VWAP Analytics',
    category: 'Quantitative',
    level: 2,
    readingTimeMinutes: 13,
    difficulty: 'Advanced',
    summary: 'Menganalisis ketidakseimbangan limit order book (OBI), Cumulative Volume Delta (CVD), dan algoritma eksekusi institusi VWAP.',
    prerequisites: ['quant-mean-reversion-ornstein-uhlenbeck'],
    tableOfContents: [
      { id: 'limit-order-book', title: '1. Anatomi Limit Order Book Level 2' },
      { id: 'orderbook-imbalance', title: '2. Order Book Imbalance (OBI)' },
      { id: 'vwap-eksekusi', title: '3. VWAP & Cumulative Volume Delta (CVD)' }
    ],
    sections: [
      {
        id: 'limit-order-book',
        title: '1. Anatomi Limit Order Book Level 2',
        content: `Daftar antrean volume limit order bid dan ask pada setiap tingkatan harga di bursa.`
      },
      {
        id: 'orderbook-imbalance',
        title: '2. Order Book Imbalance (OBI)',
        content: `OBI = (V_bid - V_ask) / (V_bid + V_ask). Nilai > +0.40 mengindikasikan tekanan beli mikro.`
      },
      {
        id: 'vwap-eksekusi',
        title: '3. VWAP & Cumulative Volume Delta (CVD)',
        content: `VWAP menjadi tolok ukur nilai wajar institusi; CVD melacak agresivitas pembeli vs penjual pasar.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Terkecoh oleh order palsu (spoofing) di buku pesanan Level 2.',
        correction: 'Padukan dengan CVD untuk memverifikasi eksekusi order agresif yang benar-benar terisi.'
      }
    ],
    keyTakeaways: [
      'Mikrostruktur pasar memperlihatkan pertarungan order di level milidetik.',
      'VWAP adalah patokan eksekusi institusional standar dunia.'
    ],
    relatedTopics: [
      { slug: 'quant-vectorized-vs-event-driven', title: 'Backtesting Engines', category: 'Quantitative' }
    ],
    references: [
      { title: 'Trades, Quotes and Prices', author: 'Jean-Philippe Bouchaud', year: '2018' }
    ]
  },

  'quant-vectorized-vs-event-driven': {
    id: 'art-quant-backtesting-engines',
    nodeId: 'quant-3-1',
    slug: 'quant-vectorized-vs-event-driven',
    title: 'Arsitektur Engine: Vectorized vs. Event-Driven Backtesting',
    category: 'Quantitative',
    level: 3,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Membedakan riset cepat vektorisasi vs engine event-driven yang mensimulasikan latensi antrean order dan slippage spread nyata.',
    prerequisites: ['quant-orderbook-microstructure-l2'],
    tableOfContents: [
      { id: 'vektorisasi-engine', title: '1. Karakteristik Vectorized Engine' },
      { id: 'event-driven-loop', title: '2. Event-Driven Simulation Loop' },
      { id: 'pemilihan-arsitektur', title: '3. Kapan Menggunakan Masing-Masing Engine?' }
    ],
    sections: [
      {
        id: 'vektorisasi-engine',
        title: '1. Karakteristik Vectorized Engine',
        content: `Perkalian matriks cepat di DataFrame. Sangat cocok untuk skrining ratusan ide awal dalam hitungan detik.`
      },
      {
        id: 'event-driven-loop',
        title: '2. Event-Driven Simulation Loop',
        content: `Mensimulasikan waktu bar demi bar dengan antrean order, fill parsial, dan biaya slippage realistis.`
      },
      {
        id: 'pemilihan-arsitektur',
        title: '3. Kapan Menggunakan Masing-Masing Engine?',
        content: `Gunakan vektorisasi untuk prototipe; gunakan event-driven sebelum deploy modal riil.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Langsung memperdagangkan sistem vektorisasi tanpa validasi event-driven.',
        correction: 'Slippage dan fill delay sering menghapus keuntungan teoretis vektorisasi.'
      }
    ],
    keyTakeaways: [
      'Vectorized backtesting untuk kecepatan; Event-driven untuk akurasi presisi.',
      'Simulasi antrean bursa nyata adalah filter ketahanan strategi.'
    ],
    relatedTopics: [
      { slug: 'quant-overfitting-lookahead-bias', title: 'Overfitting Mitigation', category: 'Quantitative' }
    ],
    references: [
      { title: 'Successful Algorithmic Trading', author: 'Michael L. Halls-Moore', year: '2015' }
    ]
  },

  'quant-overfitting-lookahead-bias': {
    id: 'art-quant-overfitting',
    nodeId: 'quant-3-2',
    slug: 'quant-overfitting-lookahead-bias',
    title: 'Eliminasi Bias: Overfitting, Curve Fitting, & Lookahead Bias',
    category: 'Quantitative',
    level: 3,
    readingTimeMinutes: 15,
    difficulty: 'Advanced',
    summary: 'Mengapa strategi yang tampak sempurna di backtest selalu gagal di akun riil, dan cara split train/validation/test yang ketat.',
    prerequisites: ['quant-vectorized-vs-event-driven'],
    tableOfContents: [
      { id: 'jebakan-overfitting', title: '1. Jebakan Overfitting (Curve Fitting)' },
      { id: 'lookahead-survivorship', title: '2. Lookahead & Survivorship Bias' },
      { id: 'protokol-pemisahan-data', title: '3. Protokol Pemisahan Data Ketat' }
    ],
    sections: [
      {
        id: 'jebakan-overfitting',
        title: '1. Jebakan Overfitting (Curve Fitting)',
        content: `Mengutak-atik puluhan parameter hingga kurva masa lalu sempurna. Model ini hanya menghafal noise dan gagal di data baru.`
      },
      {
        id: 'lookahead-survivorship',
        title: '2. Lookahead & Survivorship Bias',
        content: `Mengintip masa depan tanpa sengaja atau mengabaikan aset yang telah bangkrut dan terdepak dari bursa.`
      },
      {
        id: 'protokol-pemisahan-data',
        title: '3. Protokol Pemisahan Data Ketat',
        content: `Bagi data menjadi 60% In-Sample (Train), 20% Validation, dan 20% Out-of-Sample (Test) yang tidak pernah disentuh saat optimasi.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengubah parameter strategi setelah melihat hasil buruk di data Out-of-Sample.',
        correction: 'Data Out-of-Sample hanya boleh diuji satu kali untuk mempertahankan integritas statistik.'
      }
    ],
    keyTakeaways: [
      'Kurva backtest yang terlalu mulus adalah tanda bahaya mutlak.',
      'Disiplin isolasi data mencegah penipuan diri sendiri.'
    ],
    relatedTopics: [
      { slug: 'quant-walk-forward-monte-carlo', title: 'Walk-Forward & Monte Carlo', category: 'Quantitative' }
    ],
    references: [
      { title: 'Advances in Financial Machine Learning', author: 'Marcos López de Prado', year: '2018' }
    ]
  },

  'quant-walk-forward-monte-carlo': {
    id: 'art-quant-walk-forward',
    nodeId: 'quant-3-3',
    slug: 'quant-walk-forward-monte-carlo',
    title: 'Optimasi Walk-Forward & Simulasi Resampling Monte Carlo',
    category: 'Quantitative',
    level: 3,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Menguji ketahanan parameter strategi pada data out-of-sample bergulir dan simulasi acak untuk worst-case drawdown.',
    prerequisites: ['quant-overfitting-lookahead-bias'],
    tableOfContents: [
      { id: 'walk-forward-analysis', title: '1. Walk-Forward Analysis (WFA)' },
      { id: 'walk-forward-efficiency', title: '2. Rasio Walk-Forward Efficiency (WFE)' },
      { id: 'simulasi-monte-carlo', title: '3. Simulasi Resampling Monte Carlo' }
    ],
    sections: [
      {
        id: 'walk-forward-analysis',
        title: '1. Walk-Forward Analysis (WFA)',
        content: `Menguji strategi menggunakan jendela waktu bergulir (rolling windows) yang mensimulasikan penerapan berkala di dunia nyata.`
      },
      {
        id: 'walk-forward-efficiency',
        title: '2. Rasio Walk-Forward Efficiency (WFE)',
        content: `WFE = Performa Out-of-Sample / Performa In-Sample. Jika WFE > 60%, strategi terbukti tangguh.`
      },
      {
        id: 'simulasi-monte-carlo',
        title: '3. Simulasi Resampling Monte Carlo',
        content: `Mengacak urutan ribuan trade sebanyak 10,000 kali untuk mengukur batas Drawdown pada persentil ke-95.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menolak strategi yang drawdown Monte Carlo-nya masih berada di batas toleransi wajar.',
        correction: 'Monte Carlo dirancang untuk memetakan skenario terburuk, bukan untuk mencari kepastian.'
      }
    ],
    keyTakeaways: [
      'WFA menguji adaptabilitas parameter terhadap dinamika pasar.',
      'Monte Carlo memetakan distribusi risiko kebangkrutan.'
    ],
    relatedTopics: [
      { slug: 'quant-risk-metrics-sharpe-sortino', title: 'Risk Metrics', category: 'Quantitative' }
    ],
    references: [
      { title: 'The Evaluation and Optimization of Trading Strategies', author: 'Robert Pardo', year: '2008' }
    ]
  },

  'quant-risk-metrics-sharpe-sortino': {
    id: 'art-quant-risk-metrics',
    nodeId: 'quant-4-1',
    slug: 'quant-risk-metrics-sharpe-sortino',
    title: 'Analisis Metrik Kinerja: Sharpe, Sortino, & Calmar Ratio',
    category: 'Quantitative',
    level: 4,
    readingTimeMinutes: 13,
    difficulty: 'Advanced',
    summary: 'Mengevaluasi imbal hasil disesuaikan risiko (Risk-Adjusted Return) dan mengisolasi volatilitas penurunan.',
    prerequisites: ['quant-walk-forward-monte-carlo'],
    tableOfContents: [
      { id: 'sharpe-ratio', title: '1. Sharpe Ratio & Batasan Standarnya' },
      { id: 'sortino-ratio', title: '2. Sortino Ratio (Downside Deviation)' },
      { id: 'calmar-ratio', title: '3. Calmar Ratio & Maximum Drawdown' }
    ],
    sections: [
      {
        id: 'sharpe-ratio',
        title: '1. Sharpe Ratio & Batasan Standarnya',
        content: `(Return Portofolio - Risk Free Rate) / Standar Deviasi. Sharpe > 1.0 bagus; Sharpe > 2.0 kelas dunia.`
      },
      {
        id: 'sortino-ratio',
        title: '2. Sortino Ratio (Downside Deviation)',
        content: `Hanya menghukum volatilitas negatif; tidak menghukum volatilitas lonjakan keuntungan ke atas.`
      },
      {
        id: 'calmar-ratio',
        title: '3. Calmar Ratio & Maximum Drawdown',
        content: `CAGR / Max Drawdown. Mengukur ketahanan keuntungan tahunan terhadap rasa sakit drawdown terdalam.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Hanya membanggakan persentase total return tanpa melihat besaran Sharpe ratio.',
        correction: 'Hedge fund memprioritaskan return yang disesuaikan dengan risiko.'
      }
    ],
    keyTakeaways: [
      'Metrik risiko memisahkan strategi keberuntungan dari strategi yang stabil.',
      'Sortino ratio lebih adil untuk strategi yang memiliki return miring positif.'
    ],
    relatedTopics: [
      { slug: 'quant-var-cvar-tail-risk', title: 'VaR & Tail Risk', category: 'Quantitative' }
    ],
    references: [
      { title: 'Modern Portfolio Theory and Investment Analysis', author: 'Edwin J. Elton', year: '2014' }
    ]
  },

  'quant-var-cvar-tail-risk': {
    id: 'art-quant-tail-risk',
    nodeId: 'quant-4-2',
    slug: 'quant-var-cvar-tail-risk',
    title: 'Manajemen Risiko Ekor: Value at Risk (VaR) & CVaR',
    category: 'Quantitative',
    level: 4,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Menghitung potensi kerugian ekstrem pada persentil 99% menggunakan metode Historical, Parametrik, dan Monte Carlo.',
    prerequisites: ['quant-risk-metrics-sharpe-sortino'],
    tableOfContents: [
      { id: 'value-at-risk', title: '1. Konsep Value at Risk (VaR)' },
      { id: 'cvar-expected-shortfall', title: '2. Conditional VaR (Expected Shortfall)' },
      { id: 'black-swan-tail', title: '3. Mengantisipasi Krisis Angsa Hitam' }
    ],
    sections: [
      {
        id: 'value-at-risk',
        title: '1. Konsep Value at Risk (VaR)',
        content: `Berapa kerugian maksimal dalam horizon waktu tertentu pada tingkat kepercayaan 95% atau 99%?`
      },
      {
        id: 'cvar-expected-shortfall',
        title: '2. Conditional VaR (Expected Shortfall)',
        content: `Menghitung rata-rata besaran kerugian saat batas ambang VaR terlampaui (mengukur ekor tebal distribusi).`
      },
      {
        id: 'black-swan-tail',
        title: '3. Mengantisipasi Krisis Angsa Hitam',
        content: `Gunakan CVaR untuk menetapkan batas modal cadangan proteksi kebangkrutan.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengasumsikan distribusi return finansial selalu berbentuk kurva lonceng normal.',
        correction: 'Pasar keuangan memiliki fenomena Fat Tails (ekor tebal krisis).'
      }
    ],
    keyTakeaways: [
      'CVaR adalah standar regulasi perbankan modern Basel III/IV.',
      'Jangan biarkan satu peristiwa ekstrem menghancurkan seluruh hasil tahunan.'
    ],
    relatedTopics: [
      { slug: 'quant-pinescript-v5-webhooks', title: 'Pine Script Automasi', category: 'Quantitative' }
    ],
    references: [
      { title: 'Value at Risk', author: 'Philippe Jorion', year: '2006' }
    ]
  },

  'quant-pinescript-v5-webhooks': {
    id: 'art-quant-pinescript',
    nodeId: 'quant-5-1',
    slug: 'quant-pinescript-v5-webhooks',
    title: 'Pengembangan Pine Script v5: State Machine & Webhooks',
    category: 'Quantitative',
    level: 5,
    readingTimeMinutes: 15,
    difficulty: 'Advanced',
    summary: 'Mengembangkan indikator dan strategi otomatis di TradingView menggunakan arsitektur state machine yang bersih dan webhook JSON.',
    prerequisites: ['quant-var-cvar-tail-risk'],
    tableOfContents: [
      { id: 'arsitektur-pinescript', title: '1. Arsitektur State Machine Pine Script' },
      { id: 'mencegah-repaint', title: '2. Mengunci barstate.isconfirmed Bebas Repaint' },
      { id: 'webhook-payload', title: '3. Pengiriman Payload Webhook JSON' }
    ],
    sections: [
      {
        id: 'arsitektur-pinescript',
        title: '1. Arsitektur State Machine Pine Script',
        content: `Kelola transisi status strategi (Flat, Long, Short) menggunakan variabel kondisi yang bersih tanpa redudansi.`
      },
      {
        id: 'mencegah-repaint',
        title: '2. Mengunci barstate.isconfirmed Bebas Repaint',
        content: `Hanya tembakkan instruksi trading saat lilin candle resmi tertutup untuk menjamin konsistensi antara chart dan eksekusi riil.`
      },
      {
        id: 'webhook-payload',
        title: '3. Pengiriman Payload Webhook JSON',
        content: `Format alert dalam string JSON standar: {"action": "BUY", "ticker": "EURUSD", "sl": 1.0850, "tp": 1.0950}.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengevaluasi sinyal pada candle yang masih berjalan (calc_on_every_tick=true).',
        correction: 'Kunci evaluasi hanya pada barstate.isconfirmed.'
      }
    ],
    keyTakeaways: [
      'Pine Script v5 adalah platform cloud alert paling andal.',
      'Format JSON memudahkan integrasi webhook dengan server backend.'
    ],
    relatedTopics: [
      { slug: 'quant-execution-api-slippage-latency', title: 'Live Execution API', category: 'Quantitative' }
    ],
    references: [
      { title: 'TradingView Pine Script v5 Reference', author: 'TradingView', year: '2023' }
    ]
  },

  'quant-execution-api-slippage-latency': {
    id: 'art-quant-execution-api',
    nodeId: 'quant-5-2',
    slug: 'quant-execution-api-slippage-latency',
    title: 'Eksekusi Live API: WebSocket Streams & Mitigasi Slippage',
    category: 'Quantitative',
    level: 5,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Menghubungkan algoritma ke gateway broker via REST & WebSocket API, penanganan reconnection failover, dan smart routing.',
    prerequisites: ['quant-pinescript-v5-webhooks'],
    tableOfContents: [
      { id: 'websocket-vs-rest', title: '1. WebSocket vs. REST API' },
      { id: 'penanganan-reconnection', title: '2. Penanganan Reconnection & Heartbeat' },
      { id: 'mitigasi-slippage', title: '3. Mitigasi Slippage & Order Routing' }
    ],
    sections: [
      {
        id: 'websocket-vs-rest',
        title: '1. WebSocket vs. REST API',
        content: `Gunakan REST untuk order submission awal; gunakan WebSocket untuk streaming live feed data dan laporan eksekusi.`
      },
      {
        id: 'penanganan-reconnection',
        title: '2. Penanganan Reconnection & Heartbeat',
        content: `Terapkan algoritma Exponential Backoff dan ping/pong heartbeat untuk mendeteksi socket mati secara dini.`
      },
      {
        id: 'mitigasi-slippage',
        title: '3. Mitigasi Slippage & Order Routing',
        content: `Gunakan limit order pintar atau algoritma pemecah volume TWAP untuk meminimalkan dampak pasar (market impact).`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Langsung memperdagangkan modal riil tanpa uji coba paper trading live API minimal 30 hari.',
        correction: 'Selalu lakukan staging paper trading untuk menguji stabilitas koneksi jaringan.'
      }
    ],
    keyTakeaways: [
      'Infrastruktur eksekusi menentukan apakah edge Anda dapat direalisasikan.',
      'Penanganan failover otomatis adalah keharusan sistem tingkat institusi.'
    ],
    relatedTopics: [
      { slug: 'quantitative-algo-trading-mastery', title: 'Quantitative Mastery Guide', category: 'Quantitative' }
    ],
    references: [
      { title: 'Building Low Latency Trading Systems', author: 'Paul Bilokon', year: '2020' }
    ]
  }
};
