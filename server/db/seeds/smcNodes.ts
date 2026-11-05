import { NodeSeedData } from '../seedData.ts';

export const smcNodes: NodeSeedData[] = [
  {
    id: 'smc-1-1',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: null,
    level: 1,
    title: 'Liquidity Pools & Inducement vs True Sweep',
    slug: 'smc-liquidity-inducement',
    summary: 'Membedakan pancingan likuiditas retail (Inducement / IDM) yang sengaja dibentuk algoritma vs sapuan likuiditas eksternal murni.',
    content: `### Mengapa Algoritma Membutuhkan Inducement?
Dalam arsitektur *Interbank Price Delivery Algorithm* (IPDA), pasar tidak bergerak secara acak. Institusi bank tier-1 tidak dapat memasukkan miliaran dolar pesanan tanpa pasangan lawan (*counter-party liquidity*).
- **Inducement (IDM)**: Swing point minor pertama di dalam rentang struktur yang sengaja dibentuk untuk memancing trader retail mengambil posisi terlalu dini (*early buyers/sellers*). Ketika swing IDM ini tertembus, order stop loss retail tersapu dan likuiditas tersebut diserap untuk memicu ekspansi menuju zona Order Block sejati.
- **True Sweep**: Sapuan penuh atas High/Low mayor eksternal (*Old Highs/Old Lows*) yang segera diiringi penolakan tajam (*displacement*) ke arah berlawanan.
- **Aturan Validasi Valid Low/High**: Dalam konsep SMC mekanis, sebuah Higher High hanya terkonfirmasi sah jika harga telah mengambil (sweep) titik Inducement (pullback terdalam terakhir).`,
    visual_type: 'liquidity_pools',
    coordinates_x: 400,
    coordinates_y: 80,
    order_index: 1,
    checklists: [
      'Mampu mengidentifikasi titik Inducement (IDM) pertama sebelum order block',
      'Tidak membuka posisi di pullback minor sebelum IDM disapu',
      'Memahami fungsi rekayasa likuiditas counter-party oleh algoritma IPDA'
    ],
    resources: [
      { title: 'Inner Circle Trader: Market Maker Primer Series', author: 'Michael J. Huddleston', url: 'https://www.youtube.com', type: 'Video' },
      { title: 'The Mechanics of Institutional Liquidity Traps', author: 'TLP Institutional Research', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'smc-1-2',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-1-1',
    level: 1,
    title: 'Fair Value Gap (FVG) & Balanced Price Range',
    slug: 'smc-fvg-bpr-dynamics',
    summary: 'Mengidentifikasi ketidakefisienan harga 3-candle, pemetaan Imbalance BISI / SIBI, serta pengujian Consequent Encroachment (50%).',
    content: `### Ketidakefisienan Harga (Market Inefficiency)
Fair Value Gap (FVG) terjadi ketika terjadi pergerakan satu arah yang sangat agresif sehingga lelang harga hanya memfasilitasi satu sisi pasar:
- **BISI (Buyside Imbalance Sellside Inefficiency)**: Terbentuk pada candle bullish bertenaga besar di mana High candle ke-1 tidak bertumpukan (*no overlap*) dengan Low candle ke-3. Celah kosong di tengahnya menunjukkan ketiadaan transaksi penjualan.
- **SIBI (Sellside Imbalance Buyside Inefficiency)**: Low candle ke-1 tidak bertumpukan dengan High candle ke-3 pada penurunan tajam.
- **Consequent Encroachment (CE)**: Titik tengah tepat 50% dari FVG. Algoritma IPDA secara matematis seringkali hanya perlu menyentuh CE untuk menyeimbangkan order flow sebelum melanjutkan tren.
- **Balanced Price Range (BPR)**: Area di mana FVG bullish ditutup dan ditembus kembali oleh FVG bearish secara berturut-turut, menciptakan zona magnet harga tingkat tinggi.`,
    visual_type: 'supply_demand_zones',
    coordinates_x: 400,
    coordinates_y: 200,
    order_index: 2,
    checklists: [
      'Mampu menandai formasi 3-candle FVG secara presisi (Candle 1 wick vs Candle 3 wick)',
      'Mengukur level Consequent Encroachment (50% FVG) dengan Fibonacci',
      'Membedakan FVG yang terbentuk dengan displacement vs candle berombak pelan'
    ],
    resources: [
      { title: 'ICT Fair Value Gap Model & Price Delivery', author: 'Inner Circle Trader', url: '#', type: 'Course' },
      { title: 'Auction Imbalances & Liquidity Void Mechanics', author: 'Financial Markets Lab', url: '#', type: 'Whitepaper' }
    ]
  },
  {
    id: 'smc-2-1',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-1-2',
    level: 2,
    title: 'Order Block (OB) & Mean Threshold Mechanics',
    slug: 'smc-order-blocks',
    summary: 'Memvalidasi candle institusional terakhir sebelum pergerakan impulsif (OB) dan aturan Mean Threshold (50% body).',
    content: `### Hakikat Order Block Institusional
Order Block (OB) bukanlah sekadar candle berlawanan warna biasa seperti yang dipahami komunitas retail, melainkan jejak penempatan posisi institusi dalam skala masif:
- **Bullish Order Block**: Candle turun terakhir sebelum pergerakan naik agresif (*displacement*) yang berhasil menyapu likuiditas (*sweep*) dan memecahkan struktur pasar (*BOS / MSS*).
- **Bearish Order Block**: Candle naik terakhir sebelum pergerakan anjlok yang merusak struktur lembah sebelumnya.
- **Mean Threshold (MT)**: Titik tengah 50% dari *body* Order Block (tidak termasuk sumbu). Jika candle berikutnya ditutup dengan *body* melewati Mean Threshold, Order Block dianggap batal (*invalidated*) atau terdistribusi.
- **High-Probability Filter**: OB wajib diiringi oleh FVG yang belum termitigasi tepat di depannya.`,
    visual_type: 'candlestick_anatomy',
    coordinates_x: 400,
    coordinates_y: 330,
    order_index: 3,
    checklists: [
      'Memastikan Order Block memicu pembersihan likuiditas (Sweep) sebelum bergerak',
      'Memverifikasi keberadaan FVG tepat setelah Order Block terbentuk',
      'Menetapkan titik invalidasi di luar Mean Threshold (50% candle body)'
    ],
    resources: [
      { title: 'Institutional Order Flow: The Definitive Guide to Order Blocks', author: 'TLP Applied Series', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'smc-2-2',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-2-1',
    level: 2,
    title: 'Breaker Block vs Mitigation Block',
    slug: 'smc-breaker-mitigation-blocks',
    summary: 'Memanfaatkan order block gagal yang berubah fungsi menjadi support/resistance institusional setelah liquidity sweep terjadi.',
    content: `### Mengapa Breaker Block Begitu Efektif?
- **Breaker Block (BB)**: Order block yang gagal menahan harga setelah sebelumnya berhasil memicu pembersihan likuiditas (*sweep*). 
  - *Bullish Breaker*: Swing High terakhir sebelum harga menyapu Lower Low, yang kemudian ditembus ke atas dengan displacement kuat. Ketika harga kembali melakukan pullback, level tersebut berfungsi sebagai support institusional.
- **Mitigation Block (MB)**: Mirip dengan breaker block, namun terjadi ketika harga GAGAL menyapu swing extreme sebelumnya (*failure swing*).
- **Psikologi Institusi**: Pada Breaker Block, institusi yang sebelumnya menempatkan order mitigasi terpaksa terjebak merugi. Saat harga kembali ke level breaker, mereka menutup posisi impas (*breakeven*) dan menambah pesanan searah tren baru.`,
    visual_type: 'bos_choch',
    coordinates_x: 230,
    coordinates_y: 470,
    order_index: 4,
    checklists: [
      'Bisa membedakan Breaker Block (ada liquidity sweep) vs Mitigation Block (tanpa sweep)',
      'Menandai candle body dari swing point yang menjadi breaker',
      'Menunggu konfirmasi pantulan pertama (first touch) pada Breaker Block'
    ],
    resources: [
      { title: 'The Breaker Block Playbook', author: 'ICT Core Content', url: '#', type: 'Course' }
    ]
  },
  {
    id: 'smc-2-3',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-2-1',
    level: 2,
    title: 'Volume Imbalance & Liquidity Voids',
    slug: 'smc-volume-imbalance-voids',
    summary: 'Memetakan celah tanpa transaksi antara ekor candle dan gap pembukaan harga yang wajib dikunjungi kembali algoritma IPDA.',
    content: `### Anomali Celah Transaksi Mikro
Selain FVG, terdapat dua bentuk ketidakseimbangan lelang yang sangat dicari oleh algoritma:
- **Volume Imbalance (VI)**: Terjadi ketika body candle satu tidak bertumpukan dengan body candle berikutnya, namun sumbu (wick) keduanya saling bertumpukan. Ini mencerminkan ketiadaan volume body pada level harga tersebut.
- **Liquidity Void**: Celah lompatan harga yang sangat besar akibat rilis berita berdampak tinggi (*High-Impact News*) seperti NFP, CPI, atau suku bunga FOMC.
- **Sifat Magnet Algoritma**: Algoritma delivery harga dirancang untuk menutup setiap celah volume imbalance hingga terisi sempurna (*rebalanced*) sebelum melanjutkan ekspansi tren jangka panjang.`,
    visual_type: 'supply_demand_zones',
    coordinates_x: 570,
    coordinates_y: 470,
    order_index: 5,
    checklists: [
      'Mengenali perbedaan antara FVG normal vs Volume Imbalance (wick overlap but body gap)',
      'Menandai Liquidity Void pasca rilis berita makroekonomi',
      'Menghindari entry melawan arah magnet pengisian void'
    ],
    resources: [
      { title: 'Algorithmic Price Delivery & Gap Dynamics', author: 'TLP Quantitative Lab', url: '#', type: 'Whitepaper' }
    ]
  },
  {
    id: 'smc-3-1',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-2-2',
    level: 3,
    title: 'Asian Range Accumulation & London Judas Swing',
    slug: 'smc-asian-range-judas-swing',
    summary: 'Mengukur rentang konsolidasi sesi Asia dan mengantisipasi pergerakan manipulasi palsu (Judas Swing) saat pembukaan London.',
    content: `### Siklus Jam Perdagangan Antarabank
Pasar finansial global diatur oleh rotasi modal 24 jam dengan karakteristik sesi yang sangat spesifik:
- **Asian Range (20:00 - 00:00 EST / 07:00 - 11:00 WIB)**: Sesi konsolidasi berrentang sempit di mana volume likuiditas ditumpuk di atas Asian High dan di bawah Asian Low.
- **Frankfurt Pre-Market (01:00 - 02:00 EST)**: Pemanasan order flow Eropa.
- **The Judas Swing (02:00 - 03:30 EST)**: Gerakan manipulasi klasik ICT di pembukaan London. Harga sengaja didorong kencang menembus Asian High/Low untuk memicu breakout trader dan mengambil stop loss, sebelum langsung berbalik arah 180 derajat menciptakan tren harian sejati (*True Daily Trend*).`,
    visual_type: 'multi_timeframe',
    coordinates_x: 230,
    coordinates_y: 610,
    order_index: 6,
    checklists: [
      'Menandai high dan low rentang Asian Range setiap pagi',
      'Mengamati terjadinya Judas Swing di sesi pembukaan London Open',
      'Menunggu konfirmasi Market Structure Shift (MSS) setelah sweep Asian Range'
    ],
    resources: [
      { title: 'London Open Judas Swing Strategy', author: 'ICT Mentorship 2022', url: '#', type: 'Video' }
    ]
  },
  {
    id: 'smc-3-2',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-2-3',
    level: 3,
    title: 'London & New York Killzones Timing Protocol',
    slug: 'smc-killzones-session-timing',
    summary: 'Menentukan jendela waktu presisi lelang antarabank di mana ekspansi harga dan likuiditas tertinggi terjadi.',
    content: `### Time & Price: Waktu Lebih Penting Daripada Pola
Dalam metodologi ICT, pola tanpa waktu yang tepat adalah jebakan. Tiga Killzone utama:
- **London Killzone (02:00 - 05:00 EST)**: Seringkali menciptakan High atau Low of the Day (HOD / LOD) untuk instrumen berbasis GBP dan EUR.
- **New York Killzone (07:00 - 10:00 EST)**: Sesi paling bervolume di dunia karena bertemunya pembukaan pasar saham AS, obligasi US Treasury, dan rilis data makro ekonomi (CPI, PPI, Non-Farm Payrolls).
- **London Close Killzone (10:00 - 12:00 EST)**: Penutupan pasar London yang sering memicu retracement balik atau profit taking dari pergerakan sesi New York.`,
    visual_type: 'entry_protocol',
    coordinates_x: 570,
    coordinates_y: 610,
    order_index: 7,
    checklists: [
      'Mengonversi jam trading personal ke Eastern Standard Time (EST/EDT)',
      'Hanya membuka order di dalam batas Killzone aktif',
      'Mencatat instrumen yang memiliki volatilitas terbaik di sesi London vs NY'
    ],
    resources: [
      { title: 'The Interbank Trading Hours & Killzones Manual', author: 'TLP Applied Series', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'smc-3-3',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-3-1',
    level: 3,
    title: 'Power of 3 (AMD: Accumulation, Manipulation, Distribution)',
    slug: 'smc-amd-daily-bias',
    summary: 'Memahami siklus pembentukan candle harian: Akumulasi di Open, Manipulasi ke arah berlawanan, dan Distribusi ekspansi.',
    content: `### Siklus Universal Anatomi Candle OHLC
Konsep Power of Three (AMD) menjelaskan bagaimana sebuah candlestick timeframe harian (Daily Bar) terbentuk dari lelang lelang institusi:
1. **Accumulation (Open)**: Smart money mengumpulkan posisi awal di sekitar harga pembukaan sesi (*Open Price*).
2. **Manipulation (High or Low)**: Harga didorong berlawanan dengan arah tren sesungguhnya untuk mengelabui trader retail dan menyapu likuiditas. Inilah yang menciptakan sumbu (*wick*) pada candle harian.
3. **Distribution (Close)**: Gelombang ekspansi nyata ke arah tujuan sesungguhnya, menciptakan body candle besar sebelum lelang ditutup menjelang akhir sesi New York.
- *Bullish Day Template*: Open -> Drop ke bawah Open (Manipulasi membuat Low of Day) -> Rally ekspansi ke atas -> Close di dekat pucuk.`,
    visual_type: 'candlestick_anatomy',
    coordinates_x: 400,
    coordinates_y: 610,
    order_index: 8,
    checklists: [
      'Menganalisis posisi harga saat ini terhadap Midnight Open (00:00 EST)',
      'Hanya mencari posisi Buy ketika harga berada di bawah harga Open pada hari bullish',
      'Mengidentifikasi fase manipulasi vs ekspansi pada chart H1 dan M15'
    ],
    resources: [
      { title: 'Understanding ICT Power of 3 (AMD)', author: 'Inner Circle Trader', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'smc-4-1',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-3-2',
    level: 4,
    title: 'SMT Divergence (Smart Money Tool) Correlation',
    slug: 'smc-smt-divergence',
    summary: 'Mendeteksi ketidaksesuaian swing antara aset berkorelasi (EURUSD vs GBPUSD, DXY vs ES) untuk membaca konfirmasi smart money.',
    content: `### Rahasia Mengintip Komitmen Institusi
SMT (Smart Money Tool) Divergence adalah sinyal paling objektif dalam metodologi ICT untuk mengonfirmasi bahwa akumulasi institusi sedang terjadi di balik layar:
- **Korelasi Positif (EUR/USD vs GBP/USD)**:
  - Jika EUR/USD membuat *Higher High*, namun GBP/USD gagal membuat Higher High dan membentuk *Lower High*, maka terjadi SMT Divergence Bearish! Ini mengindikasikan bahwa pembeli GBP lemah dan institutional selling sedang berlangsung.
- **Korelasi Terbalik (DXY vs EUR/USD / S&P500)**:
  - Jika Dollar Index (DXY) membuat *Lower Low*, namun EUR/USD gagal membuat *Higher High*, pasar mengonfirmasi bahwa pergerakan dolar adalah manipulasi dan pembalikan tren segera tiba.`,
    visual_type: 'swing_structure',
    coordinates_x: 310,
    coordinates_y: 750,
    order_index: 9,
    checklists: [
      'Membuka dua chart aset berkorelasi secara berdampingan (side-by-side)',
      'Menandai kegagalan swing point simetris pada saat rilis data atau Killzone',
      'Menggunakan SMT Divergence sebagai filter konfirmasi akhir sebelum entry'
    ],
    resources: [
      { title: 'Intermarket Divergence Analysis with SMT', author: 'John J. Murphy & ICT Framework', url: '#', type: 'Academic' }
    ]
  },
  {
    id: 'smc-4-2',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-3-3',
    level: 4,
    title: 'Dealing Ranges & Premium/Discount PD Array Matrix',
    slug: 'smc-pd-arrays-dealing-range',
    summary: 'Menyusun hierarki matriks PD Array (Mitigation, Breaker, OB, FVG, Rejection Block) di dalam dealing range aktif 0% - 100%.',
    content: `### Matriks PD Array ICT
Dalam rentang lelang aktif (*Dealing Range*), terdapat urutan hierarki tingkat nilai harga (*Price Delivery Arrays*) dari diskon terdalam ke premium tertinggi:
1. **Old Highs / Lows** (Likuiditas eksternal)
2. **Rejection Block** (Sumbu panjang di pucuk swing)
3. **Order Block** (Candle asal usul pergerakan momentum)
4. **Fair Value Gap (FVG)** (Ketidakefisienan lelang 3 candle)
5. **Liquidity Void / Volume Imbalance**
6. **Breaker Block** (OB gagal yang tersapu)
7. **Mitigation Block**
- Aturan Mutlak: Jika Anda mencari Buy, hanya pilih PD Array yang berada di bawah level 50% Equilibrium (Discount). Jika Sell, hanya di atas 50% Equilibrium (Premium).`,
    visual_type: 'premium_discount',
    coordinates_x: 490,
    coordinates_y: 750,
    order_index: 10,
    checklists: [
      'Menarik rentang Fibonacci 0% - 100% pada dealing range HTF aktif',
      'Menyusun daftar PD Array yang berada di area Discount',
      'Menolak mengambil posisi jika target Risk/Reward tidak menjangkau PD Array lawan'
    ],
    resources: [
      { title: 'ICT PD Array Matrix Hierarchy', author: 'ICT Core Curriculum', url: '#', type: 'Course' }
    ]
  },
  {
    id: 'smc-5-1',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-4-1',
    level: 5,
    title: 'ICT Silver Bullet 60-Minute Execution Model',
    slug: 'smc-silver-bullet-execution',
    summary: 'Menjalankan protokol eksekusi setup 1-jam (10:00-11:00 AM NY) berbasis MSS + FVG dengan target 10-15 ticks/pips.',
    content: `### Model Eksekusi Paling Populer & Sistematis
ICT Silver Bullet adalah model trading berbasis waktu 60 menit yang terjadi setiap hari perdagangan:
- **Jendela Waktu Keramat**: 
  - London Silver Bullet: 03:00 - 04:00 AM EST
  - New York AM Silver Bullet: 10:00 - 11:00 AM EST
  - New York PM Silver Bullet: 02:00 - 03:00 PM EST
- **SOP 4 Langkah Eksekusi**:
  1. Tunggu likuiditas sesi sebelumnya disapu (*Liquidity Sweep*).
  2. Amati terjadinya *Market Structure Shift* (MSS) dengan candle displacement agresif pada chart M1 atau M5.
  3. Identifikasi FVG pertama yang tercipta dari pergerakan MSS tersebut.
  4. Pasang limit order pada FVG dengan stop loss di atas/bawah swing origin MSS. Target objektif: 10 - 15 pips / points (atau 2R - 3R).`,
    visual_type: 'entry_protocol',
    coordinates_x: 310,
    coordinates_y: 890,
    order_index: 11,
    checklists: [
      'Menyetel alarm tepat pukul 09:55 AM EST menjelang Silver Bullet NY',
      'Memverifikasi keberadaan sweep likuiditas sebelum MSS terbentuk',
      'Membatasi target realistis 10-15 pips tanpa keserakahan (greed)'
    ],
    resources: [
      { title: 'The 2023 ICT Mentorship Silver Bullet Strategy', author: 'Inner Circle Trader', url: '#', type: 'Video' }
    ]
  },
  {
    id: 'smc-5-2',
    roadmap_id: 'rm-smc-ict',
    parent_node_id: 'smc-4-2',
    level: 5,
    title: 'Institutional Invalidation & Scale-Out Management',
    slug: 'smc-institutional-scaling-invalidation',
    summary: 'Eksekusi partial profit taking pada level likuiditas lawan dan pengamanan posisi tanpa merusak ruang napas order block.',
    content: `### Mengamankan Keuntungan Tanpa Terlempar Dini
Banyak trader pemula terlalu cepat menggeser Stop Loss ke Breakeven (BE) sehingga sering tersengat *re-mitigation wick* sebelum harga melesat ke target:
- **Aturan Breakeven Institusional**: Hanya pindahkan stop loss ke BE setelah harga berhasil membuat BOS baru di timeframe eksekusi yang meninggalkan Order Block baru.
- **Protokol Scale-Out (Partial Taking)**:
  - TP 1 (50% posisi ditutup): Pada level liquidity pool pertama (Internal Liquidity / EQH / EQL).
  - TP 2 (30% posisi ditutup): Pada HTF Key Level / External Liquidity.
  - Sisa 20% Runner: Dibiarkan berjalan dengan trailing stop di bawah Order Block struktur baru.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 490,
    coordinates_y: 890,
    order_index: 12,
    checklists: [
      'Menerapkan aturan partial profit taking 50% di likuiditas pertama',
      'Tidak menggeser SL ke breakeven sebelum terjadi konfirmasi BOS lanjutan',
      'Mendokumentasikan eksekusi exit pada jurnal trading'
    ],
    resources: [
      { title: 'Professional Trade Management & Scale-Out Architecture', author: 'TLP Capital Advisory', url: '#', type: 'Guide' }
    ]
  }
];
