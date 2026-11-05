import { NodeSeedData } from '../seedData.ts';

export const wyckoffNodes: NodeSeedData[] = [
  {
    id: 'wyk-1-1',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: null,
    level: 1,
    title: 'Tiga Hukum Fundamental Wyckoff',
    slug: 'wyckoff-three-fundamental-laws',
    summary: 'Membedah Hukum Penawaran & Permintaan, Hukum Sebab & Akibat, dan Hukum Usaha vs Hasil (Effort vs Result).',
    content: `### Fondasi Abadi Analisis Finansial Klasik
Richard D. Wyckoff merumuskan tiga hukum universal yang mengatur pergerakan harga di semua pasar finansial dunia:
1. **Hukum Penawaran & Permintaan (Supply and Demand)**:
   - Jika Demand > Supply: Harga naik.
   - Jika Supply > Demand: Harga turun.
   - Jika Supply = Demand: Harga berkonsolidasi dalam rentang horizontal (*Trading Range*).
2. **Hukum Sebab & Akibat (Cause and Effect)**:
   - Tidak ada pergerakan besar yang terjadi tanpa persiapan matang. "Sebab" dibangun melalui akumulasi atau distribusi di dalam rentang waktu tertentu, sedangkan "Akibat" adalah tren terarah (*Markup / Markdown*) yang sebanding dengan besarnya durasi trading range.
3. **Hukum Usaha vs Hasil (Effort vs Result)**:
   - Usaha diukur melalui besaran Volume transaksi; Hasil diukur melalui rentang penyebaran harga (*Spread / Progress*). Jika volume sangat tinggi (usaha masif) namun candle memiliki spread sempit dan gagal menembus level harga (hasil nihil), ini menandakan ketidaksesuaian (*divergence*) dan adanya pihak besar yang menyerap order.`,
    visual_type: 'candlestick_anatomy',
    coordinates_x: 400,
    coordinates_y: 80,
    order_index: 1,
    checklists: [
      'Mampu menjelaskan ketiga hukum Wyckoff tanpa melihat catatan',
      'Mendeteksi anomali Usaha vs Hasil pada candlestick harian',
      'Memahami hubungan waktu akumulasi dengan target markup harga'
    ],
    resources: [
      { title: 'The Richard D. Wyckoff Method of Trading and Investing in Stocks', author: 'Richard D. Wyckoff', url: '#', type: 'Book' },
      { title: 'Studies in Tape Reading', author: 'Rollo Tape (Richard Wyckoff)', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'wyk-1-2',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-1-1',
    level: 1,
    title: 'Volume Spread Analysis: Ultra-High Volume & Spread Anatomy',
    slug: 'wyckoff-vsa-candle-spread-volume',
    summary: 'Membaca interaksi rentang harga (spread) dengan volume transaksi: absorption, buying/selling climax, dan stopping volume.',
    content: `### Membaca Aktivitas Smart Money Lewat VSA
Volume Spread Analysis (VSA), yang dipopulerkan oleh Tom Williams, menyempurnakan pendekatan Wyckoff dengan menghubungkan:
- **Spread (Rentang Harga)**: Jarak antara High dan Low suatu bar.
- **Close Position**: Posisi penutupan bar (di atas, di tengah, atau di bawah).
- **Volume Relatif**: Dibandingkan dengan rata-rata 20-50 bar sebelumnya.
- **Kondisi Kunci VSA**:
  - *Stopping Volume*: Volume ultra-tinggi pada candle bearish dengan spread lebar di akhir tren turun, tetapi bar berikutnya langsung ditutup positif. Ini menandakan institusi telah menyerap seluruh kepanikan penjualan retail.
  - *No Demand Bar*: Bar bullish berrentang sempit dengan volume lebih rendah dari dua bar sebelumnya di area resisten; menandakan ketiadaan minat buyer profesional untuk mendorong harga lebih tinggi.`,
    visual_type: 'candlestick_anatomy',
    coordinates_x: 400,
    coordinates_y: 200,
    order_index: 2,
    checklists: [
      'Mampu mengukur volume bar terhadap moving average volume 20-period',
      'Mengidentifikasi stopping volume pada support penting',
      'Mengenali tanda-tanda no demand bar saat pullback korektif'
    ],
    resources: [
      { title: 'Master the Markets', author: 'Tom Williams', url: '#', type: 'Book' },
      { title: 'Volume Spread Analysis Applied to Modern Markets', author: 'TLP Classical Lab', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'wyk-2-1',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-1-2',
    level: 2,
    title: 'Fase Akumulasi A & B: Stopping Volume, SC, & AR',
    slug: 'wyckoff-accumulation-phase-a-b',
    summary: 'Tahap penghentian tren turun: Preliminary Support (PS), Selling Climax (SC), Automatic Rally (AR), dan Secondary Test (ST).',
    content: `### Anatomi Penghentian Tren Turun (Fase A & B)
Sebelum institusi mengakumulasi saham atau koin dalam jumlah besar, mereka harus terlebih dahulu menghentikan tren turun yang ada:
- **Phase A (Menghentikan Tren)**:
  - **Preliminary Support (PS)**: Pembelian institusional pertama kali yang mulai memperlambat penurunan tajam.
  - **Selling Climax (SC)**: Gelombang kepanikan publik yang dipaksa melikuidasi posisi margin call pada volume sangat tinggi. Smart Money menyerap seluruh likuiditas ini.
  - **Automatic Rally (AR)**: Pantulan teknis otomatis akibat habisnya tekanan jual. Titik tertinggi AR mendefinisikan batas atas (*Resistance*) dari Trading Range (TR).
  - **Secondary Test (ST)**: Harga kembali menguji area Selling Climax dengan volume yang jauh lebih kecil, membuktikan bahwa pasokan telah berkurang.
- **Phase B (Membangun 'Sebab')**:
  - Periode konsolidasi panjang di mana Smart Money menyerap sisa-sisa pasokan pada harga murah.`,
    visual_type: 'swing_structure',
    coordinates_x: 230,
    coordinates_y: 330,
    order_index: 3,
    checklists: [
      'Menandai batas atas TR dari titik puncak Automatic Rally (AR)',
      'Menandai batas bawah TR dari titik terendah Selling Climax (SC)',
      'Memverifikasi bahwa Secondary Test memiliki volume lebih rendah dari Selling Climax'
    ],
    resources: [
      { title: 'Wyckoff Accumulation & Distribution Schematics', author: 'Wyckoff Stock Market Institute', url: '#', type: 'Course' }
    ]
  },
  {
    id: 'wyk-2-2',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-2-1',
    level: 2,
    title: 'Fase C: The Spring & Terminal Shakeout Test',
    slug: 'wyckoff-spring-shakeout-phase-c',
    summary: 'Pengujian puncak pasokan terakhir: penetrasi semu ke bawah support trading range dengan volume rendah sebelum markup dimulai.',
    content: `### Ujian Terakhir: The Spring (Springboard)
Fase C adalah fase penentu di mana Smart Money menguji apakah masih ada sisa penjual di pasar:
- **The Spring**: Harga sengaja didorong menembus ke bawah batas support Trading Range. Gerakan ini memiliki dua tujuan:
  1. Memicu seluruh stop loss posisi buyer yang bertumpuk di bawah support.
  2. Menguji apakah aksi jebakan ini memancing penjual baru.
- **Tiga Tipe Spring**:
  - *Tipe 1 (Terminal Shakeout)*: Penembusan besar dengan volume tinggi; membutuhkan proses konsolidasi ulang yang lama.
  - *Tipe 2*: Penetrasi moderat dengan volume sedang yang berhasil ditutup kembali ke dalam Trading Range.
  - *Tipe 3 (High-Probability Spring)*: Penetrasi tipis dengan volume sangat rendah (*No Supply*). Menandakan pasar sudah kehabisan penjual dan siap terbang (*Markup*).`,
    visual_type: 'liquidity_sweep',
    coordinates_x: 570,
    coordinates_y: 330,
    order_index: 4,
    checklists: [
      'Bisa membedakan Spring Tipe 3 (volume rendah) dengan breakdown tren asli',
      'Menunggu candle penutupan kembali masuk ke dalam area Trading Range',
      'Mengidentifikasi secondary test pada level Spring sebelum entry agresif'
    ],
    resources: [
      { title: 'The Wyckoff Spring: Mechanics of the Final Shakeout', author: 'David H. Weis', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'wyk-2-3',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-2-2',
    level: 2,
    title: 'Fase D & E: Sign of Strength (SOS) & LPS Markup',
    slug: 'wyckoff-sos-lps-phase-d-e',
    summary: 'Konfirmasi dominasi permintaan melalui Sign of Strength (SOS), pullback Last Point of Support (LPS), dan ekspansi keluar TR.',
    content: `### Konfirmasi Perjalanan Menuju Markup
Setelah Fase C berhasil mengonfirmasi ketiadaan pasokan, pasar beralih ke Fase D dan E:
- **Sign of Strength (SOS)**: Gelombang rally dengan spread lilin yang lebar dan volume yang meningkat tajam menembus resistance Trading Range.
- **Last Point of Support (LPS)**: Pullback korektif yang dangkal menuju mantan resisten atau area nilai Trading Range dengan volume yang menyusut drastis. Inilah titik entry paling aman (*low-risk entry point*) dalam metodologi Wyckoff.
- **Phase E**: Harga meninggalkan Trading Range secara permanen dan bergerak dalam tren bullish penuh (*Markup*).`,
    visual_type: 'bos_choch',
    coordinates_x: 400,
    coordinates_y: 470,
    order_index: 5,
    checklists: [
      'Memverifikasi bahwa SOS didukung oleh ekspansi volume nyata',
      'Menempatkan limit buy pada Last Point of Support (LPS)',
      'Memposisikan Stop Loss di bawah titik ayunan LPS atau level Spring'
    ],
    resources: [
      { title: 'Trading with the Wyckoff Schematic in Phase D and E', author: 'Hank Pruden', url: '#', type: 'Academic' }
    ]
  },
  {
    id: 'wyk-3-1',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-2-3',
    level: 3,
    title: 'Fase Distribusi A & B: Buying Climax (BC) & UT',
    slug: 'wyckoff-distribution-phase-a-b',
    summary: 'Pelepasan kepemilikan oleh Smart Money ke retail: Preliminary Supply (PSY), Buying Climax (BC), dan Upthrust (UT).',
    content: `### Bagaimana Smart Money Menjual Tanpa Menjatuhkan Harga?
Distribusi adalah cermin kebalikan dari akumulasi. Institusi besar tidak bisa menjual jutaan lot sekaligus tanpa membuat harga anjlok drastis. Mereka membutuhkan euforia publik:
- **Preliminary Supply (PSY)**: Penjualan institusional awal yang menahan laju tren naik.
- **Buying Climax (BC)**: Puncak kegilaan berita positif dan retail FOMO. Institusi melepas posisi mereka dalam jumlah kolosal kepada pembeli publik pada volume raksasa.
- **Automatic Reaction (AR)**: Penurunan tajam akibat volume pembelian terserap penuh. Low AR menjadi batas bawah (*Support*) Trading Range Distribusi.
- **Upthrust (UT)**: Dorongan harga sementara ke atas resisten BC yang segera gagal dan ditutup kembali ke dalam rentang lelang.`,
    visual_type: 'strong_weak_levels',
    coordinates_x: 230,
    coordinates_y: 610,
    order_index: 6,
    checklists: [
      'Mengidentifikasi lonjakan volume ekstrem di puncak harga (Buying Climax)',
      'Menandai level Automatic Reaction sebagai support distribusi',
      'Menghindari membeli saat media berita mengumumkan target harga fantastis'
    ],
    resources: [
      { title: 'Distribution Schematics and Climax Recognition', author: 'Wyckoff Analytics', url: '#', type: 'Course' }
    ]
  },
  {
    id: 'wyk-3-2',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-3-1',
    level: 3,
    title: 'Fase C & E: Upthrust After Distribution (UTAD) & Markdown',
    slug: 'wyckoff-utad-lpsy-phase-c-e',
    summary: 'Pancingan breakout tertinggi palsu (UTAD) di atas resisten TR, diikuti Major Sign of Weakness (SOW) dan fase penurunan harga.',
    content: `### Jebakan Terakhir Sebelum Kehancuran (UTAD)
- **Upthrust After Distribution (UTAD)**: Rekan tandingan dari Spring. Harga menembus rekor tertinggi baru di atas Trading Range untuk menjerat para breakout trader dan menyapu stop loss para short seller. Begitu order terisi, harga langsung tergelincir kembali ke dalam rentang lelang.
- **Major Sign of Weakness (MSOW)**: Penurunan agresif yang menembus garis support AR dengan spread merah yang masif.
- **Last Point of Supply (LPSY)**: Pantulan korektif yang lemah dengan volume tipis menuju mantan support. Ini adalah setup sell dengan rasio R:R terbaik.
- **Phase E**: Penurunan harga bebas tanpa dasar (*Markdown*).`,
    visual_type: 'liquidity_sweep',
    coordinates_x: 570,
    coordinates_y: 610,
    order_index: 7,
    checklists: [
      'Mengenali ciri-ciri UTAD: Penembusan pucuk baru yang cepat berbalik arah dengan volume abnormal',
      'Menunggu konfirmasi Last Point of Supply (LPSY) untuk entri sell',
      'Menetapkan target Take Profit di dasar Trading Range atau target proyeksi P&F'
    ],
    resources: [
      { title: 'The Anatomy of Upthrusts & Market Crashes', author: 'TLP Applied Series', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'wyk-4-1',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-3-2',
    level: 4,
    title: 'Proyeksi Horisontal P&F: Mengukur Target Sebab-Akibat',
    slug: 'wyckoff-cause-projection-horizontal-count',
    summary: 'Menggunakan Point & Figure box count secara horisontal sepanjang Trading Range untuk memproyeksikan target harga matematis.',
    content: `### Menghitung Ukuran 'Akibat' dari 'Sebab'
Salah satu keunggulan terbesar metode Wyckoff adalah kemampuan memproyeksikan secara matematis seberapa jauh harga akan bergerak setelah keluar dari konsolidasi:
- **Point & Figure (P&F) Chart**: Grafik yang hanya mencatat pergerakan harga tanpa memperhitungkan variabel waktu (hanya X dan O).
- **Horizontal Count**: Menghitung jumlah kolom horizontal di dalam Trading Range Akumulasi atau Distribusi.
  - Setiap kolom mewakili unit energi yang terakumulasi.
  - Formula Proyeksi: Target Harga = Level Breakout + (Jumlah Kolom × Ukuran Kotak × Nilai Reversal).
- Dengan proyeksi ini, trader tidak lagi menebak di mana harus Take Profit, melainkan memiliki target objektif berbasis data lelang.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 310,
    coordinates_y: 750,
    order_index: 8,
    checklists: [
      'Memahami cara pembuatan grafik Point & Figure (P&F)',
      'Melakukan perhitungan kolom horizontal dari Fase B ke Fase D',
      'Mengalikan jumlah hitungan dengan box size untuk menentukan target profit'
    ],
    resources: [
      { title: 'Point and Figure Charting: The Essential Application for Forecasting', author: 'Thomas J. Dorsey', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'wyk-4-2',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-4-1',
    level: 4,
    title: 'Struktur Reakumulasi vs Redistribusi di Tengah Tren',
    slug: 'wyckoff-reaccumulation-redistribution',
    summary: 'Membedakan jeda konsolidasi pengisian bahan bakar tren berkelanjutan vs jebakan distribusi terselubung.',
    content: `### Membaca Jeda di Tengah Tren
Tren besar jarang bergerak dalam satu garis lurus. Smart Money sering menghentikan tren untuk menambah posisi (*Reakumulasi*) atau melepas sisa inventaris (*Redistribusi*):
- **Ciri Khas Reakumulasi**:
  - Penurunan di dalam rentang lelang diiringi volume yang mengecil.
  - Terjadi shakeout kecil (mini-spring) yang segera dibeli kembali dengan agresif.
  - High struktur terus mencetak Higher High secara bertahap.
- **Ciri Khas Redistribusi**:
  - Pantulan ke atas di dalam rentang lelang memiliki volume yang mencurigakan (usaha tinggi tanpa hasil progres).
  - Support berulang kali diuji dan memantul semakin lemah.`,
    visual_type: 'swing_structure',
    coordinates_x: 490,
    coordinates_y: 750,
    order_index: 9,
    checklists: [
      'Memeriksa arah tren HTF sebelum menentukan reaksi konsolidasi',
      'Membandingkan volume saat harga menyentuh support vs resisten TR',
      'Menghindari menganggap setiap konsolidasi sebagai pembalikan tren'
    ],
    resources: [
      { title: 'Reaccumulation Patterns in Modern Asset Markets', author: 'TLP Classical Lab', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'wyk-5-1',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-4-2',
    level: 5,
    title: 'Setup Eksekusi: Jump Across the Creek (JAC) & BUEC',
    slug: 'wyckoff-jump-across-creek-entry',
    summary: 'Entry presisi saat harga melompati Creek (garis resistensi TR) dan menguji kembali di Back Up to the Edge of the Creek (BUEC).',
    content: `### Metafora 'Melompati Sungai' Wyckoff
Richard Wyckoff menggunakan metafora legendaris sungai (*The Creek*) untuk menggambarkan resistensi berliku di bagian atas Trading Range:
- **Jump Across the Creek (JAC)**: Lonjakan harga bervolume besar yang menyeberangi garis resistensi berliku tersebut. Ini setara dengan Major Sign of Strength (MSOS).
- **Back Up to the Edge of the Creek (BUEC)**: Pullback korektif pelan menuju batas sungai yang baru saja dilompati. Jika koreksi ini terjadi dengan volume yang menyusut dan spread mengecil, ini adalah konfirmasi mutlak bahwa resisten telah berubah menjadi support sejati.
- **SOP Eksekusi**: Masuk posisi Buy saat bar konfirmasi bullish muncul di BUEC dengan Stop Loss di bawah low ayunan BUEC.`,
    visual_type: 'entry_protocol',
    coordinates_x: 310,
    coordinates_y: 890,
    order_index: 10,
    checklists: [
      'Menandai garis berliku Creek yang menghubungkan swing highs Fase B',
      'Memverifikasi bahwa penyeberangan (JAC) didukung oleh volume expansion',
      'Menunggu formasi pantulan di BUEC dengan volume kering (dry volume)'
    ],
    resources: [
      { title: 'Trades About to Happen: A Modern Adaptation of the Wyckoff Method', author: 'David H. Weis', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'wyk-5-2',
    roadmap_id: 'rm-wyckoff',
    parent_node_id: 'wyk-5-1',
    level: 5,
    title: 'Anomali Volume: No Demand Test & Stopping Volume Confirmation',
    slug: 'wyckoff-no-demand-no-supply-tests',
    summary: 'Mengonfirmasi habisnya suplai/demand dengan candle berrentang sempit pada volume tipis sebelum menarik pelatuk entry.',
    content: `### Ujian Akhir Sebelum Menekan Tombol
Sebelum mengeksekusi order riil, trader Wyckoff selalu mencari bukti pengujian (*Testing*):
- **Test of Supply (No Supply Bar)**:
  - Candle bearish berrentang sempit yang ditutup di bagian tengah atau atas, dengan volume yang jauh lebih rendah daripada dua bar sebelumnya.
  - Ini membuktikan bahwa saat pasar diturunkan, tidak ada pihak yang bersedia menjual. Jalan ke atas bersih (*clear path of least resistance*).
- **Test of Demand (No Demand Bar)**:
  - Candle bullish berrentang sempit dengan volume sangat kering di dekat resisten. Membuktikan bahwa Smart Money tidak lagi tertarik mendorong harga ke atas.
- *Aturan Eksekusi*: Jangan pernah terburu-buru masuk saat melihat breakout besar; tunggulah bar pengujian (*Test*) dengan volume kering untuk mendapatkan entri berisiko paling minim.`,
    visual_type: 'candlestick_anatomy',
    coordinates_x: 490,
    coordinates_y: 890,
    order_index: 11,
    checklists: [
      'Membandingkan volume bar pengujian terhadap 2 candle sebelumnya',
      'Memastikan spread bar pengujian lebih sempit dari rata-rata',
      'Mengeksekusi entry tepat setelah bar konfirmasi berikutnya ditutup'
    ],
    resources: [
      { title: 'The VSA Testing Matrix & Trigger Execution', author: 'Tom Williams Educational Series', url: '#', type: 'Guide' }
    ]
  }
];
