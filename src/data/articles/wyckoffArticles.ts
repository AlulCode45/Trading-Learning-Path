import { EducationalArticle } from '../../types';

export const WYCKOFF_ARTICLES: Record<string, EducationalArticle> = {
  // Master Guide Wyckoff
  'wyckoff-method-vsa-mastery': {
    id: 'art-wyk-mastery',
    slug: 'wyckoff-method-vsa-mastery',
    title: 'Metode Wyckoff & Volume Spread Analysis: Menunggangi Jejak "Composite Operator"',
    category: 'Classical Analysis',
    level: 1,
    readingTimeMinutes: 22,
    difficulty: 'Advanced',
    summary: 'Masterclass komprehensif metodologi Wyckoff dan Volume Spread Analysis (VSA): Tiga Hukum Fundamental, skematik akumulasi dan distribusi Fase A-E, The Spring, Jump Across the Creek, dan proyeksi Point & Figure.',
    prerequisites: ['what-is-trading-fundamentals', 'candlestick-anatomy-wick-dynamics', 'valid-swing-high-low'],
    tableOfContents: [
      { id: 'tiga-hukum', title: '1. Tiga Hukum Abadi Richard D. Wyckoff' },
      { id: 'composite-man', title: '2. Konsep "Composite Man" (Operator Komposit)' },
      { id: 'fase-akumulasi', title: '3. Skematik Akumulasi Institusional (Fase A - E)' },
      { id: 'fase-distribusi', title: '4. Skematik Distribusi & UTAD' },
      { id: 'vsa-volume', title: '5. Volume Spread Analysis: Effort vs. Result' },
      { id: 'eksekusi-wyckoff', title: '6. Protokol Eksekusi: Jump Across the Creek & BUEC' }
    ],
    sections: [
      {
        id: 'tiga-hukum',
        title: '1. Tiga Hukum Abadi Richard D. Wyckoff',
        content: `### Fondasi Abadi Analisis Finansial Klasik
Richard D. Wyckoff merumuskan tiga hukum universal yang mengatur pergerakan harga di seluruh bursa saham dan komoditas dunia:

| Hukum Wyckoff | Penjelasan Mekanis | Implikasi Praktis di Chart |
| :--- | :--- | :--- |
| **1. Permintaan & Penawaran (Supply & Demand)** | Harga naik saat permintaan melebihi penawaran, dan turun saat penawaran melimpah | Mengamati absorpsi order di zona support & resisten |
| **2. Sebab & Akibat (Cause & Effect)** | Tidak ada pergerakan besar tanpa akumulasi/distribusi terlebih dahulu | Durasi konsolidasi horizontal memproyeksikan target jarak harga (P&F) |
| **3. Usaha vs Hasil (Effort vs Result)** | Usaha (Volume) harus menghasilkan pergerakan harga (Spread) yang proporsional | Volume ultra-tinggi dengan spread sempit mengindikasikan manipulasi/penyerapan |`
      },
      {
        id: 'composite-man',
        title: '2. Konsep "Composite Man" (Operator Komposit)',
        content: `### Siapa Sebenarnya Pemain di Balik Layar?
Wyckoff mengajarkan para muridnya untuk memandang seluruh pergerakan pasar seolah-olah dikendalikan oleh satu orang jenius yang kaya raya: **The Composite Man**:
- Composite Man merencanakan kampanyenya berbulan-bulan sebelumnya.
- Dia membeli diam-diam saat harga jatuh dan publik panik (*Akumulasi*).
- Dia mengerek harga naik perlahan (*Markup*).
- Dia menjual kepemilikannya di puncak saat media dipenuhi berita positif dan publik euforia (*DistribusI*).
- Dia menjatuhkan harga kembali ke dasar (*Markdown*) untuk mengulang siklus.`
      },
      {
        id: 'fase-akumulasi',
        title: '3. Skematik Akumulasi Institusional (Fase A - E)',
        content: `### Anatomi 5 Fase Akumulasi:
- **Phase A (Menghentikan Tren Turun)**:
  - *Preliminary Support (PS)*: Pembelian institusional awal yang menahan laju penurunan.
  - *Selling Climax (SC)*: Likuidasi kepanikan publik pada volume raksasa.
  - *Automatic Rally (AR)*: Pantulan teknis otomatis yang menentukan batas atas resisten Trading Range.
  - *Secondary Test (ST)*: Pengujian kembali dasar SC dengan volume mengecil.
- **Phase B (Membangun 'Sebab')**:
  - Penyerapan pasokan dalam jangka panjang di dalam rentang lelang.
- **Phase C (Ujian Terakhir - The Spring)**:
  - Penetrasi semu ke bawah support untuk memicu stop loss dan menguji sisa penjual (*Test of Supply*).
- **Phase D (Konfirmasi Permintaan)**:
  - *Sign of Strength (SOS)*: Reli bertenaga tinggi menembus resisten.
  - *Last Point of Support (LPS)*: Pullback korektif bervolume tipis.
- **Phase E (Markup Penuh)**:
  - Harga melesat meninggalkan Trading Range dalam tren naik yang kokoh.`
      },
      {
        id: 'fase-distribusi',
        title: '4. Skematik Distribusi & UTAD',
        content: `### Pelepasan Inventaris di Puncak
- **Buying Climax (BC)**: Euforia pembelian publik diserap penuh oleh penjualan institusi.
- **Automatic Reaction (AR)**: Penurunan cepat menentukan batas support distribusi.
- **Upthrust After Distribution (UTAD)**: Penembusan rekor tertinggi baru yang segera berbalik arah ke dalam rentang lelang untuk menjebak breakout buyer.
- **Major Sign of Weakness (MSOW)**: Penurunan tajam menembus support dengan volume penjualan besar.
- **Phase E (Markdown)**: Penurunan bebas tanpa batas.`
      },
      {
        id: 'vsa-volume',
        title: '5. Volume Spread Analysis: Effort vs. Result',
        content: `### Membaca Volume Menggunakan Pendekatan Tom Williams
- **Stopping Volume**: Volume ultra-tinggi pada candle bearish lebar yang langsung diikuti candle bullish penutupan tinggi. Tanda pasti bahwa Smart Money telah menyerap seluruh pesanan jual retail.
- **No Demand Bar**: Candle bullish berrentang sempit dengan volume lebih rendah dari 2 bar sebelumnya di dekat resisten. Membuktikan ketiadaan minat beli profesional.`
      },
      {
        id: 'eksekusi-wyckoff',
        title: '6. Protokol Eksekusi: Jump Across the Creek & BUEC',
        content: `### Setup Eksekusi Klasik Paling Aman
- **Jump Across the Creek (JAC)**: Lonjakan harga bervolume besar yang melompati garis resistensi berkelok Trading Range.
- **Back Up to the Edge of the Creek (BUEC)**: Pullback korektif pelan menuju mantan resisten dengan volume kering (*dry volume*). Inilah titik entri buy terbaik dengan Stop Loss di bawah low ayunan BUEC.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membeli saat terjadinya Selling Climax (mencoba menangkap pisau jatuh).',
        correction: 'Tunggu hingga Fase C (The Spring) atau Fase D (LPS) mengonfirmasi bahwa pasokan benar-benar habis.'
      },
      {
        mistake: 'Mengabaikan volume transaksi saat membaca grafik candlestick.',
        correction: 'Volume adalah satu-satunya data kebenaran usaha di balik pergerakan harga.'
      }
    ],
    keyTakeaways: [
      'Harga bergerak dalam 4 siklus abadi: Akumulasi, Markup, Distribusi, Markdown.',
      'The Spring di Fase C adalah peluang beli terbaik dengan rasio risiko paling minimal.',
      'Jangan pernah melawan jejak Composite Operator.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-three-fundamental-laws', title: 'Tiga Hukum Wyckoff', category: 'Classical' },
      { slug: 'wyckoff-spring-shakeout-phase-c', title: 'The Spring & Shakeout', category: 'Classical' }
    ],
    references: [
      { title: 'The Richard D. Wyckoff Method of Trading in Stocks', author: 'Richard D. Wyckoff', year: '1931' },
      { title: 'Master the Markets', author: 'Tom Williams', year: '2005' }
    ]
  },

  // Node articles Wyckoff
  'wyckoff-three-fundamental-laws': {
    id: 'art-wyk-laws',
    nodeId: 'wyk-1-1',
    slug: 'wyckoff-three-fundamental-laws',
    title: 'Tiga Hukum Fundamental Wyckoff',
    category: 'Classical Analysis',
    level: 1,
    readingTimeMinutes: 12,
    difficulty: 'Intermediate',
    summary: 'Membedah Hukum Penawaran & Permintaan, Hukum Sebab & Akibat, dan Hukum Usaha vs Hasil (Effort vs Result).',
    prerequisites: ['what-is-trading-fundamentals'],
    tableOfContents: [
      { id: 'hukum-1', title: '1. Hukum Penawaran & Permintaan' },
      { id: 'hukum-2', title: '2. Hukum Sebab & Akibat' },
      { id: 'hukum-3', title: '3. Hukum Usaha vs Hasil' }
    ],
    sections: [
      {
        id: 'hukum-1',
        title: '1. Hukum Penawaran & Permintaan',
        content: `Ketika permintaan melebihi penawaran, harga naik. Ketika penawaran melebihi permintaan, harga turun. Keseimbangan keduanya menciptakan konsolidasi.`
      },
      {
        id: 'hukum-2',
        title: '2. Hukum Sebab & Akibat',
        content: `Besaran akibat (tren markup/markdown) sebanding dengan besaran sebab (waktu dan volume akumulasi/distribusi di dalam Trading Range).`
      },
      {
        id: 'hukum-3',
        title: '3. Hukum Usaha vs Hasil',
        content: `Volume mencerminkan usaha; rentang harga (spread) mencerminkan hasil. Anomali di antara keduanya menandakan manipulasi institusional.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengabaikan volume dan hanya melihat pergerakan candle semata.',
        correction: 'Volume adalah pengukur validitas utama apakah pergerakan didukung oleh institusi.'
      }
    ],
    keyTakeaways: [
      'Tiga hukum Wyckoff berlaku di semua pasar dan timeframe.',
      'Effort vs Result adalah filter utama mendeteksi divergensi tersembunyi.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-vsa-candle-spread-volume', title: 'Volume Spread Analysis', category: 'Classical' }
    ],
    references: [
      { title: 'The Wyckoff Methodology in Depth', author: 'Rubén Villahermosa', year: '2019' }
    ]
  },

  'wyckoff-vsa-candle-spread-volume': {
    id: 'art-wyk-vsa',
    nodeId: 'wyk-1-2',
    slug: 'wyckoff-vsa-candle-spread-volume',
    title: 'Volume Spread Analysis: Ultra-High Volume & Spread Anatomy',
    category: 'Classical Analysis',
    level: 1,
    readingTimeMinutes: 13,
    difficulty: 'Intermediate',
    summary: 'Membaca interaksi rentang harga (spread) dengan volume transaksi: absorption, buying/selling climax, dan stopping volume.',
    prerequisites: ['wyckoff-three-fundamental-laws'],
    tableOfContents: [
      { id: 'tiga-komponen-vsa', title: '1. Tiga Komponen Utama VSA' },
      { id: 'stopping-volume', title: '2. Mengidentifikasi Stopping Volume' },
      { id: 'no-demand-test', title: '3. Bar No Demand & No Supply' }
    ],
    sections: [
      {
        id: 'tiga-komponen-vsa',
        title: '1. Tiga Komponen Utama VSA',
        content: `Spread (jarak High ke Low), Posisi Penutupan (Close), dan Volume relatif terhadap 20 bar sebelumnya.`
      },
      {
        id: 'stopping-volume',
        title: '2. Mengidentifikasi Stopping Volume',
        content: `Volume ultra-tinggi pada candle bearish lebar yang langsung dibeli kembali pada bar berikutnya. Membuktikan institusi menyerap seluruh pasokan.`
      },
      {
        id: 'no-demand-test',
        title: '3. Bar No Demand & No Supply',
        content: `Candle berrentang sempit dengan volume sangat kering yang membuktikan habisnya minat beli atau jual di area tersebut.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap volume tinggi selalu berarti kelanjutan tren.',
        correction: 'Volume ultra-tinggi di ujung tren sering kali merupakan tanda Climax (klimaks pelepasan).'
      }
    ],
    keyTakeaways: [
      'VSA menghubungkan psikologi lelang dengan volume transaksi nyata.',
      'Stopping volume menghentikan momentum tren.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-accumulation-phase-a-b', title: 'Fase Akumulasi', category: 'Classical' }
    ],
    references: [
      { title: 'Master the Markets', author: 'Tom Williams', year: '2005' }
    ]
  },

  'wyckoff-accumulation-phase-a-b': {
    id: 'art-wyk-acc-ab',
    nodeId: 'wyk-2-1',
    slug: 'wyckoff-accumulation-phase-a-b',
    title: 'Fase Akumulasi A & B: Stopping Volume, SC, & AR',
    category: 'Classical Analysis',
    level: 2,
    readingTimeMinutes: 14,
    difficulty: 'Intermediate',
    summary: 'Tahap penghentian tren turun: Preliminary Support (PS), Selling Climax (SC), Automatic Rally (AR), dan Secondary Test (ST).',
    prerequisites: ['wyckoff-vsa-candle-spread-volume'],
    tableOfContents: [
      { id: 'fase-a-stops', title: '1. Fase A: Menghentikan Tren Turun' },
      { id: 'definisi-batas-tr', title: '2. Menentukan Batas Trading Range' },
      { id: 'fase-b-cause', title: '3. Fase B: Membangun Sebab' }
    ],
    sections: [
      {
        id: 'fase-a-stops',
        title: '1. Fase A: Menghentikan Tren Turun',
        content: `PS memperlambat kejatuhan; SC menyerap kepanikan likuidasi retail; AR memantul secara teknis; ST menguji kembali dasar SC dengan volume mengecil.`
      },
      {
        id: 'definisi-batas-tr',
        title: '2. Menentukan Batas Trading Range',
        content: `Batas atas TR didefinisikan dari puncak AR; batas bawah TR dari dasar SC.`
      },
      {
        id: 'fase-b-cause',
        title: '3. Fase B: Membangun Sebab',
        content: `Fase konsolidasi panjang di mana Smart Money menyerap pasokan secara bertahap tanpa menaikkan harga pasar.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membeli di Fase B saat pasar masih berkonsolidasi liar.',
        correction: 'Tunggu konfirmasi Fase C (Spring) untuk mendapatkan entri presisi.'
      }
    ],
    keyTakeaways: [
      'Puncak AR dan dasar SC membentuk kandang Trading Range.',
      'Fase B adalah proses pembangunan energi "Sebab".'
    ],
    relatedTopics: [
      { slug: 'wyckoff-spring-shakeout-phase-c', title: 'The Spring', category: 'Classical' }
    ],
    references: [
      { title: 'Wyckoff Schematics Handbook', author: 'Wyckoff Analytics', year: '2023' }
    ]
  },

  'wyckoff-spring-shakeout-phase-c': {
    id: 'art-wyk-spring',
    nodeId: 'wyk-2-2',
    slug: 'wyckoff-spring-shakeout-phase-c',
    title: 'Fase C: The Spring & Terminal Shakeout Test',
    category: 'Classical Analysis',
    level: 2,
    readingTimeMinutes: 15,
    difficulty: 'Advanced',
    summary: 'Pengujian puncak pasokan terakhir: penetrasi semu ke bawah support trading range dengan volume rendah sebelum markup dimulai.',
    prerequisites: ['wyckoff-accumulation-phase-a-b'],
    tableOfContents: [
      { id: 'definisi-spring', title: '1. Apa Itu The Spring?' },
      { id: 'tipe-spring', title: '2. Tiga Tipe Spring Wyckoff' },
      { id: 'sop-entry-spring', title: '3. SOP Entry Spring Tipe 3' }
    ],
    sections: [
      {
        id: 'definisi-spring',
        title: '1. Apa Itu The Spring?',
        content: `Dorongan semu ke bawah support TR untuk memicu stop loss buyer dan menguji apakah aksi ini memancing penjual baru.`
      },
      {
        id: 'tipe-spring',
        title: '2. Tiga Tipe Spring Wyckoff',
        content: `Tipe 1 (Terminal Shakeout bervolume besar); Tipe 2 (penetrasi moderat); Tipe 3 (penetrasi tipis dengan volume sangat kering / No Supply).`
      },
      {
        id: 'sop-entry-spring',
        title: '3. SOP Entry Spring Tipe 3',
        content: `Beli saat candle berhasil menutup kembali ke dalam Trading Range dengan Stop Loss di bawah titik terendah Spring.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Langsung membeli saat candle masih bergerak menembus ke bawah support.',
        correction: 'Wajib menunggu candle resmi menutup kembali ke dalam area Trading Range.'
      }
    ],
    keyTakeaways: [
      'Spring Fase C adalah setup dengan probabilitas tertinggi dalam metode Wyckoff.',
      'Volume kering pada Spring membuktikan pasar siap lepas landas.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-sos-lps-phase-d-e', title: 'SOS & LPS', category: 'Classical' }
    ],
    references: [
      { title: 'The Wyckoff Spring Playbook', author: 'David H. Weis', year: '2021' }
    ]
  },

  'wyckoff-sos-lps-phase-d-e': {
    id: 'art-wyk-sos',
    nodeId: 'wyk-2-3',
    slug: 'wyckoff-sos-lps-phase-d-e',
    title: 'Fase D & E: Sign of Strength (SOS) & LPS Markup',
    category: 'Classical Analysis',
    level: 2,
    readingTimeMinutes: 13,
    difficulty: 'Intermediate',
    summary: 'Konfirmasi dominasi permintaan melalui Sign of Strength (SOS), pullback Last Point of Support (LPS), dan ekspansi keluar TR.',
    prerequisites: ['wyckoff-spring-shakeout-phase-c'],
    tableOfContents: [
      { id: 'sos-konfirmasi', title: '1. Konfirmasi Sign of Strength (SOS)' },
      { id: 'lps-entry', title: '2. Last Point of Support (LPS)' },
      { id: 'fase-e-markup', title: '3. Fase E: Markup Penuh' }
    ],
    sections: [
      {
        id: 'sos-konfirmasi',
        title: '1. Konfirmasi Sign of Strength (SOS)',
        content: `Gelombang reli bervolume besar dengan spread lilin lebar yang berhasil menembus garis resistensi Trading Range.`
      },
      {
        id: 'lps-entry',
        title: '2. Last Point of Support (LPS)',
        content: `Pullback korektif pelan menuju mantan resisten TR dengan volume yang menyusut drastis. Level entri buy paling aman.`
      },
      {
        id: 'fase-e-markup',
        title: '3. Fase E: Markup Penuh',
        content: `Tren bullish lepas bebas keluar dari rentang konsolidasi menuju target proyeksi Sebab-Akibat.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'FOMO membeli di puncak reli SOS.',
        correction: 'Bersabarlah menunggu pullback korektif LPS sebelum mengeksekusi posisi.'
      }
    ],
    keyTakeaways: [
      'SOS membuktikan dominasi pembeli institusi.',
      'LPS adalah titik masuk berisiko rendah di Fase D.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-distribution-phase-a-b', title: 'Fase Distribusi', category: 'Classical' }
    ],
    references: [
      { title: 'Wyckoff Phase D & E Execution', author: 'Hank Pruden', year: '2018' }
    ]
  },

  'wyckoff-distribution-phase-a-b': {
    id: 'art-wyk-dist-ab',
    nodeId: 'wyk-3-1',
    slug: 'wyckoff-distribution-phase-a-b',
    title: 'Fase Distribusi A & B: Buying Climax (BC) & UT',
    category: 'Classical Analysis',
    level: 3,
    readingTimeMinutes: 13,
    difficulty: 'Intermediate',
    summary: 'Pelepasan kepemilikan oleh Smart Money ke retail: Preliminary Supply (PSY), Buying Climax (BC), dan Upthrust (UT).',
    prerequisites: ['wyckoff-sos-lps-phase-d-e'],
    tableOfContents: [
      { id: 'psy-dan-bc', title: '1. Preliminary Supply & Buying Climax' },
      { id: 'ar-distribusi', title: '2. Automatic Reaction Menentukan Support' },
      { id: 'upthrust-ut', title: '3. Upthrust (UT) di Fase B' }
    ],
    sections: [
      {
        id: 'psy-dan-bc',
        title: '1. Preliminary Supply & Buying Climax',
        content: `Smart Money melepas jutaan lot kepemilikan mereka kepada retail trader yang sedang euforia pada volume raksasa.`
      },
      {
        id: 'ar-distribusi',
        title: '2. Automatic Reaction Menentukan Support',
        content: `Penurunan tajam pasca-BC yang mendefinisikan batas bawah rentang distribusi.`
      },
      {
        id: 'upthrust-ut',
        title: '3. Upthrust (UT) di Fase B',
        content: `Dorongan semu ke atas resisten BC yang segera gagal dan ditarik kembali ke dalam rentang lelang.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membeli di pucuk harga saat berita media mengumumkan target fantastis.',
        correction: 'Buying Climax adalah tanda bahaya mutlak pelepasan institusi.'
      }
    ],
    keyTakeaways: [
      'Distribusi adalah cermin kebalikan dari akumulasi.',
      'Pelepasan inventaris membutuhkan euforia publik.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-utad-lpsy-phase-c-e', title: 'UTAD & Markdown', category: 'Classical' }
    ],
    references: [
      { title: 'The Anatomy of Market Tops', author: 'TLP Classical Lab', year: '2024' }
    ]
  },

  'wyckoff-utad-lpsy-phase-c-e': {
    id: 'art-wyk-utad',
    nodeId: 'wyk-3-2',
    slug: 'wyckoff-utad-lpsy-phase-c-e',
    title: 'Fase C & E: Upthrust After Distribution (UTAD) & Markdown',
    category: 'Classical Analysis',
    level: 3,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Pancingan breakout tertinggi palsu (UTAD) di atas resisten TR, diikuti Major Sign of Weakness (SOW) dan fase penurunan harga.',
    prerequisites: ['wyckoff-distribution-phase-a-b'],
    tableOfContents: [
      { id: 'anatomi-utad', title: '1. Anatomi Perangkap UTAD' },
      { id: 'sow-dan-lpsy', title: '2. Sign of Weakness & Last Point of Supply' },
      { id: 'fase-e-markdown', title: '3. Fase E: Markdown Bebas' }
    ],
    sections: [
      {
        id: 'anatomi-utad',
        title: '1. Anatomi Perangkap UTAD',
        content: `Harga menembus pucuk rekor baru untuk menjerat para breakout buyer retail dan memicu Stop Loss para seller, sebelum langsung anjlok kembali ke dalam Trading Range.`
      },
      {
        id: 'sow-dan-lpsy',
        title: '2. Sign of Weakness & Last Point of Supply',
        content: `MSOW merusak batas support distribusi; LPSY adalah pantulan korektif lemah bervolume tipis yang menjadi zona entri Sell terbaik.`
      },
      {
        id: 'fase-e-markdown',
        title: '3. Fase E: Markdown Bebas',
        content: `Harga meluncur bebas ke bawah dalam tren penurunan tanpa batas.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Melakukan Buy Breakout saat harga menembus resisten distribusi.',
        correction: 'Periksa volume; penembusan pucuk di akhir tren adalah potensi UTAD.'
      }
    ],
    keyTakeaways: [
      'UTAD adalah saudara kembar Spring di puncak pasar.',
      'LPSY menawarkan rasio R:R short sell paling asimetris.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-cause-projection-horizontal-count', title: 'Proyeksi Sebab Akibat', category: 'Classical' }
    ],
    references: [
      { title: 'Distribution and Markdown Dynamics', author: 'Wyckoff Analytics', year: '2022' }
    ]
  },

  'wyckoff-cause-projection-horizontal-count': {
    id: 'art-wyk-cause-count',
    nodeId: 'wyk-4-1',
    slug: 'wyckoff-cause-projection-horizontal-count',
    title: 'Proyeksi Horisontal P&F: Mengukur Target Sebab-Akibat',
    category: 'Classical Analysis',
    level: 4,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Menggunakan Point & Figure box count secara horisontal sepanjang Trading Range untuk memproyeksikan target harga matematis.',
    prerequisites: ['wyckoff-utad-lpsy-phase-c-e'],
    tableOfContents: [
      { id: 'grafik-pf', title: '1. Dasar Grafik Point & Figure' },
      { id: 'horizontal-count', title: '2. Menghitung Jumlah Kolom Sebab' },
      { id: 'rumus-target', title: '3. Rumus Proyeksi Target Objektif' }
    ],
    sections: [
      {
        id: 'grafik-pf',
        title: '1. Dasar Grafik Point & Figure',
        content: `Grafik P&F menghilangkan variabel waktu dan hanya mencatat pergerakan harga murni dalam kolom X (naik) dan O (turun).`
      },
      {
        id: 'horizontal-count',
        title: '2. Menghitung Jumlah Kolom Sebab',
        content: `Hitung jumlah kolom horizontal sepanjang rentang Trading Range dari Fase B hingga Fase D.`
      },
      {
        id: 'rumus-target',
        title: '3. Rumus Proyeksi Target Objektif',
        content: `Target Harga = Level Breakout + (Jumlah Kolom × Ukuran Kotak × Nilai Reversal).`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menghitung kolom di luar batas Trading Range yang valid.',
        correction: 'Hanya hitung kolom yang berada di antara titik pengujian Fase B dan Fase D.'
      }
    ],
    keyTakeaways: [
      'Metode Wyckoff mampu memproyeksikan target harga secara matematis.',
      'Sebab yang panjang menghasilkan akibat yang berlipat ganda.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-reaccumulation-redistribution', title: 'Reakumulasi & Redistribusi', category: 'Classical' }
    ],
    references: [
      { title: 'Point and Figure Charting', author: 'Thomas J. Dorsey', year: '2013' }
    ]
  },

  'wyckoff-reaccumulation-redistribution': {
    id: 'art-wyk-reacc',
    nodeId: 'wyk-4-2',
    slug: 'wyckoff-reaccumulation-redistribution',
    title: 'Struktur Reakumulasi vs. Redistribusi di Tengah Tren',
    category: 'Classical Analysis',
    level: 4,
    readingTimeMinutes: 12,
    difficulty: 'Advanced',
    summary: 'Membedakan jeda konsolidasi pengisian bahan bakar tren berkelanjutan vs jebakan distribusi terselubung.',
    prerequisites: ['wyckoff-cause-projection-horizontal-count'],
    tableOfContents: [
      { id: 'reakumulasi', title: '1. Karakteristik Reakumulasi' },
      { id: 'redistribusi', title: '2. Ciri Bahaya Redistribusi' },
      { id: 'analisis-volume-tr', title: '3. Analisis Volume di Batas TR' }
    ],
    sections: [
      {
        id: 'reakumulasi',
        title: '1. Karakteristik Reakumulasi',
        content: `Volume menyusut saat harga turun ke support konsolidasi, terbentuk Higher Lows secara bertahap, dan shakeout kecil segera dibeli kembali.`
      },
      {
        id: 'redistribusi',
        title: '2. Ciri Bahaya Redistribusi',
        content: `Pantulan ke resisten diiringi volume mencurigakan tanpa hasil progres harga; support diuji berulang kali dan memantul semakin lemah.`
      },
      {
        id: 'analisis-volume-tr',
        title: '3. Analisis Volume di Batas TR',
        content: `Bandingkan volume saat harga menyentuh support vs resisten untuk mengonfirmasi bias institusi.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengira setiap konsolidasi di tengah tren adalah pembalikan arah total.',
        correction: 'Tren yang sedang berjalan cenderung berlanjut lebih sering daripada berbalik arah.'
      }
    ],
    keyTakeaways: [
      'Reakumulasi adalah pengisian bahan bakar tren.',
      'Volume kering saat koreksi adalah sahabat terbaik trend follower.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-jump-across-creek-entry', title: 'Jump Across the Creek', category: 'Classical' }
    ],
    references: [
      { title: 'Trend Continuation Schematics', author: 'TLP Applied Series', year: '2024' }
    ]
  },

  'wyckoff-jump-across-creek-entry': {
    id: 'art-wyk-jac',
    nodeId: 'wyk-5-1',
    slug: 'wyckoff-jump-across-creek-entry',
    title: 'Setup Eksekusi: Jump Across the Creek (JAC) & BUEC',
    category: 'Classical Analysis',
    level: 5,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Entry presisi saat harga melompati Creek (garis resistensi TR) dan menguji kembali di Back Up to the Edge of the Creek (BUEC).',
    prerequisites: ['wyckoff-reaccumulation-redistribution'],
    tableOfContents: [
      { id: 'metafora-creek', title: '1. Metafora Sungai "The Creek"' },
      { id: 'buec-retest', title: '2. Pengujian Back Up to the Edge (BUEC)' },
      { id: 'sop-entry-buec', title: '3. SOP Penempatan Limit Order' }
    ],
    sections: [
      {
        id: 'metafora-creek',
        title: '1. Metafora Sungai "The Creek"',
        content: `Resistensi berkelok di atas rentang akumulasi diibaratkan seperti aliran sungai (*Creek*) yang harus diseberangi dengan lonjakan bertenaga (*JAC*).`
      },
      {
        id: 'buec-retest',
        title: '2. Pengujian Back Up to the Edge (BUEC)',
        content: `Pullback korektif pelan menuju tepian sungai yang baru diseberangi dengan volume kering (*dry volume*). Konfirmasi resisten menjadi support sejati.`
      },
      {
        id: 'sop-entry-buec',
        title: '3. SOP Penempatan Limit Order',
        content: `Beli saat bar konfirmasi bullish muncul di BUEC dengan Stop Loss di bawah low ayunan BUEC.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membeli saat harga sedang melonjak di tengah lompatan JAC.',
        correction: 'Tunggu harga melakukan pendaratan tenang di BUEC untuk resiko paling terukur.'
      }
    ],
    keyTakeaways: [
      'JAC membuktikan kekuatan pembeli melompati resisten.',
      'BUEC adalah peluang entri terbaik sebelum ekspansi Fase E.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-no-demand-no-supply-tests', title: 'Volume Tests', category: 'Classical' }
    ],
    references: [
      { title: 'Trades About to Happen', author: 'David H. Weis', year: '2013' }
    ]
  },

  'wyckoff-no-demand-no-supply-tests': {
    id: 'art-wyk-tests',
    nodeId: 'wyk-5-2',
    slug: 'wyckoff-no-demand-no-supply-tests',
    title: 'Anomali Volume: No Demand Test & Stopping Volume Confirmation',
    category: 'Classical Analysis',
    level: 5,
    readingTimeMinutes: 12,
    difficulty: 'Advanced',
    summary: 'Mengonfirmasi habisnya suplai/demand dengan candle berrentang sempit pada volume tipis sebelum menarik pelatuk entry.',
    prerequisites: ['wyckoff-jump-across-creek-entry'],
    tableOfContents: [
      { id: 'uji-pasokan', title: '1. Menguji Pasokan (No Supply Bar)' },
      { id: 'uji-permintaan', title: '2. Menguji Permintaan (No Demand Bar)' },
      { id: 'trigger-eksekusi', title: '3. Trigger Eksekusi Konfirmasi' }
    ],
    sections: [
      {
        id: 'uji-pasokan',
        title: '1. Menguji Pasokan (No Supply Bar)',
        content: `Candle bearish berrentang sempit yang ditutup di bagian tengah/atas dengan volume lebih rendah dari 2 bar sebelumnya. Membuktikan ketiadaan penjual.`
      },
      {
        id: 'uji-permintaan',
        title: '2. Menguji Permintaan (No Demand Bar)',
        content: `Candle bullish berrentang sempit dengan volume sangat kering di dekat resisten. Membuktikan ketiadaan minat beli Smart Money.`
      },
      {
        id: 'trigger-eksekusi',
        title: '3. Trigger Eksekusi Konfirmasi',
        content: `Buka posisi tepat saat bar konfirmasi berikutnya ditutup mengonfirmasi hasil pengujian.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengeksekusi order saat volume masih tinggi tanpa adanya bar pengujian.',
        correction: 'Pengujian volume kering adalah garansi objektif bahwa jalan telah bersih.'
      }
    ],
    keyTakeaways: [
      'Testing adalah ujian wajib sebelum pelatuk ditarik.',
      'Volume kering adalah bahasa rahasia Smart Money.'
    ],
    relatedTopics: [
      { slug: 'wyckoff-method-vsa-mastery', title: 'Wyckoff Mastery Guide', category: 'Classical' }
    ],
    references: [
      { title: 'The VSA Testing Matrix', author: 'Tom Williams', year: '2008' }
    ]
  }
};
