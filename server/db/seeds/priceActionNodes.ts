import { NodeSeedData } from '../seedData.ts';

export const priceActionNodes: NodeSeedData[] = [
  {
    id: 'node-1-1',
    roadmap_id: 'rm-price-action',
    parent_node_id: null,
    level: 1,
    title: 'Anatomi Candlestick & Wick Dynamics',
    slug: 'candlestick-anatomy-wick-dynamics',
    summary: 'Membedakan tekanan buyer/seller melalui body dan sumbu (wick), serta memahami mengapa harga penutupan (Close) adalah data paling objektif.',
    content: `### Mengapa Candlestick Menceritakan Cerita Pasar?
Banyak pemula hanya menghafal pola lilin seperti Doji, Hammer, atau Engulfing secara visual. Namun trader profesional membaca candlestick sebagai lelang harga (Auction Market Theory):
- **Body Candlestick**: Merepresentasikan dominasi arah dan komitmen volume pada rentang waktu tersebut.
- **Sumbu (Wick / Shadow)**: Menunjukkan penolakan harga (price rejection) atau area di mana likuiditas terserap agresif.
- **Titik Penutupan (Close)**: Fakta tunggal yang mengonfirmasi siapa pemenang lelang dalam satu sesi. Sumbu panjang ke atas dengan penutupan di bagian bawah mengonfirmasi kegagalan buyer mempertahankan harga tinggi.`,
    visual_type: 'candlestick_anatomy',
    coordinates_x: 400,
    coordinates_y: 80,
    order_index: 1,
    checklists: [
      'Saya mengerti perbedaan signifikansi antara Body vs Wick',
      'Saya tidak lagi masuk posisi sebelum candle resmi ditutup (Closed)',
      'Mampu mengidentifikasi absorption wick pada chart M15 dan H1'
    ],
    resources: [
      { title: 'Japanese Candlestick Charting Techniques', author: 'Steve Nison', url: 'https://www.goodreads.com/book/show/157973.Japanese_Candlestick_Charting_Techniques', type: 'Book' },
      { title: 'Reading Auction Dynamics through Wick Rejection', author: 'TLP Research', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'node-1-2',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-1-1',
    level: 1,
    title: 'Fraktalitas Multi-Timeframe (MTF)',
    slug: 'multi-timeframe-fractality',
    summary: 'Memahami bahwa chart bersifat fraktal: tren di M5 adalah pullback di H1, dan H1 adalah bagian dari satu candle Daily.',
    content: `### Prinsip Fraktalitas Pasar Finansial
Pasar keuangan bergerak dalam pola fraktal matematis. Tidak ada timeframe yang berdiri sendiri:
- **Higher Timeframe (HTF)**: Menentukan bias narasi, likuiditas makro, dan zona nilai utama (Daily / H4).
- **Middle Timeframe (MTF)**: Menentukan tren struktural saat ini (H1 / M15).
- **Lower Timeframe (LTF)**: Menjadi instrumen eksekusi presisi untuk memperkecil risiko Stop Loss (M5 / M1).

> Aturan Emas: Jangan pernah melawan struktur HTF hanya karena melihat pola pembalikan kecil di LTF tanpa ada konfirmasi sweep likuiditas.`,
    visual_type: 'multi_timeframe',
    coordinates_x: 400,
    coordinates_y: 200,
    order_index: 2,
    checklists: [
      'Mampu memetakan 3 tingkatan timeframe (Macro, Structure, Execution)',
      'Memahami hubungan koreksi timeframe kecil terhadap candle timeframe besar',
      'Tidak terjebak overtrading di M1 tanpa melihat konteks Daily'
    ],
    resources: [
      { title: 'The Fractal Geometry of Nature in Markets', author: 'Benoit Mandelbrot', url: '#', type: 'Academic' }
    ]
  },
  {
    id: 'node-2-1',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-1-2',
    level: 2,
    title: 'Valid Swing High & Swing Low',
    slug: 'valid-swing-high-low',
    summary: 'Menentukan titik swing struktural yang valid secara objektif tanpa terdistraksi fluktuasi minor.',
    content: `### Definisi Objektif Swing Point
Banyak trader bingung menentukan titik pucuk (high) dan lembah (low). Kriteria swing point objektif:
- **Valid Swing High**: Candlestick yang diapit minimal oleh candle kiri dan kanan dengan high yang lebih rendah, serta diiringi pullback candle yang jelas.
- **Valid Swing Low**: Candlestick dengan low terendah yang diapit oleh candle dengan low lebih tinggi.
- Hindari menganggap setiap candle acak sebagai struktur; fokus pada gelombang yang menciptakan momentum nyata.`,
    visual_type: 'swing_structure',
    coordinates_x: 400,
    coordinates_y: 330,
    order_index: 3,
    checklists: [
      'Bisa memfilter minor noise vs major swing point pada chart',
      'Menggunakan aturan pullback valid untuk menandai titik swing',
      'Menandai swing high dan low pada 20 sampel chart historis'
    ],
    resources: [
      { title: 'Mapping Pure Market Structure', author: 'TLP Academy', url: '#', type: 'Video' }
    ]
  },
  {
    id: 'node-2-2',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-2-1',
    level: 2,
    title: 'Break of Structure (BOS) vs CHoCH',
    slug: 'bos-vs-choch',
    summary: 'Mendeteksi kelanjutan tren (BOS) dan sinyal pergeseran karakter awal (Change of Character).',
    content: `### Mekanisme BOS dan CHoCH
- **BOS (Break of Structure)**: Penembusan valid pada swing point sebelumnya searah tren (misal membuat Higher High baru dalam tren naik). Menandakan kelanjutan momentum.
- **CHoCH (Change of Character)**: Penembusan pertama kali pada Higher Low terakhir dalam tren bullish, atau Lower High terakhir dalam tren bearish. Ini adalah sinyal peringatan awal bahwa suplai atau permintaan mulai mengambil alih kontrol.
- **Validitas Penembusan**: Wajib mengamati apakah penembusan terjadi dengan body candle yang menutup melewati level (konfirmasi valid) atau sekadar sumbu (indikasi fakeout / sweep).`,
    visual_type: 'bos_choch',
    coordinates_x: 230,
    coordinates_y: 470,
    order_index: 4,
    checklists: [
      'Membedakan kelanjutan tren (BOS) dengan pergeseran arah (CHoCH)',
      'Mampu memverifikasi apakah breakout ditutup dengan full candle body',
      'Mengerti bahwa CHoCH tidak selalu berarti pembalikan arah total, melainkan bisa berupa pullback HTF'
    ],
    resources: [
      { title: 'Mastering Market Transitions & Character Shifts', author: 'TLP Lab', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'node-2-3',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-2-1',
    level: 2,
    title: 'Strong vs Weak Highs & Lows',
    slug: 'strong-vs-weak-high-low',
    summary: 'Mengetahui level struktural mana yang dilindungi institusi (Protected) dan level mana yang menjadi target sasaran likuiditas.',
    content: `### Konsep Protected vs Targeted Level
- **Strong (Protected) High/Low**: Level yang berhasil memicu penembusan struktur (BOS). Karena level ini sukses mendorong harga membuat low/high baru, pasar cenderung melindunginya. Stop loss ditempatkan di luar level ini.
- **Weak (Targeted) High/Low**: Level yang gagal menembus struktur sebelumnya dan hanya memantul lemah. Level ini sangat rentan ditembus dan dijadikan sasaran target Take Profit.`,
    visual_type: 'strong_weak_levels',
    coordinates_x: 570,
    coordinates_y: 470,
    order_index: 5,
    checklists: [
      'Mengidentifikasi apakah swing low saat ini bertanggung jawab atas pembuatan BOS',
      'Menghindari menaruh stop loss di area Weak Low/High',
      'Menentukan target TP pada level Weak Highs dalam tren bullish'
    ],
    resources: [
      { title: 'Targeting Weak Extremes in Financial Markets', author: 'Mark Douglas Research', url: '#', type: 'Article' }
    ]
  },
  {
    id: 'node-3-1',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-2-2',
    level: 3,
    title: 'Supply & Demand (Fresh vs Mitigated)',
    slug: 'supply-demand-fresh-mitigated',
    summary: 'Menganalisis zona ketidakseimbangan order, membedakan zona perawan (Fresh) dengan zona yang sudah berkali-kali diuji (Mitigated).',
    content: `### Zona Keseimbangan & Ketidakseimbangan
- **Zona Fresh**: Area asal mula pergerakan impulsif agresif yang belum pernah tersentuh kembali oleh harga sejak terbentuk. Probabilitas reaksi tertinggi ada pada sentuhan pertama (*first touch*).
- **Zona Mitigated**: Area yang telah dikunjungi kembali oleh pullback harga. Setiap pengujian zona akan menghabiskan sisa resting order institusi, sehingga zona yang disentuh ke-3 atau ke-4 kali sangat rentan ditembus.`,
    visual_type: 'supply_demand_zones',
    coordinates_x: 230,
    coordinates_y: 610,
    order_index: 6,
    checklists: [
      'Bisa membedakan origin zone dengan continuation zone',
      'Menghitung berapa kali zona telah diuji sebelum entry',
      'Menghindari trading pada zona yang sudah ter-mitigasi penuh'
    ],
    resources: [
      { title: 'Order Flow and Supply Demand Dynamics', author: 'Sam Seiden Methodology', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'node-3-2',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-2-3',
    level: 3,
    title: 'Premium vs Discount (Equilibrium)',
    slug: 'premium-vs-discount-pricing',
    summary: 'Menerapkan matematika harga grosir: membeli di area Diskon (<50%) dan menjual di area Premium (>50%).',
    content: `### Konsep Lelang Grosir vs Eceran
Pasar keuangan hakikatnya adalah pasar lelang:
- **Equilibrium (50% Range)**: Nilai wajar saat ini dari rentang struktur aktif.
- **Premium Zone (> 50%)**: Area harga mahal. Institusi dan smart money mencari peluang Sell di zona ini.
- **Discount Zone (< 50%)**: Area harga murah. Institusi mencari posisi Buy di zona ini.
- Jangan pernah mengejar posisi Buy di ujung area Premium, dan jangan pernah panik Sell di dalam area Discount terdalam.`,
    visual_type: 'premium_discount',
    coordinates_x: 570,
    coordinates_y: 610,
    order_index: 7,
    checklists: [
      'Mampu menarik Fibonacci Retracement 0.5 untuk menentukan equilibrium',
      'Menerapkan aturan disiplin: Hanya Buy di Discount, Hanya Sell di Premium',
      'Mengombinasikan zona Discount dengan zona Fresh Demand'
    ],
    resources: [
      { title: 'The Economics of Auction Market Equilibrium', author: 'J. Peter Steidlmayer', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'node-4-1',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-3-1',
    level: 4,
    title: 'Liquidity Pools (BSL & SSL)',
    slug: 'bsl-ssl-liquidity-pools',
    summary: 'Memetakan kumpulan order likuiditas retail (Stop Loss) yang bertumpuk di atas double top dan di bawah double bottom.',
    content: `### Likuiditas Adalah Bahan Bakar Pergerakan
Pasar tidak bergerak karena indikator bersilangan, melainkan mencari likuiditas untuk memenuhi pesanan institusi berukuran besar:
- **Buy-Side Liquidity (BSL)**: Terletak di atas swing highs, double tops, dan resisten klasik. Berisi Stop Loss dari posisi short dan breakout buy orders.
- **Sell-Side Liquidity (SSL)**: Terletak di bawah swing lows, double bottoms, dan support klasik. Berisi Stop Loss dari posisi buy.`,
    visual_type: 'liquidity_pools',
    coordinates_x: 310,
    coordinates_y: 750,
    order_index: 8,
    checklists: [
      'Mampu menandai equal highs (EQH) dan equal lows (EQL) sebagai liquidity magnet',
      'Mengerti di mana letak kerumunan order stop loss retail trader',
      'Memperhitungkan arah likuiditas sebelum menetapkan arah bias'
    ],
    resources: [
      { title: 'Where Retail Stops Cluster in Liquid FX Markets', author: 'BIS Paper', url: '#', type: 'Whitepaper' }
    ]
  },
  {
    id: 'node-4-2',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-3-2',
    level: 4,
    title: 'Liquidity Sweep & Fakeout Mechanics',
    slug: 'liquidity-sweep-fakeout-mechanics',
    summary: 'Mengenali saat harga menusuk level kunci hanya untuk mengambil likuiditas kemudian langsung berbalik arah dengan momentum kuat.',
    content: `### Anatomi Liquidity Sweep
1. **Pancingan (Inducement)**: Pasar membentuk resisten yang tampak jelas dan rapi.
2. **Pembersihan (The Sweep)**: Candle cepat menusuk ke atas resisten tersebut, memicu stop loss para seller dan menarik breakout buyer retail.
3. **Pembalikan Agresif (Displacement)**: Begitu likuiditas terserap oleh institusi, harga langsung anjlok kembali ke bawah level resisten dengan candle bervolume besar. Inilah momen konfirmasi setup pembalikan terbaik.`,
    visual_type: 'liquidity_sweep',
    coordinates_x: 490,
    coordinates_y: 750,
    order_index: 9,
    checklists: [
      'Bisa membedakan Breakout Asli vs Liquidity Sweep via wick rejection & displacement',
      'Menunggu penutupan candle kembali ke dalam range sebelum mengambil tindakan',
      'Mengidentifikasi pergeseran struktur LTF tepat setelah sweep terjadi'
    ],
    resources: [
      { title: 'The Anatomy of False Breakouts and Stop Hunts', author: 'TLP Applied Series', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'node-5-1',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-4-1',
    level: 5,
    title: 'Protokol Konfirmasi Entry (LTF Shift)',
    slug: 'ltf-shift-entry-protocol',
    summary: 'Menghubungkan narasi HTF ke eksekusi LTF: menunggu CHoCH di timeframe eksekusi sebelum menekan tombol buy/sell.',
    content: `### Alur Eksekusi 3 Langkah
1. **Langkah 1**: Harga mencapai HTF Key Zone (Demand di Discount area atau Sweep BSL).
2. **Langkah 2**: Turun ke LTF (M15 atau M5) dan tunggu struktur LTF membentuk CHoCH yang mengonfirmasi bahwa momentum telah berbalik.
3. **Langkah 3**: Pasang Limit Order pada pullback pertama ke zona LTF baru dengan Stop Loss di bawah swing point yang baru terbentuk. Rasio R:R meningkat drastis dibandingkan entri tebak-tebakan.`,
    visual_type: 'entry_protocol',
    coordinates_x: 230,
    coordinates_y: 890,
    order_index: 10,
    checklists: [
      'Tidak pernah memasang blind order di zona tanpa konfirmasi perubahan struktur LTF',
      'Mendokumentasikan trigger entry spesifik dalam trade plan',
      'Menghitung ukuran lot sebelum membuka order'
    ],
    resources: [
      { title: 'Precision Execution Protocols for Active Traders', author: 'TLP Masterclass', url: '#', type: 'Course' }
    ]
  },
  {
    id: 'node-5-2',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-4-2',
    level: 5,
    title: 'Stop Loss Logis & Asimetris R:R',
    slug: 'logical-stop-loss-asymmetric-rr',
    summary: 'Menentukan titik invalidasi struktural objektif dan memastikan minimal rasio keuntungan 1:2 atau 1:3.',
    content: `### Stop Loss Bukan Beban, Melainkan Pintu Keluar Logis
- **Titik Invalidasi**: Stop loss ditempatkan di level di mana jika tersentuh, maka tesis analisa Anda terbukti salah 100%. Jangan pernah menggeser stop loss menjauh saat posisi merugi!
- **Asymmetric Risk/Reward**: Dengan rasio R:R 1:3, Anda hanya butuh win rate 30% untuk mencapai profitabilitas jangka panjang.
- Fokus trader profesional bukan pada seberapa sering benar (win rate), melainkan berapa yang diperoleh saat benar dibanding berapa yang dilepas saat salah.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 570,
    coordinates_y: 890,
    order_index: 11,
    checklists: [
      'Memastikan Stop Loss selalu berada di luar Protected Swing High/Low',
      'Menolak membuka posisi jika potensi R:R kurang dari 1:2',
      'Menerapkan risiko maksimal 1% dari total ekuitas per satu transaksi'
    ],
    resources: [
      { title: 'Trading in the Zone: Master the Market with Confidence', author: 'Mark Douglas', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'node-5-3',
    roadmap_id: 'rm-price-action',
    parent_node_id: 'node-5-1',
    level: 5,
    title: 'Jurnal & Review Pasca-Eksekusi',
    slug: 'journaling-post-trade-review',
    summary: 'Mekanisme loop feedback berkelanjutan: dokumentasi tangkapan layar sebelum dan sesudah entry untuk evaluasi objektif.',
    content: `### Disiplin Jurnal Adalah Perbedaan Antara Penjudi dan Profesional
Setiap trade yang dieksekusi harus mencatat:
1. Tangkapan layar chart sebelum entry (menunjukkan narasi HTF & konfirmasi LTF).
2. Alasan logis penempatan Stop Loss dan Target Take Profit.
3. Keadaan emosi saat eksekusi (apakah ada FOMO atau keraguan).
4. Hasil akhir dan evaluasi: Apakah aturan trading plan ditaati 100% terlepas dari menang atau kalah?`,
    visual_type: 'trade_journaling',
    coordinates_x: 400,
    coordinates_y: 1030,
    order_index: 12,
    checklists: [
      'Menyimpan screenshot setup sebelum dan sesudah eksekusi',
      'Mencatat metrik R:R aktual, slippage, dan komisi broker',
      'Melakukan review mingguan atas seluruh trade yang dieksekusi'
    ],
    resources: [
      { title: 'The Daily Trading Coach', author: 'Brett N. Steenbarger', url: '#', type: 'Book' }
    ]
  }
];
