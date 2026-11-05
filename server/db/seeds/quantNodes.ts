import { NodeSeedData } from '../seedData.ts';

export const quantNodes: NodeSeedData[] = [
  {
    id: 'quant-1-1',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: null,
    level: 1,
    title: 'Analisis Deret Waktu Finansial, Uji ADF, & Log Returns',
    slug: 'quant-time-series-stationarity',
    summary: 'Mengapa harga mentah non-stasioner tidak bisa dimodelkan langsung, cara menghitung log returns, dan uji Augmented Dickey-Fuller (ADF).',
    content: `### Mengapa Harga Mentah Menipu Model Statistik?
Deret waktu harga aset finansial ($P_t$) bersifat *Non-Stationary* (memiliki drift tren dan varians yang berubah seiring waktu). Menerapkan model regresi statistik langsung pada harga mentah menghasilkan korelasi palsu (*Spurious Correlation*):
- **Log Returns (Pengembalian Logaritmik)**:
  $$r_t = \\ln\\left(\\frac{P_t}{P_{t-1}}\\right) = \\ln(P_t) - \\ln(P_{t-1})$$
  - Keunggulan: Bersifat aditif sepanjang waktu, simetris terhadap persentase naik/turun, dan mendekati distribusi stasioner.
- **Uji Stasioneritas Augmented Dickey-Fuller (ADF)**:
  - Uji hipotesis statistik untuk mendeteksi keberadaan *Unit Root*.
  - Hipotesis Nol ($H_0$): Deret waktu memiliki unit root (non-stasioner).
  - Jika $p$-value $< 0.05$, kita menolak $H_0$ dan menyimpulkan bahwa deret returns telah stasioner dan aman diolah oleh algoritma kuantitatif.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 400,
    coordinates_y: 80,
    order_index: 1,
    checklists: [
      'Menghitung Log Returns dari data harga penutupan menggunakan NumPy / Pandas',
      'Menjalankan uji ADF (adfuller) dari modul statsmodels di Python',
      'Memahami mengapa stasioneritas adalah prasyarat mutlak pemodelan kuantitatif'
    ],
    resources: [
      { title: 'Analysis of Financial Time Series', author: 'Ruey S. Tsay', url: '#', type: 'Book' },
      { title: 'Introductory Econometrics for Finance', author: 'Chris Brooks', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-1-2',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-1-1',
    level: 1,
    title: 'Python Finansial: Pandas, NumPy, & Pemrosesan Vektorisasi',
    slug: 'quant-python-pandas-vectorization',
    summary: 'Mengolah data OHLCV historis jutaan bar dalam milidetik tanpa perulangan for-loop lambat menggunakan array vektorisasi.',
    content: `### Kecepatan Vektorisasi vs Kelambatan Loop Python
Dalam kuantitatif finansial, perulangan standar \`for\` di Python murni sangat lambat untuk dataset tick-by-tick berjumlah jutaan baris:
- **Vektorisasi NumPy**: Operasi matematika dieksekusi langsung pada level C/SIMD instruction set prosesor tanpa overhead interpreter Python.
- **Manipulasi DataFrame Pandas**:
  \`\`\`python
  import pandas as pd
  import numpy as np

  # Menghitung Log Returns dan Simple Moving Average secara instan
  df['log_return'] = np.log(df['close'] / df['close'].shift(1))
  df['sma_50'] = df['close'].rolling(window=50).mean()
  df['signal'] = np.where(df['close'] > df['sma_50'], 1, -1)
  \`\`\`
- Menghindari *Lookahead Bias* saat melakukan indexing: selalu gunakan \`.shift(1)\` untuk sinyal entry agar keputusan bar $t$ tidak menggunakan data yang baru diketahui pada penutupan bar $t$.`,
    visual_type: 'entry_protocol',
    coordinates_x: 400,
    coordinates_y: 200,
    order_index: 2,
    checklists: [
      'Menghilangkan seluruh loop `for` lambat dan menggantinya dengan vektorisasi Pandas/NumPy',
      'Menerapkan pergeseran bar (.shift(1)) untuk mencegah lookahead bias',
      'Mengoptimalkan tipe data memori (float32 vs float64) pada dataset besar'
    ],
    resources: [
      { title: 'Python for Data Analysis', author: 'Wes McKinney', url: '#', type: 'Book' },
      { title: 'Python for Finance: Mastering Data-Driven Finance', author: 'Yves Hilpisch', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-2-1',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-1-2',
    level: 2,
    title: 'Model Kuantitatif Momentum & Regime Trend Filter',
    slug: 'quant-momentum-trend-following',
    summary: 'Membangun algoritma Time-Series Momentum (TSMOM) dan Cross-Sectional Momentum dengan filter volatilitas ATR dinamis.',
    content: `### Matematika Anomali Momentum Finansial
Anomali momentum (aset yang berkinerja unggul di masa lalu cenderung terus unggul di masa depan dekat) telah terbukti secara akademis selama lebih dari 200 tahun:
- **Time-Series Momentum (Absolute Momentum)**: Aset dibandingkan dengan kinerjanya sendiri di masa lalu (misal return 12 bulan terakhir $> 0$).
- **Cross-Sectional Momentum (Relative Momentum)**: Meranking seluruh semesta aset (misal 500 saham S&P500) dan membeli 10% teratas sambil melakukan short 10% terbawah.
- **Regime Switching Filter**:
  - Menggunakan volatilitas (misal rasio ATR atau VIX) untuk mematikan alokasi momentum saat pasar berada dalam rezim *Chop / High-Volatility Shock*.
  - Sinyal posisi diskalakan secara terbalik terhadap volatilitas: $w_t = \\frac{\\sigma_{\\text{target}}}{\\sigma_t}$.`,
    visual_type: 'swing_structure',
    coordinates_x: 230,
    coordinates_y: 330,
    order_index: 3,
    checklists: [
      'Mengimplementasikan perhitungan return multi-periode (1M, 3M, 12M)',
      'Membuat modul perankingan cross-sectional aset berbasis kuantil',
      'Menerapkan target volatilitas dinamis (Volatility Targeting)'
    ],
    resources: [
      { title: 'Expected Returns: An Investor\'s Guide to Harvesting Market Rewards', author: 'Antti Ilmanen', url: '#', type: 'Book' },
      { title: 'Quantitative Momentum: A Practitioner\'s Guide', author: 'Wesley R. Gray & Jack R. Vogel', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-2-2',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-2-1',
    level: 2,
    title: 'Model Mean-Reversion, Z-Score, & Proses Ornstein-Uhlenbeck',
    slug: 'quant-mean-reversion-ornstein-uhlenbeck',
    summary: 'Mengukur deviasi harga dari nilai ekuilibrium melalui Z-Score dan menghitung waktu paruh pengembalian (Half-Life).',
    content: `### Memodelkan Karet Gelang Finansial
Strategi Mean-Reversion beroperasi berdasarkan premis bahwa spread harga antara dua aset terkointegrasi atau deviasi dari moving average akan kembali ke nilai rata-ratanya:
- **Z-Score Normalisasi Deviasi**:
  $$Z_t = \\frac{P_t - \\mu_t}{\\sigma_t}$$
  - Di mana $\\mu_t$ adalah moving average dan $\\sigma_t$ adalah standar deviasi dari rentang jendela lookback.
  - Aturan Entry Kuantitatif: Buy jika $Z_t < -2.0$ (kondisi oversold ekstrem) dan Sell jika $Z_t > +2.0$ (overbought ekstrem). Keluar saat $Z_t$ menyentuh 0 (Equilibrium).
- **Proses Stokastik Ornstein-Uhlenbeck**:
  $$dX_t = \\theta (\\mu - X_t) dt + \\sigma dW_t$$
  - Menghitung **Half-Life ($t_{1/2}$)** pengembalian nilai rata-rata:
    $$t_{1/2} = \\frac{\\ln(2)}{\\theta}$$
  - Jika half-life terlalu lama (misal $> 60$ hari), modal akan terkunci terlalu lama dan strategi tidak efisien.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 570,
    coordinates_y: 330,
    order_index: 4,
    checklists: [
      'Menghitung Z-Score bergulir (rolling) dari spread pasangan pasangan aset',
      'Melakukan regresi linear OLS untuk mengestimasi parameter kecepatan rata-rata theta',
      'Menghitung Half-Life pengembalian ekuilibrium sebelum mengaktifkan strategi'
    ],
    resources: [
      { title: 'Quantitative Trading: How to Build Your Own Algorithmic Trading Business', author: 'Ernie Chan', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-2-3',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-2-1',
    level: 2,
    title: 'Mikrostruktur Pasar: Order Book Level 2/3 & VWAP Analytics',
    slug: 'quant-orderbook-microstructure-l2',
    summary: 'Menganalisis ketidakseimbangan limit order book (OBI), Cumulative Volume Delta (CVD), dan algoritma eksekusi institusi VWAP.',
    content: `### Menyelam ke Mesin Pencocokan Order Bursa
Di balik grafik candlestick terdapat buku pesanan lelang waktu nyata (*Limit Order Book / LOB*):
- **Level 2 (Market Depth)**: Daftar antrean volume resting order pada setiap tingkatan harga bid dan ask.
- **Order Book Imbalance (OBI)**:
  $$OBI_t = \\frac{V_{\\text{bid}} - V_{\\text{ask}}}{V_{\\text{bid}} + V_{\\text{ask}}}$$
  - Jika $OBI > +0.40$, terdapat ketidakseimbangan minat beli yang signifikan di antrean limit order, memprediksi tekanan harga naik dalam horizon milidetik ke depan.
- **Cumulative Volume Delta (CVD)**: Akumulasi selisih volume transaksi agresif pembeli (*Market Buy at Ask*) dikurangi penjual agresif (*Market Sell at Bid*).
- **Volume-Weighted Average Price (VWAP)**: Tolok ukur eksekusi institusional standar:
  $$\\text{VWAP} = \\frac{\\sum (P_i \\times V_i)}{\\sum V_i}$$`,
    visual_type: 'liquidity_pools',
    coordinates_x: 400,
    coordinates_y: 470,
    order_index: 5,
    checklists: [
      'Memahami struktur data buku pesanan Level 2 (Bids vs Asks)',
      'Menghitung indikator Order Book Imbalance (OBI) secara real-time',
      'Mengintegrasikan pita standar deviasi VWAP sebagai acuan nilai wajar intraday'
    ],
    resources: [
      { title: 'Trades, Quotes and Prices: Financial Markets Under the Microscope', author: 'Jean-Philippe Bouchaud et al.', url: '#', type: 'Book' },
      { title: 'Market Microstructure in Practice', author: 'Charles-Albert Lehalle', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-3-1',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-2-2',
    level: 3,
    title: 'Arsitektur Engine: Vectorized vs Event-Driven Backtesting',
    slug: 'quant-vectorized-vs-event-driven',
    summary: 'Membedakan riset cepat vektorisasi vs engine event-driven yang mensimulasikan latensi antrean order dan slippage spread nyata.',
    content: `### Evolusi Tahapan Riset Kuantitatif
- **Vectorized Backtesting**:
  - Mengalikan kolom sinyal $S_t$ dengan pengembalian aset $R_{t+1}$ di DataFrame.
  - Kecepatan luar biasa: mampu menguji 100 kombinasi parameter dalam hitungan detik.
  - *Kelemahan*: Mengabaikan eksekusi parsial, antrean limit order di bursa, latensi jaringan, serta biaya slippage dinamis.
- **Event-Driven Backtesting**:
  - Mensimulasikan jalannya waktu bar demi bar (*Tick-by-Tick / Event-Loop*).
  - Mengirimkan objek kelas \`OrderEvent\`, \`FillEvent\`, dan memperbarui saldo margin secara realistis.
  - Memverifikasi apakah order limit Anda benar-benar akan tereksekusi pada harga tersebut jika volume di bid/ask tidak mencukupi.`,
    visual_type: 'entry_protocol',
    coordinates_x: 230,
    coordinates_y: 610,
    order_index: 6,
    checklists: [
      'Menggunakan vectorized backtester untuk skrining ide awal secara cepat',
      'Membangun engine event-driven sebelum mempertaruhkan modal riil',
      'Memasukkan variabel komisi broker dan slippage dinamis ke dalam simulasi'
    ],
    resources: [
      { title: 'Algorithmic Trading: Winning Strategies and Their Rationale', author: 'Ernie Chan', url: '#', type: 'Book' },
      { title: 'Successful Algorithmic Trading', author: 'Michael L. Halls-Moore', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-3-2',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-3-1',
    level: 3,
    title: 'Eliminasi Bias: Overfitting, Curve Fitting, & Lookahead Bias',
    slug: 'quant-overfitting-lookahead-bias',
    summary: 'Mengapa strategi yang tampak sempurna di backtest selalu gagal di akun riil, dan cara split train/validation/test yang ketat.',
    content: `### Dosa-Dosa Mematikan Backtesting Kuantitatif
Jika backtest Anda menunjukkan grafik kurva ekuitas naik mulus 45 derajat tanpa drawdown, 99.9% kemungkinan Anda telah melakukan kesalahan bias metodologis:
1. **Lookahead Bias (Peeking into Future)**: Algoritma menggunakan data harga yang baru tersedia di masa depan (misal: menggunakan nilai High candle hari ini untuk memutuskan transaksi beli di pembukaan Open hari ini).
2. **Survivorship Bias**: Hanya melakukan backtest pada saham-saham yang saat ini tergabung di indeks S&P500, melupakan ratusan perusahaan yang telah bangkrut dan terdepak dari indeks selama periode pengujian.
3. **Data Snooping & Overfitting (Curve Fitting)**: Mengotak-atik 15 parameter indikator hingga menghasilkan kurva terbaik di data masa lalu. Model ini hanya menghafal noise data historis dan akan langsung kolaps saat diterjunkan ke data masa depan yang belum pernah dilihat (*Out-of-Sample*).`,
    visual_type: 'supply_demand_zones',
    coordinates_x: 570,
    coordinates_y: 610,
    order_index: 7,
    checklists: [
      'Melakukan pembagian data ketat: 60% In-Sample (Train), 20% Validation, 20% Out-of-Sample (Test)',
      'Mengaudit seluruh baris kode untuk memastikan tidak ada pemanggilan nilai masa depan (.shift(-1))',
      'Menggunakan dataset point-in-time bebas survivorship bias'
    ],
    resources: [
      { title: 'Advances in Financial Machine Learning', author: 'Marcos López de Prado', url: '#', type: 'Book' },
      { title: 'Machine Learning for Asset Managers', author: 'Marcos López de Prado', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-3-3',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-3-1',
    level: 3,
    title: 'Optimasi Walk-Forward & Simulasi Resampling Monte Carlo',
    slug: 'quant-walk-forward-monte-carlo',
    summary: 'Menguji ketahanan parameter strategi pada data out-of-sample bergulir dan simulasi acak untuk worst-case drawdown.',
    content: `### Menguji Ketahanan Strategi Terhadap Ketidakpastian
- **Walk-Forward Analysis (WFA)**:
  - Alih-alih melakukan optimasi statis satu kali, WFA menggunakan jendela waktu bergulir (*Rolling Window*).
  - Contoh: Optimasi parameter pada tahun 2018-2020 (In-Sample), uji parameter tersebut pada 2021 (Out-of-Sample). Kemudian geser jendela: optimasi pada 2019-2021, uji pada 2022.
  - Menghitung rasio *Walk-Forward Efficiency (WFE)*: Jika performa OOS $> 60\\%$ dari performa IS, strategi dinyatakan robust.
- **Simulasi Monte Carlo Resampling**:
  - Mengacak urutan ribuan trade historis secara berulang (10,000 kali iterasi).
  - Menghasilkan kurva probabilitas distribusi: Berapa kemungkinan maksimal drawdown menembus -25%? Berapa probabilitas akun mengalami 9 kekalahan beruntun?`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 400,
    coordinates_y: 750,
    order_index: 8,
    checklists: [
      'Menjalankan Walk-Forward Analysis dengan minimal 5 jendela bergulir',
      'Menghasilkan 10,000 jalur simulasi Monte Carlo untuk mengukur batas Drawdown persentil 95%',
      'Menolak strategi jika Walk-Forward Efficiency berada di bawah 50%'
    ],
    resources: [
      { title: 'The Evaluation and Optimization of Trading Strategies', author: 'Robert Pardo', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-4-1',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-3-2',
    level: 4,
    title: 'Analisis Metrik Kinerja: Sharpe, Sortino, & Calmar Ratio',
    slug: 'quant-risk-metrics-sharpe-sortino',
    summary: 'Mengevaluasi imbal hasil disesuaikan risiko (Risk-Adjusted Return) dan mengisolasi volatilitas penurunan.',
    content: `### Metrik Institusional di Luar Angka Persentase Keuntungan
Bagi dana lindung nilai (*Hedge Fund*), return 50% tidak ada artinya jika dicapai dengan volatilitas liar dan drawdown -40%:
- **Sharpe Ratio**:
  $$S = \\frac{R_p - R_f}{\\sigma_p}$$
  - Mengukur kelebihan return di atas suku bunga bebas risiko ($R_f$) dibagi total volatilitas standar deviasi ($\\sigma_p$). Sharpe $> 1.0$ dianggap layak; Sharpe $> 2.0$ adalah kelas dunia.
- **Sortino Ratio**:
  - Mirip dengan Sharpe, namun hanya menghukum volatilitas negatif (*Downside Deviation*). Volatilitas lonjakan keuntungan ke atas tidak dihukum.
- **Calmar Ratio**:
  $$\\text{Calmar} = \\frac{\\text{Compound Annual Growth Rate (CAGR)}}{\\text{Maximum Drawdown (MDD)}}$$
  - Mengukur seberapa besar keuntungan tahunan dibandingkan rasa sakit penurunan modal terdalam. Calmar $> 2.0$ mencerminkan portofolio yang sangat tangguh.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 230,
    coordinates_y: 890,
    order_index: 9,
    checklists: [
      'Menghitung annualized Sharpe Ratio dari return harian strategi',
      'Mengisolasi downside risk menggunakan Sortino Ratio',
      'Membandingkan rasio CAGR terhadap Max Drawdown (Calmar Ratio)'
    ],
    resources: [
      { title: 'Modern Portfolio Theory and Investment Analysis', author: 'Edwin J. Elton et al.', url: '#', type: 'Academic' }
    ]
  },
  {
    id: 'quant-4-2',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-4-1',
    level: 4,
    title: 'Manajemen Risiko Ekor: Value at Risk (VaR) & CVaR',
    slug: 'quant-var-cvar-tail-risk',
    summary: 'Menghitung potensi kerugian ekstrem pada persentil 99% menggunakan metode Historical, Parametrik, dan Monte Carlo.',
    content: `### Mengantisipasi Peristiwa Angsa Hitam (Black Swan)
- **Value at Risk (VaR)**:
  - Jawaban atas pertanyaan: "Berapa kerugian maksimal yang saya hadapi dalam jangka waktu $T$ pada tingkat keyakinan $\\alpha$?"
  - Contoh: VaR Harian 99% sebesar $5,000 berarti dalam 99 dari 100 hari bursa, kerugian portofolio tidak akan melebihi $5,000. Namun pada 1 hari sisanya, kerugian bisa melampaui angka tersebut!
- **Conditional Value at Risk (CVaR / Expected Shortfall)**:
  - Standar emas regulasi perbankan Basel III/IV.
  - Menghitung rata-rata besaran kerugian *ketika batas VaR terlampaui* (area ekor distribusi tebal / *Fat Tails*).
  - CVaR jauh lebih superior dibanding VaR konvensional karena memperhitungkan tingkat keparahan krisis likuiditas ekstrem.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 570,
    coordinates_y: 890,
    order_index: 10,
    checklists: [
      'Menghitung Historical VaR 95% dan 99% dari portofolio aktif',
      'Menghitung Conditional VaR (Expected Shortfall) untuk memetakan fat-tail risk',
      'Menyiapkan cadangan likuiditas darurat berbasis kalkulasi CVaR'
    ],
    resources: [
      { title: 'Value at Risk: The New Benchmark for Managing Financial Risk', author: 'Philippe Jorion', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'quant-5-1',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-4-2',
    level: 5,
    title: 'Pengembangan Pine Script v5: State Machine & Webhooks',
    slug: 'quant-pinescript-v5-webhooks',
    summary: 'Mengembangkan indikator dan strategi otomatis di TradingView menggunakan arsitektur state machine yang bersih dan webhook JSON.',
    content: `### Otomatisasi Cloud Menggunakan Pine Script v5
TradingView Pine Script v5 menyediakan runtime cloud yang sangat efisien untuk memancarkan sinyal ke server eksekusi:
- **Arsitektur State Machine**:
  - Menghindari bug repaint (*Repainting Issue*): Selalu kunci evaluasi kondisi sinyal pada candle yang telah resmi tertutup (\`barstate.isconfirmed\`).
  \`\`\`pinescript
  //@version=5
  strategy("TLP Quant Breakout v5", overlay=true, calc_on_every_tick=false)

  // Sinyal hanya dievaluasi saat bar ditutup resmi
  if barstate.isconfirmed
      if buyCondition and strategy.position_size == 0
          strategy.entry("Long", strategy.long)
          alert('{"action": "BUY", "ticker": "' + syminfo.ticker + '", "sl": ' + str.tostring(slLevel) + '}', alert.freq_once_per_bar_close)
  \`\`\`
- **Webhook JSON Payloads**: Mengirimkan instruksi eksekusi instan melalui HTTP POST ke endpoint broker / middleware (Alpaca, Binance API, MetaTrader EA Bridge).`,
    visual_type: 'entry_protocol',
    coordinates_x: 310,
    coordinates_y: 1030,
    order_index: 11,
    checklists: [
      'Memastikan seluruh script menggunakan barstate.isconfirmed untuk mencegah repainting',
      'Memformat pesan alert menggunakan sintaks JSON terstruktur',
      'Menguji pengiriman webhook ke server lokal via ngrok sebelum live deploy'
    ],
    resources: [
      { title: 'TradingView Pine Script v5 User Manual & Reference', author: 'TradingView', url: 'https://www.tradingview.com/pine-script-docs/', type: 'Documentation' }
    ]
  },
  {
    id: 'quant-5-2',
    roadmap_id: 'rm-quant-algo',
    parent_node_id: 'quant-5-1',
    level: 5,
    title: 'Eksekusi Live API: WebSocket Streams & Mitigasi Slippage',
    slug: 'quant-execution-api-slippage-latency',
    summary: 'Menghubungkan algoritma ke gateway broker via REST & WebSocket API, penanganan reconnection failover, dan smart routing.',
    content: `### Dari Riset Menuju Produksi Nyata
Langkah terakhir dari trading kuantitatif adalah infrastruktur eksekusi:
- **REST API vs WebSocket**:
  - Gunakan REST API hanya untuk aksi idempotence seperti penempatan order awal atau query saldo akun.
  - Gunakan koneksi WebSocket persisten untuk mendengarkan stream data harga real-time dan update status eksekusi posisi (\`executionReports\`).
- **Penanganan Latensi & Reconnection Failover**:
  - Mengimplementasikan pola *Exponential Backoff* jika koneksi terputus tiba-tiba.
  - *Heartbeat Monitoring (Ping/Pong)* untuk mendeteksi socket mati secara dini.
- **Smart Order Routing & Slippage Mitigation**:
  - Memecah order besar menggunakan algoritma TWAP (Time-Weighted Average Price) atau Iceberg Orders agar tidak menggeser harga pasar (*Market Impact Minimization*).`,
    visual_type: 'entry_protocol',
    coordinates_x: 490,
    coordinates_y: 1030,
    order_index: 12,
    checklists: [
      'Membangun modul WebSocket client dengan auto-reconnection dan ping-pong heartbeat',
      'Menyimpan log audit setiap respons order ID, timestamp server, dan harga fill riil',
      'Menjalankan algoritma di lingkungan Paper Trading minimal 30 hari sebelum live modal riil'
    ],
    resources: [
      { title: 'Building Low Latency High-Frequency Trading Systems', author: 'Paul Bilokon', url: '#', type: 'Book' },
      { title: 'The Science of Algorithmic Trading and Portfolio Management', author: 'Robert Kissell', url: '#', type: 'Book' }
    ]
  }
];
