import { EducationalArticle } from '../../types';

export const QUANT_ARTICLES: Record<string, EducationalArticle> = {
  // Master Guide Quantitative & Algo Trading
  'quantitative-algo-trading-mastery': {
    id: 'art-quant-mastery',
    slug: 'quantitative-algo-trading-mastery',
    title: 'Trading Kuantitatif & Algoritmik: Dari Matematika Finansial Hingga Eksekusi Live Otomatis',
    category: 'Quantitative Analysis',
    level: 1,
    readingTimeMinutes: 25,
    difficulty: 'Advanced',
    summary: 'Masterclass komprehensif algorithmic trading: uji stasioneritas time series (ADF test), vektorisasi Python & Pandas, model Momentum vs Mean-Reversion, arsitektur event-driven backtesting, mitigasi overfitting, dan integrasi webhook Pine Script ke API bursa.',
    prerequisites: ['what-is-trading-fundamentals', 'risk-management-psychology-mastery'],
    tableOfContents: [
      { id: 'hakikat-kuantitatif', title: '1. Hakikat Trading Kuantitatif' },
      { id: 'stasioneritas-data', title: '2. Stasioneritas & Log Returns' },
      { id: 'arsitektur-vektorisasi', title: '3. Komputasi Vektorisasi Python & Pandas' },
      { id: 'dua-keluarga-model', title: '4. Model Momentum vs. Mean Reversion' },
      { id: 'validasi-backtest', title: '5. Protokol Validasi Walk-Forward & Monte Carlo' },
      { id: 'eksekusi-live-api', title: '6. Arsitektur Eksekusi Live API & Webhooks' }
    ],
    sections: [
      {
        id: 'hakikat-kuantitatif',
        title: '1. Hakikat Trading Kuantitatif',
        visualType: 'quant_time_series_stationarity_diagram',
        callout: {
          type: 'note',
          title: 'Definisi Quant Trading',
          text: 'Trading kuantitatif menggantikan intuisi subjektif manusia dengan model matematika ketat yang dapat diuji ulang secara statistik pada data historis.'
        },
        financialExample: {
          scenario: 'Hedge fund kuantitatif menguji strategi moving average crossover pada pasangan mata uang EUR/USD data tick 10 tahun (50 juta baris data).',
          analysis: 'Kalkulasi manual atau loop lambat membutuhkan 14 jam; komputasi vektorisasi NumPy menyelesaikannya dalam 1.8 detik.',
          outcome: 'Strategi dioptimasi bebas bias subjektif dan menghasilkan Sharpe Ratio 1.85 dengan Maximum Drawdown terkunci di bawah 8%.'
        },
        content: `### Mengapa Algoritma Menguasai 80% Volume Wall Street?
Di era modern, lebih dari 80% volume transaksi di New York Stock Exchange dan Chicago Mercantile Exchange dieksekusi oleh mesin algoritma.
Trading kuantitatif mentransformasi spekulasi finansial menjadi sains rekayasa perangkat lunak dan analisis probabilitas:

| Parameter Evaluasi | Trader Diskresioner Konvensional | Quantitative Trader (Quants) |
| :--- | :--- | :--- |
| **Dasar Keputusan** | Firasat, pola visual visual chart, emosi sesaat | Model matematika, regresi statistik, dan sinyal algoritmik |
| **Pengujian Hipotesis** | Review visual beberapa chart masa lalu | Backtesting jutaan bar data dengan simulasi Monte Carlo |
| **Manajemen Eksekusi** | Klik mouse manual, rentan terlambat (hesitation) | Eksekusi API sub-milidetik bebas emosi |
| **Evaluasi Kinerja** | Menghitung persentase saldo profit | Metrik Sharpe Ratio, Sortino Ratio, VaR, dan Calmar Ratio |`
      },
      {
        id: 'stasioneritas-data',
        title: '2. Stasioneritas & Log Returns',
        visualType: 'quant_time_series_stationarity_diagram',
        callout: {
          type: 'warning',
          title: 'Bahaya Harga Mentah Non-Stasioner',
          text: 'Jangan pernah memasukkan harga mentah (raw prices) ke dalam algoritma regresi atau machine learning! Data harga mentah memiliki drift non-stasioner yang menghasilkan korelasi palsu (spurious regression).'
        },
        content: `### Mengapa Deret Waktu Finansial Wajib Diubah Menjadi Return?
Sebagian besar model statistik mengharuskan data bersifat **stasioner** (artinya mean, varians, dan autokorelasi konstan sepanjang waktu):
- **Raw Price $P_t$**: Bersifat Non-Stasioner (*Random Walk with Drift*). Rata-rata harga terus berubah seiring waktu.
- **Logarithmic Returns $r_t$**:
  $$r_t = \\ln\\left(\\frac{P_t}{P_{t-1}}\\right)$$
- **Uji Augmented Dickey-Fuller (ADF)**:
  - *Hipotesis Nol ($H_0$)*: Deret waktu memiliki unit root (Non-stasioner).
  - *Keputusan*: Jika p-value < 0.05, tolak $H_0$. Data terbukti stasioner dan aman diolah oleh model kuantitatif.`
      },
      {
        id: 'arsitektur-vektorisasi',
        title: '3. Komputasi Vektorisasi Python & Pandas',
        callout: {
          type: 'tip',
          title: 'Hindari for-loop di Python',
          text: 'Gunakan operasi array NumPy dan fungsi vektorisasi Pandas (.shift(1), .rolling(), .pct_change()) untuk kecepatan pemrosesan 100x lebih kencang.'
        },
        financialExample: {
          scenario: 'Menghitung sinyal strategi Dual Moving Average (SMA 20 vs SMA 50) pada 1,000,000 candle bar.',
          analysis: 'Kode Python: data["signal"] = np.where(data["fast_sma"] > data["slow_sma"], 1, -1); data["strategy_ret"] = data["signal"].shift(1) * data["log_ret"]',
          outcome: 'Penerapan .shift(1) secara mutlak mengeliminasi Lookahead Bias (mengintip masa depan).'
        },
        content: `### Menghilangkan Loop Lambat
Bahasa pemrograman Python dikenal lambat jika menggunakan perulangan \`for\` konvensional. Dalam riset kuantitatif institusional, seluruh operasi diubah menjadi vektorisasi matematis (*Single Instruction, Multiple Data*):

\`\`\`python
import numpy as np
import pandas as pd

# Kalkulasi Vektorisasi Sinyal Cepat
df['log_ret'] = np.log(df['close'] / df['close'].shift(1))
df['fast_sma'] = df['close'].rolling(window=20).mean()
df['slow_sma'] = df['close'].rolling(window=50).mean()

# Sinyal posisi: 1 (Long), -1 (Short)
df['position'] = np.where(df['fast_sma'] > df['slow_sma'], 1, -1)

# Wajib shift(1) untuk mencegah lookahead bias!
df['strategy_return'] = df['position'].shift(1) * df['log_ret']
\`\`\``
      },
      {
        id: 'dua-keluarga-model',
        title: '4. Model Momentum vs. Mean Reversion',
        visualType: 'orderbook_depth_l2',
        callout: {
          type: 'note',
          title: 'Dua Sisi Mata Uang Pasar',
          text: 'Strategi Momentum mengejar pergerakan tren berkelanjutan (membeli tinggi untuk menjual lebih tinggi). Strategi Mean Reversion mengeksploitasi kepanikan sesaat untuk membeli saat harga terdeviasi jauh dari nilai wajarnya.'
        },
        content: `### Dua Paradigma Utama Perdagangan Algoritmik:
1. **Model Momentum (Trend Following)**:
   - Didasarkan pada fenomena bahwa aset yang berkinerja unggul dalam 3-12 bulan terakhir cenderung melanjutkan keunggulannya.
   - Karakteristik: Win-rate moderat (35% - 45%) namun dengan payoff asimetris sangat besar (R:R > 1:3).
2. **Model Mean Reversion (Statistical Arbitrage)**:
   - Didasarkan pada proses stokastik **Ornstein-Uhlenbeck**: deviasi harga dari nilai rata-ratanya pada akhirnya akan ditarik kembali ke garis ekuilibrium.
   - Menggunakan metrik **Z-Score**:
     $$Z = \\frac{P_t - \\mu}{\\sigma}$$
   - Beli saat $Z < -2.0$ (ekstrem terdiskon); Jual saat $Z > +2.0$ (ekstrem mahal).`
      },
      {
        id: 'validasi-backtest',
        title: '5. Protokol Validasi Walk-Forward & Monte Carlo',
        visualType: 'quant_monte_carlo_drawdown',
        callout: {
          type: 'warning',
          title: 'Overfitting Adalah Musuh Nomor 1',
          text: 'Strategi yang menghasilkan kurva ekuitas lurus sempurna di masa lalu hampir pasti mengalami overfitting (curve fitting) dan akan gagal total saat diterapkan dengan uang riil.'
        },
        financialExample: {
          scenario: 'Strategi kuantitatif diuji dengan Walk-Forward Analysis (WFA) melintasi 10 jendela waktu bergulir sepanjang tahun 2015-2024.',
          analysis: 'Rasio Walk-Forward Efficiency (WFE) tercatat 74% (performa Out-of-Sample mempertahankan 74% dari performa In-Sample).',
          outcome: 'Simulasi resampling Monte Carlo 10,000 iterasi membuktikan risiko maksimum drawdown pada persentil ke-95 terkunci di -12.4%.'
        },
        content: `### Protokol Validasi Ketat Institusional
- **Pemisahan Dataset 3 Tahap**:
  - *In-Sample (Train, 60%)*: Untuk eksplorasi parameter.
  - *Validation (20%)*: Untuk pemilihan model.
  - *Out-of-Sample (Test, 20%)*: Hanya diuji SATU KALI sebelum deployment riil.
- **Simulasi Resampling Monte Carlo**:
  Mengacak urutan urutan transaksi trade secara probabilistik untuk memetakan worst-case scenario drawdown pada tingkat kepercayaan 95% dan 99%.`
      },
      {
        id: 'eksekusi-live-api',
        title: '6. Arsitektur Eksekusi Live API & Webhooks',
        visualType: 'entry_protocol',
        callout: {
          type: 'tip',
          title: 'Arsitektur Webhook Siaga Tinggi',
          text: 'Gunakan TradingView Pine Script v5 untuk komputasi cloud alerting, lalu tembakkan payload JSON via Webhook ke Express/Node gateway yang meneruskan order ke broker via WebSocket API.'
        },
        content: `### Arsitektur Otomasi End-to-End
1. **TradingView Engine**: Menjalankan skrip Pine Script v5 pada cloud server dengan trigger \`alert_message\` yang terkunci pada \`barstate.isconfirmed\`.
2. **Webhook Gateway**: Server Node.js / Express menerima sinyal JSON terenkripsi HMAC signature.
3. **Execution Connector**: Mengirimkan limit order presisi ke broker (Alpaca, Interactive Brokers, Binance) dengan slippage protection.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengabaikan biaya komisi dan slippage saat menghitung profitabilitas backtest.',
        correction: 'Sertakan minimal 1-2 pip spread dan 0.05% komisi pada setiap kalkulasi order backtest.'
      },
      {
        mistake: 'Mengutak-atik puluhan parameter indikator hingga kurva masa lalu terlihat sempurna.',
        correction: 'Batasi parameter strategi maksimal 2-3 variabel untuk mencegah jebakan overfitting.'
      }
    ],
    keyTakeaways: [
      'Trading kuantitatif mengubah probabilitas menjadi keunggulan matematis sistematis.',
      'Data deret waktu wajib distasionerkan via Log Returns sebelum dimodelkan.',
      'Monte Carlo dan Walk-Forward Analysis adalah standar baku verifikasi keandalan strategi.',
      'Slippage dan latensi eksekusi adalah penentu apakah strategi mampu menghasilkan uang di dunia nyata.'
    ],
    relatedTopics: [
      { slug: 'quant-time-series-stationarity', title: 'Time Series Stationarity', category: 'Quantitative' },
      { slug: 'quant-python-pandas-vectorization', title: 'Pandas Vectorization', category: 'Quantitative' },
      { slug: 'quant-walk-forward-monte-carlo', title: 'Walk-Forward & Monte Carlo', category: 'Quantitative' }
    ],
    references: [
      { title: 'Advances in Financial Machine Learning', author: 'Marcos López de Prado', year: '2018' },
      { title: 'Algorithmic Trading: Winning Strategies and Their Rationale', author: 'Ernie Chan', year: '2013' }
    ]
  },

  // Node articles Quantitative & Algo
  'quant-time-series-stationarity': {
    id: 'art-quant-stationarity',
    nodeId: 'quant-1-1',
    slug: 'quant-time-series-stationarity',
    title: 'Stasioneritas Time Series & Log Returns (Uji ADF & Hurst)',
    category: 'Quantitative',
    level: 1,
    readingTimeMinutes: 15,
    difficulty: 'Advanced',
    summary: 'Membuktikan kestasioneran data menggunakan Augmented Dickey-Fuller (ADF) test dan mendeteksi regim tren vs mean-reversion via Hurst Exponent.',
    prerequisites: ['what-is-trading-fundamentals'],
    tableOfContents: [
      { id: 'uji-adf', title: '1. Uji Augmented Dickey-Fuller (ADF)' },
      { id: 'hurst-exponent', title: '2. Eksponen Hurst (H): Mengukur Memori Tren' },
      { id: 'log-returns-math', title: '3. Keunggulan Matematis Log Returns' }
    ],
    sections: [
      {
        id: 'uji-adf',
        title: '1. Uji Augmented Dickey-Fuller (ADF)',
        visualType: 'quant_time_series_stationarity_diagram',
        callout: {
          type: 'note',
          title: 'Kriteria ADF',
          text: 'Data deret waktu finansial terbukti stasioner hanya jika ADF Test Statistic lebih negatif daripada Critical Value 5% dan p-value < 0.05.'
        },
        content: `Uji ADF memeriksa ada tidaknya unit root. Jika p-value < 0.05, deret waktu bersifat mean-reverting stasioner.`
      },
      {
        id: 'hurst-exponent',
        title: '2. Eksponen Hurst (H): Mengukur Memori Tren',
        callout: {
          type: 'tip',
          title: 'Klasifikasi Nilai Hurst (H)',
          text: 'H = 0.5: Random Walk murni (Brownian motion).\nH < 0.5: Mean-Reverting (kembali ke rata-rata).\nH > 0.5: Trending / Persistent (berkelanjutan).'
        },
        content: `Eksponen Hurst memetakan sifat dasar pasar: H > 0.5 menandakan tren jangka panjang; H < 0.5 menandakan rezim mean reversion.`
      },
      {
        id: 'log-returns-math',
        title: '3. Keunggulan Matematis Log Returns',
        financialExample: {
          scenario: 'Aset berharga $100 naik +10% menjadi $110, lalu turun -10% menjadi $99. Penghitungan persentase sederhana menghasilkan laba palsu 0%.',
          analysis: 'Log returns: r1 = ln(110/100) = +0.0953; r2 = ln(99/110) = -0.1053. Total kumulatif r = r1 + r2 = -0.0100 (rugi -1.0%).',
          outcome: 'Log returns bersifat aditif sempurna lintas waktu, mencerminkan realitas finansial tanpa bias asimetri persentase.'
        },
        content: `Log returns bersifat aditif sepanjang waktu dan simetris terhadap kenaikan dan penurunan harga.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menggunakan raw price level dalam regresi linier.',
        correction: 'Ubah seluruh harga menjadi log returns atau differencing tingkat satu.'
      }
    ],
    keyTakeaways: [
      'Stasioneritas adalah syarat mutlak analisis deret waktu.',
      'Eksponen Hurst mengarahkan pemilihan strategi (Momentum vs Mean Reversion).'
    ],
    relatedTopics: [
      { slug: 'quant-python-pandas-vectorization', title: 'Vectorized Computing', category: 'Quantitative' }
    ],
    references: [
      { title: 'Analysis of Financial Time Series', author: 'Ruey S. Tsay', year: '2010' }
    ]
  },

  'quant-python-pandas-vectorization': {
    id: 'art-quant-vectorization',
    nodeId: 'quant-1-2',
    slug: 'quant-python-pandas-vectorization',
    title: 'Vektorisasi Python & Pandas: Akselerasi Komputasi Finansial',
    category: 'Quantitative',
    level: 1,
    readingTimeMinutes: 15,
    difficulty: 'Advanced',
    summary: 'Meninggalkan perulangan for-loop lambat dan memanfaatkan komputasi array NumPy C-level untuk memproses jutaan tick dalam hitungan detik.',
    prerequisites: ['quant-time-series-stationarity'],
    tableOfContents: [
      { id: 'vektorisasi-speed', title: '1. Vektorisasi vs Loop Lambat' },
      { id: 'manipulasi-dataframe', title: '2. Manipulasi DataFrame Cepat' },
      { id: 'mencegah-lookahead', title: '3. Mencegah Lookahead Bias dengan .shift(1)' }
    ],
    sections: [
      {
        id: 'vektorisasi-speed',
        title: '1. Vektorisasi vs Loop Lambat',
        callout: {
          type: 'note',
          title: 'Efisiensi C-Level',
          text: 'NumPy mengeksekusi operasi matematika langsung pada memori kontinu menggunakan instruksi prosesor SIMD.'
        },
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
        financialExample: {
          scenario: 'Algoritma mendeteksi sinyal Golden Cross pada penutupan candle pukul 16:00.',
          analysis: 'Jika posisi dihitung menggunakan return bar pukul 16:00, algoritma melakukan lookahead bias (mengasumsikan sudah masuk posisi sebelum sinyal terbentuk).',
          outcome: 'Dengan menerapkan df["signal"].shift(1), order baru dieksekusi pada harga pembukaan bar berikutnya pukul 16:01, mencerminkan realitas trading sesungguhnya.'
        },
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
    readingTimeMinutes: 14,
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
        callout: {
          type: 'note',
          title: 'Dua Cabang Momentum',
          text: 'TSMOM (Trend Following absolut): Membeli aset jika return historisnya positif.\nCSMOM (Relative Strength): Membeli desil aset teratas dan short desil aset terbawah.'
        },
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
        financialExample: {
          scenario: 'Model alokasi menargetkan volatilitas portofolio konstan 12% per tahun pada indeks S&P 500 (SPY).',
          analysis: 'Saat pasar tenang (VIX 12), model mengalokasikan 100% modal ke SPY. Saat krisis likuiditas (VIX 36), model secara otomatis memangkas eksposur menjadi hanya 33% (sisa modal diparkir di kas aman).',
          outcome: 'Maximum Drawdown portofolio selama krisis berkurang dari -34% menjadi hanya -11%.'
        },
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
    readingTimeMinutes: 15,
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
        callout: {
          type: 'tip',
          title: 'Ambang Z-Score',
          text: 'Entry Buy: Z < -2.0. Entry Sell: Z > +2.0. Exit posisi tepat saat Z kembali ke garis 0.0 (ekuilibrium).'
        },
        content: `Z = (Harga - Mean) / Standar Deviasi. Beli saat Z < -2.0; Jual saat Z > +2.0; Tutup saat Z = 0.`
      },
      {
        id: 'proses-ou',
        title: '2. Proses Stokastik Ornstein-Uhlenbeck',
        content: `Model matematis kecepatan pengembalian nilai rata-rata deviasi harga: dX_t = theta * (mu - X_t) * dt + sigma * dW_t.`
      },
      {
        id: 'half-life-math',
        title: '3. Menghitung Half-Life Pengembalian',
        financialExample: {
          scenario: 'Pairs trading antara Emas (GLD) dan Perak (SLV) menunjukkan kointegrasi kuat. Regresi OU menghasilkan theta = 0.0693 per hari.',
          analysis: 'Half-Life = ln(2) / theta = 0.693 / 0.0693 = 10 hari.',
          outcome: 'Trader mengetahui secara matematis bahwa deviasi spread rata-rata membutuhkan waktu 10 hari untuk kembali ke nilai wajar, memberikan pedoman durasi holding posisi yang presisi.'
        },
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
    readingTimeMinutes: 15,
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
        visualType: 'orderbook_depth_l2',
        callout: {
          type: 'note',
          title: 'Kedalaman Pasar (DOM)',
          text: 'Level 2 menyajikan seluruh antrean limit buy dan limit sell pada setiap tick harga di bursa secara real-time.'
        },
        content: `Daftar antrean volume limit order bid dan ask pada setiap tingkatan harga di bursa.`
      },
      {
        id: 'orderbook-imbalance',
        title: '2. Order Book Imbalance (OBI)',
        callout: {
          type: 'tip',
          title: 'Rumus OBI',
          text: 'OBI = (Volume Bid - Volume Ask) / (Volume Bid + Volume Ask). Nilai mendekati +1.0 mengindikasikan dominasi pembeli limit yang tebal.'
        },
        content: `OBI = (V_bid - V_ask) / (V_bid + V_ask). Nilai > +0.40 mengindikasikan tekanan beli mikro.`
      },
      {
        id: 'vwap-eksekusi',
        title: '3. VWAP & Cumulative Volume Delta (CVD)',
        financialExample: {
          scenario: 'Dana pensiun ingin mengakumulasi 50,000 saham Tesla tanpa memicu lonjakan harga di bursa.',
          analysis: 'Algoritma eksekusi Volume-Weighted Average Price (VWAP) memecah pesanan raksasa menjadi ratusan sub-order kecil yang dipasangkan dengan distribusi volume intraday historis.',
          outcome: 'Pesanan terisi penuh dengan deviasi hanya 2 sen dari harga VWAP harian, menghemat $85,000 biaya slippage.'
        },
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
    readingTimeMinutes: 15,
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
        callout: {
          type: 'note',
          title: 'Kecepatan Skrining',
          text: 'Vectorized engine ideal untuk menguji 1,000 kombinasi parameter strategi dalam hitungan detik.'
        },
        content: `Perkalian matriks cepat di DataFrame. Sangat cocok untuk skrining ratusan ide awal dalam hitungan detik.`
      },
      {
        id: 'event-driven-loop',
        title: '2. Event-Driven Simulation Loop',
        callout: {
          type: 'warning',
          title: 'Realitas Eksekusi',
          text: 'Hanya event-driven engine yang mampu memodelkan antrean limit order, partial fill, dan slippage jaringan internet nyata.'
        },
        content: `Mensimulasikan waktu bar demi bar dengan antrean order, fill parsial, dan biaya slippage realistis.`
      },
      {
        id: 'pemilihan-arsitektur',
        title: '3. Kapan Menggunakan Masing-Masing Engine?',
        financialExample: {
          scenario: 'Strategi scalping M1 menghasilkan Sharpe Ratio 3.2 pada vectorized backtest. Saat diuji pada event-driven engine dengan simulasi latency 50ms dan spread 0.8 pip, Sharpe Ratio anjlok menjadi 0.4.',
          analysis: 'Strategi vektorisasi mengasumsikan eksekusi instan tanpa biaya friksi bursa.',
          outcome: 'Pengujian event-driven menyelamatkan dana trader dari kerugian riil $25,000.'
        },
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
    readingTimeMinutes: 16,
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
        callout: {
          type: 'warning',
          title: 'Menghafal Noise',
          text: 'Jika sebuah model memiliki terlalu banyak parameter, model tersebut tidak belajar hukum pasar melainkan hanya menghafal noise kebetulan data masa lalu.'
        },
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
        financialExample: {
          scenario: 'Trader mengisolasi data S&P 500 tahun 2023-2024 sebagai Out-of-Sample (OOS) yang ditutup rapat.',
          analysis: 'Setelah menemukan parameter optimal pada data 2015-2022, strategi dijalankan satu kali pada data OOS.',
          outcome: 'Strategi mempertahankan Sharpe 1.4 di data OOS, membuktikan edge bersifat organik dan bukan akibat curve fitting.'
        },
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
    readingTimeMinutes: 15,
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
        callout: {
          type: 'note',
          title: 'Rolling Windows',
          text: 'WFA mensimulasikan penerapan strategi di mana parameter di-recalibrated secara berkala pada data bergulir.'
        },
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
        visualType: 'quant_monte_carlo_drawdown',
        financialExample: {
          scenario: 'Sebuah sistem menghasilkan 300 trade dalam 2 tahun dengan max drawdown historis 9%.',
          analysis: 'Simulasi Monte Carlo mengacak urutan trade 10,000 kali untuk memperhitungkan probabilitas urutan kekalahan beruntun yang lebih buruk di masa depan.',
          outcome: 'Persentil ke-95 Monte Carlo menunjukkan drawdown potensial dapat mencapai 14.8%. Trader menyesuaikan alokasi modal agar mampu bertahan jika skenario ini terjadi.'
        },
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
    readingTimeMinutes: 14,
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
        callout: {
          type: 'note',
          title: 'Formula Sharpe',
          text: 'Sharpe = (Mean Return - Risk Free Rate) / Total Standard Deviation. Sharpe > 1.5 menandakan strategi yang sangat sehat.'
        },
        content: `(Return Portofolio - Risk Free Rate) / Standar Deviasi. Sharpe > 1.0 bagus; Sharpe > 2.0 kelas dunia.`
      },
      {
        id: 'sortino-ratio',
        title: '2. Sortino Ratio (Downside Deviation)',
        callout: {
          type: 'tip',
          title: 'Volatilitas Baik vs Buruk',
          text: 'Sortino Ratio hanya membagi return dengan deviasi sisi penurunan (downside deviation). Volatilitas lonjakan keuntungan ke atas tidak dihukum.'
        },
        content: `Hanya menghukum volatilitas negatif; tidak menghukum volatilitas lonjakan keuntungan ke atas.`
      },
      {
        id: 'calmar-ratio',
        title: '3. Calmar Ratio & Maximum Drawdown',
        financialExample: {
          scenario: 'Strategi A: Return tahunan 25% dengan Max Drawdown 10% (Calmar 2.5). Strategi B: Return tahunan 40% dengan Max Drawdown 35% (Calmar 1.14).',
          analysis: 'Investor institusi selalu memilih Strategi A karena rasio pengembalian modal terhadap rasa sakit drawdown jauh lebih tinggi.',
          outcome: 'Strategi A mampu di-leverage secara aman jika diinginkan, sementara Strategi B berisiko bangkrut saat terjadi krisis likuiditas.'
        },
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
    readingTimeMinutes: 15,
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
        callout: {
          type: 'note',
          title: 'Definisi VaR',
          text: 'VaR 99% 1-hari sebesar $10,000 berarti ada probabilitas 99% kerugian harian Anda tidak akan melebihi $10,000.'
        },
        content: `Berapa kerugian maksimal dalam horizon waktu tertentu pada tingkat kepercayaan 95% atau 99%?`
      },
      {
        id: 'cvar-expected-shortfall',
        title: '2. Conditional VaR (Expected Shortfall)',
        callout: {
          type: 'warning',
          title: 'Di Balik Tembok VaR',
          text: 'CVaR (Expected Shortfall) mengukur rata-rata kerugian saat peristiwa 1% terburuk benar-benar terjadi.'
        },
        content: `Menghitung rata-rata besaran kerugian saat batas ambang VaR terlampaui (mengukur ekor tebal distribusi).`
      },
      {
        id: 'black-swan-tail',
        title: '3. Mengantisipasi Krisis Angsa Hitam',
        financialExample: {
          scenario: 'Portofolio dana hedge fund $1,000,000 memiliki VaR 99% harian $35,000 dan CVaR 99% harian $75,000.',
          analysis: 'Saat peristiwa Black Swan terjadi (misal pengumuman de-pegging Swiss Franc tahun 2015), kerugian melompat melewati ambang batas VaR.',
          outcome: 'Karena sistem telah mengalokasikan cadangan margin berdasarkan estimasi CVaR $75,000, akun terhindar dari margin call likuidasi paksa.'
        },
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
    readingTimeMinutes: 16,
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
        callout: {
          type: 'note',
          title: 'Arsitektur State Machine',
          text: 'Gunakan variabel var int state = 0 untuk melacak status posisi (0 = Flat, 1 = Long, -1 = Short) agar tidak terjadi pengiriman sinyal ganda.'
        },
        content: `Kelola transisi status strategi (Flat, Long, Short) menggunakan variabel kondisi yang bersih tanpa redudansi.`
      },
      {
        id: 'mencegah-repaint',
        title: '2. Mengunci barstate.isconfirmed Bebas Repaint',
        callout: {
          type: 'warning',
          title: 'Bahaya Repainting',
          text: 'Jangan pernah mengevaluasi sinyal trading pada candle yang masih berjalan! Kunci evaluasi hanya saat barstate.isconfirmed == true.'
        },
        content: `Hanya tembakkan instruksi trading saat lilin candle resmi tertutup untuk menjamin konsistensi antara chart dan eksekusi riil.`
      },
      {
        id: 'webhook-payload',
        title: '3. Pengiriman Payload Webhook JSON',
        financialExample: {
          scenario: 'Pine Script v5 mengeksekusi alert otomatis ke endpoint server Express.',
          analysis: 'Payload template: `{"action": "BUY", "ticker": "EURUSD", "risk_pct": 1.0, "sl": 1.0850, "tp": 1.0950, "secret": "hmac_key"}`',
          outcome: 'Server menerima webhook dalam 85 milidetik dan langsung mengeksekusi order via gateway broker secara otomatis tanpa intervensi manual.'
        },
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
    readingTimeMinutes: 15,
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
        visualType: 'orderbook_depth_l2',
        callout: {
          type: 'note',
          title: 'WebSocket vs REST',
          text: 'WebSocket menyediakan koneksi persisten dua arah (full duplex) dengan latensi < 10ms untuk streaming data pasar real-time.'
        },
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
        financialExample: {
          scenario: 'Algoritma mengirim market order 10 lot pada saat rilis NFP. Tipisnya likuiditas buku pesanan menyebabkan slippage 4 pips ($400 rugi tak terduga).',
          analysis: 'Penerapan Limit Order dengan toleransi slip maksimal (Limit with Offset): order hanya terisi jika harga tidak bergeser lebih dari 0.5 pip.',
          outcome: 'Order terisi dengan slippage nol, mengamankan ekspektansi positif sistem jangka panjang.'
        },
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
