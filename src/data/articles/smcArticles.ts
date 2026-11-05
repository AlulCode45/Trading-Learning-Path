import { EducationalArticle } from '../../types';

export const SMC_ARTICLES: Record<string, EducationalArticle> = {
  // Master Guide SMC & ICT
  'smart-money-concepts-ict-mastery': {
    id: 'art-smc-mastery',
    slug: 'smart-money-concepts-ict-mastery',
    title: 'Smart Money Concepts & ICT: Memahami Jejak Algoritma IPDA & Likuiditas Interbank',
    category: 'Institutional Trading',
    level: 1,
    readingTimeMinutes: 20,
    difficulty: 'Intermediate',
    summary: 'Panduan kurikulum master Smart Money Concepts (SMC) dan ICT: algoritma lelang IPDA, perburuan likuiditas, Fair Value Gap, Order Block, Killzones waktu, dan model eksekusi Silver Bullet.',
    prerequisites: ['what-is-trading-fundamentals', 'candlestick-anatomy-wick-dynamics', 'bos-vs-choch'],
    tableOfContents: [
      { id: 'hakikat-smc', title: '1. Hakikat Smart Money & Algoritma IPDA' },
      { id: 'inducement-vs-sweep', title: '2. Inducement (IDM) vs. True Liquidity Sweep' },
      { id: 'inefficiency-fvg', title: '3. Market Inefficiency & Fair Value Gaps (FVG)' },
      { id: 'order-blocks-breakers', title: '4. Order Blocks & Breaker Blocks Institusional' },
      { id: 'time-and-price', title: '5. Time & Price: Sesi Antarabank & Killzones' },
      { id: 'silver-bullet-model', title: '6. Model Eksekusi ICT Silver Bullet 60-Menit' }
    ],
    sections: [
      {
        id: 'hakikat-smc',
        title: '1. Hakikat Smart Money & Algoritma IPDA',
        content: `### Mengapa Retail Selalu Menjadi Likuiditas?
Di pasar valuta asing dan derivatif global senilai lebih dari $7.5 triliun per hari, harga tidak digerakkan oleh garis trendline retail, indikator RSI, atau pola grafik geometris klasik seperti Head and Shoulders.
Pasar dikendalikan oleh **Interbank Price Delivery Algorithm (IPDA)** yang dijalankan oleh konsorsium bank tier-1 (J.P. Morgan, Citi, HSBC, Deutsche Bank).

| Parameter Karakteristik | Retail Mindset | Smart Money / ICT Framework |
| :--- | :--- | :--- |
| **Penyebab Gerakan Harga** | Menganggap garis support/resistance memantulkan harga | Algoritma mencari likuiditas (Stop Loss) untuk mengisi order institusi |
| **Waktu Eksekusi** | Masuk kapan saja tanpa peduli sesi jam trading | Hanya beroperasi di jendela Killzones (London & NY Open) |
| **Zona Nilai** | Menggunakan indikator lagging (RSI, Stochastic, MACD) | Menggunakan Fair Value Gaps (FVG) & Order Blocks di area Diskon |
| **Sikap Terhadap Breakout** | Beli saat harga menembus pucuk (sering kena jebakan) | Menunggu pembersihan likuiditas (Sweep) sebelum mencari pembalikan arah |

> Algoritma IPDA diprogram dengan dua mandat tunggal: **Menawarkan harga pada nilai wajar (Fair Value Repricing)** dan **Menyerap likuiditas yang bertumpuk (Liquidity Run)**.`
      },
      {
        id: 'inducement-vs-sweep',
        title: '2. Inducement (IDM) vs. True Liquidity Sweep',
        content: `### Jebakan Inducement: Pancingan Dini Retail
Institusi besar membutuhkan jutaan lot pesanan lawan. Untuk memperolehnya, mereka menciptakan **Inducement (IDM)**:
- **Definisi Inducement**: Pullback valid pertama di dalam struktur tren yang sengaja dibiarkan memantul agar trader retail memasang posisi terlalu cepat.
- **Mekanisme Pancingan**:
  1. Tren sedang bullish kuat. Harga membuat swing high, lalu melakukan pullback minor (IDM).
  2. Retail mengira ini adalah support kuat dan membuka Buy dengan Stop Loss tepat di bawah IDM.
  3. Algoritma sengaja menusuk ke bawah IDM untuk memicu seluruh Stop Loss (likuiditas jual retail terserap).
  4. Begitu likuiditas terserap ke dalam institusi, harga memantul dari Order Block sejati dan melesat mencetak rekor Higher High baru.

| Fitur Pembeda | Inducement (IDM) | True Liquidity Sweep |
| :--- | :--- | :--- |
| **Lokasi Struktur** | Internal di tengah-tengah dealing range | Eksternal pada Old Highs / Old Lows mayor |
| **Tujuan Algoritma** | Mengonfirmasi validitas swing high/low baru | Memulai pergeseran struktur makro (MSS/CHoCH) |
| **Reaksi Pasca-Sentuhan** | Koreksi berlanjut ke Order Block utama | Pembalikan arah agresif dengan displacement |`
      },
      {
        id: 'inefficiency-fvg',
        title: '3. Market Inefficiency & Fair Value Gaps (FVG)',
        content: `### Mengapa Algoritma Wajib Menutup FVG?
Fair Value Gap (FVG) adalah celah ketidaktertumpukan lelang 3 candlestick yang mencerminkan dominasi satu sisi pasar secara mutlak:
- **BISI (Buyside Imbalance Sellside Inefficiency)**: Terbentuk saat lilin bullish raksasa melesat kencang sehingga High Candle 1 tidak bertumpukan dengan Low Candle 3. Di celah tersebut, tidak ada transaksi penjualan yang difasilitasi.
- **Consequent Encroachment (CE)**: Titik ekuilibrium 50% dari total panjang FVG. Algoritma IPDA secara matematis sering kali hanya perlu menyentuh level 50% CE ini untuk menyeimbangkan order book sebelum melanjutkan reli.

\`\`\`
   Candle 1        Candle 2 (Impulsif)       Candle 3
  [High Sumbu] ---------> [   ]
                          [   ] <--- [Low Sumbu Candle 3]
                          [   ]
    ===== FAIR VALUE GAP (AREA KOSONG KETIDAKEFISIENAN) =====
                          [   ]
  [High Sumbu Candle 1] ->[   ]
\`\`\`

> SOP Praktik: Jangan pernah melakukan chasing market saat FVG baru saja terbentuk. Pasang Limit Order pada titik pembukaan FVG atau level 50% Consequent Encroachment.`
      },
      {
        id: 'order-blocks-breakers',
        title: '4. Order Blocks & Breaker Blocks Institusional',
        content: `### Membedah Jejak Transaksi Bank
- **Order Block (OB)**:
  - *Bullish OB*: Candlestick bearish terakhir sebelum reli impulsif yang berhasil menyapu likuiditas dan menciptakan Market Structure Shift (MSS) dengan FVG.
  - *Mean Threshold (MT)*: Titik tengah 50% dari tubuh (*body*) candle OB. Jika candle penutupan berikutnya ditutup di bawah MT, Order Block dianggap gagal.
- **Breaker Block (BB)**:
  - Terjadi ketika sebuah Order Block gagal mempertahankan posisinya setelah sebelumnya sukses menyapu likuiditas lawan.
  - Ketika harga menembus level Order Block tersebut secara agresif, zona tersebut berbalik fungsi menjadi resisten atau support baru di mana institusi menutup posisi floating loss mereka pada titik impas (*Breakeven Mitigation*).`
      },
      {
        id: 'time-and-price',
        title: '5. Time & Price: Sesi Antarabank & Killzones',
        content: `### Hukum ICT: Waktu Mendikte Perilaku Harga
Pola teknikal yang muncul di luar jam Killzone memiliki probabilitas gagal lebih dari 65%:
| Sesi & Killzone | Waktu EST (New York) | Waktu WIB (Jakarta) | Karakteristik Utama |
| :--- | :--- | :--- | :--- |
| **Asian Range** | 20:00 - 00:00 EST | 07:00 - 11:00 WIB | Konsolidasi berrentang sempit; pembentukan pool likuiditas di atas/bawah |
| **London Killzone** | 02:00 - 05:00 EST | 13:00 - 16:00 WIB | Sering menciptakan High atau Low of the Day melalui Judas Swing |
| **New York Killzone** | 07:00 - 10:00 EST | 18:00 - 21:00 WIB | Volatilitas tertinggi; rilis data inflasi CPI, NFP, dan pembukaan Wall Street |
| **London Close** | 10:00 - 12:00 EST | 21:00 - 23:00 WIB | Retracement balik arah atau profit taking dari pergerakan New York |`
      },
      {
        id: 'silver-bullet-model',
        title: '6. Model Eksekusi ICT Silver Bullet 60-Menit',
        content: `### Protokol Eksekusi Berulang Setiap Hari
Model Silver Bullet beroperasi pada jendela waktu presisi 60 menit:
- **Jendela Pagi NY**: Tepat pukul 10:00 AM - 11:00 AM EST (21:00 - 22:00 WIB).
- **Checklist 4 Langkah Eksekusi**:
  1. *Identifikasi Likuiditas*: Amati sapuan likuiditas sesi London atau High/Low 60 menit sebelumnya.
  2. *Market Structure Shift (MSS)*: Tunggu terbentuknya penembusan swing point di M1/M5 dengan body candle tegas.
  3. *Fair Value Gap*: Tandai FVG pertama yang muncul dari pergerakan MSS tersebut.
  4. *Limit Order*: Pasang limit order di FVG dengan Stop Loss di luar swing extremum. Target Take Profit: 15-20 pips atau PD Array berikutnya.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap setiap candle berlawanan warna adalah Order Block tanpa memverifikasi adanya FVG dan Sweep likuiditas.',
        correction: 'Hanya tandai Order Block jika candle tersebut bertanggung jawab atas pembersihan likuiditas dan meninggalkan FVG yang belum termitigasi.'
      },
      {
        mistake: 'Melakukan entry trading di sesi Asia pada pasangan mata uang EUR/USD atau GBP/USD.',
        correction: 'Fokuskan trading mata uang Eropa di sesi London dan New York Killzone saat volume antarabank aktif.'
      }
    ],
    keyTakeaways: [
      'Harga digerakkan oleh algoritma IPDA untuk mencari likuiditas dan menyeimbangkan Fair Value Gaps.',
      'Inducement adalah pancingan likuiditas internal; jangan masuk sebelum IDM disapu.',
      'Sesi jam trading (Time) lebih penting daripada sekadar pola visual (Price).',
      'Model Silver Bullet memberikan setup berprobabilitas tinggi pada jendela waktu 10:00-11:00 AM EST.'
    ],
    relatedTopics: [
      { slug: 'smc-liquidity-inducement', title: 'Inducement vs True Sweep', category: 'Institutional' },
      { slug: 'smc-fvg-bpr-dynamics', title: 'Fair Value Gap Mechanics', category: 'Institutional' },
      { slug: 'smc-order-blocks', title: 'Order Block & Mean Threshold', category: 'Institutional' }
    ],
    references: [
      { title: 'ICT Mentorship Core Content Curriculum', author: 'Michael J. Huddleston', year: '2022' },
      { title: 'The Interbank Price Delivery Algorithm Architecture', author: 'TLP Institutional Research', year: '2024' }
    ]
  },

  // Node articles SMC
  'smc-liquidity-inducement': {
    id: 'art-smc-inducement',
    nodeId: 'smc-1-1',
    slug: 'smc-liquidity-inducement',
    title: 'Liquidity Pools & Inducement vs. True Sweep',
    category: 'Institutional Trading',
    level: 1,
    readingTimeMinutes: 12,
    difficulty: 'Intermediate',
    summary: 'Mekanika pancingan likuiditas (Inducement / IDM), pemetaan likuiditas internal vs eksternal, dan aturan validasi Higher High / Lower Low mekanis.',
    prerequisites: ['what-is-trading-fundamentals', 'valid-swing-high-low'],
    tableOfContents: [
      { id: 'definisi-idm', title: '1. Apa Itu Inducement (IDM)?' },
      { id: 'validasi-struktur', title: '2. Aturan Validasi Struktur Mekanis' },
      { id: 'studi-kasus', title: '3. Studi Kasus Nyata EUR/USD' }
    ],
    sections: [
      {
        id: 'definisi-idm',
        title: '1. Apa Itu Inducement (IDM)?',
        content: `### Mengapa Titik Pantulan Pertama Adalah Jebakan?
Di dalam struktur lelang pasar yang bergerak naik, harga membentuk ayunan gelombang. Pullback valid pertama yang tercipta setelah penembusan BOS disebut **Inducement (IDM)**.
- Banyak retail trader menganggap IDM sebagai garis Support baru dan menempatkan Stop Loss tepat di bawahnya.
- Algoritma IPDA sengaja menembus level IDM ini untuk menyapu seluruh stop loss retail sebelum melanjutkan ekspansi tren sejati.`
      },
      {
        id: 'validasi-struktur',
        title: '2. Aturan Validasi Struktur Mekanis',
        content: `### Rumus Struktur Mekanis Anti-Subjektivitas:
1. **Valid Higher High**: Hanya terkonfirmasi sah ketika harga telah mengambil (*swept*) titik Inducement (IDM) sebelumnya.
2. **Valid Higher Low**: Terkonfirmasi ketika harga berhasil menembus Valid Higher High sebelumnya dengan penutupan full candle body (BOS).`
      },
      {
        id: 'studi-kasus',
        title: '3. Studi Kasus Nyata EUR/USD',
        content: `### Skenario Lapangan:
EUR/USD membentuk Higher High di 1.0950, lalu terkoreksi ke 1.0910 (IDM) dan memantul ke 1.0935. Retail trader berbondong-bondong membuka posisi Buy di 1.0930 dengan Stop Loss di 1.0905.
- *Aksi Algoritma*: Harga tiba-tiba anjlok ke 1.0895 (menyapu Stop Loss retail), menyentuh Bullish Order Block di area Diskon 1.0890, lalu meledak naik ke 1.1020 (+125 pips).
- *Kesimpulan*: Trader SMC menunggu IDM tersapu terlebih dahulu sebelum mencari entri buy.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membuka posisi Buy tepat di area Inducement tanpa menunggu sweep.',
        correction: 'Tandai level IDM sebagai likuiditas pancingan, bukan sebagai level entri.'
      }
    ],
    keyTakeaways: [
      'Inducement adalah rekayasa likuiditas counter-party bagi institusi bank.',
      'Sebuah Higher High belum sah sebelum harga menyapu Inducement.'
    ],
    relatedTopics: [
      { slug: 'smc-fvg-bpr-dynamics', title: 'Fair Value Gap Dynamics', category: 'Institutional' }
    ],
    references: [
      { title: 'The Algorithm of Market Structure', author: 'ICT Archive', year: '2023' }
    ]
  },

  'smc-fvg-bpr-dynamics': {
    id: 'art-smc-fvg',
    nodeId: 'smc-1-2',
    slug: 'smc-fvg-bpr-dynamics',
    title: 'Fair Value Gap (FVG) & Balanced Price Range (BPR)',
    category: 'Institutional Trading',
    level: 1,
    readingTimeMinutes: 14,
    difficulty: 'Intermediate',
    summary: 'Mendeteksi celah ketidakefisienan lelang 3 candlestick, pemetaan BISI/SIBI, pengujian 50% Consequent Encroachment, dan fenomena Balanced Price Range.',
    prerequisites: ['candlestick-anatomy-wick-dynamics', 'smc-liquidity-inducement'],
    tableOfContents: [
      { id: 'anatomi-fvg', title: '1. Anatomi Pembentukan FVG' },
      { id: 'consequent-encroachment', title: '2. Aturan Consequent Encroachment (50%)' },
      { id: 'bpr-magnet', title: '3. Balanced Price Range (BPR)' }
    ],
    sections: [
      {
        id: 'anatomi-fvg',
        title: '1. Anatomi Pembentukan FVG',
        content: `### Tiga Elemen Wajib FVG:
1. **Candle 1**: Lilin pembuka yang menetapkan batas rentang awal.
2. **Candle 2**: Lilin impulsif berukuran masif (*displacement bar*).
3. **Candle 3**: Lilin penutup di mana sumbunya tidak bertumpukan dengan Candle 1.`
      },
      {
        id: 'consequent-encroachment',
        title: '2. Aturan Consequent Encroachment (50%)',
        content: `### Titik Keseimbangan Matematis
Consequent Encroachment (CE) adalah titik tengah 50% dari FVG. Jika saat retest candle hanya menyentuh CE dan segera ditutup dengan sumbu penolakan, ini adalah konfirmasi bahwa institusi telah selesai mengisi pesanan mereka.`
      },
      {
        id: 'bpr-magnet',
        title: '3. Balanced Price Range (BPR)',
        content: `### Super Magnet Harga
Balanced Price Range (BPR) terjadi ketika FVG Bullish ditembus kembali oleh FVG Bearish yang bertumpukan di area yang sama. Area ini menjadi zona support/resistance institusi dengan akurasi sangat tinggi.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap FVG pada candle bervolume rendah sebagai FVG institusional.',
        correction: 'Hanya gunakan FVG yang lahir dari candle displacement bervolume agresif.'
      }
    ],
    keyTakeaways: [
      'FVG adalah bukti ketidakseimbangan transaksi lelang di pasar.',
      'Level 50% CE sering kali menjadi batas pantulan presisi algoritma.'
    ],
    relatedTopics: [
      { slug: 'smc-order-blocks', title: 'Order Block Mechanics', category: 'Institutional' }
    ],
    references: [
      { title: 'Price Delivery Engine & Inefficiencies', author: 'ICT Laboratory', year: '2023' }
    ]
  },

  'smc-order-blocks': {
    id: 'art-smc-ob',
    nodeId: 'smc-2-1',
    slug: 'smc-order-blocks',
    title: 'Order Block (OB) & Mean Threshold Mechanics',
    category: 'Institutional Trading',
    level: 2,
    readingTimeMinutes: 14,
    difficulty: 'Intermediate',
    summary: 'Membedah candle institusi terakhir sebelum reli/penurunan tajam, aturan Mean Threshold (50% body), dan filter FVG pendukung.',
    prerequisites: ['smc-fvg-bpr-dynamics'],
    tableOfContents: [
      { id: 'kriteria-ob', title: '1. Kriteria Order Block Sah' },
      { id: 'mean-threshold', title: '2. Mean Threshold (50% Body)' },
      { id: 'protokol-entry', title: '3. Protokol Entry Limit Order' }
    ],
    sections: [
      {
        id: 'kriteria-ob',
        title: '1. Kriteria Order Block Sah',
        content: `### 3 Syarat Mutlak High-Probability OB:
1. Candle tersebut harus menyapu likuiditas (*liquidity sweep*) dari swing sebelumnya.
2. Candle berikutnya wajib bergerak impulsif memecahkan struktur (*MSS / BOS*).
3. Harus meninggalkan Fair Value Gap (FVG) yang belum tersentuh di depannya.`
      },
      {
        id: 'mean-threshold',
        title: '2. Mean Threshold (50% Body)',
        content: `### Level Toleransi Maksimal
Mean Threshold (MT) adalah titik 50% dari body candle Order Block. Jika harga melakukan pullback dan candle ditutup melewati MT, maka OB tersebut dinyatakan gagal (*invalidated*).`
      },
      {
        id: 'protokol-entry',
        title: '3. Protokol Entry Limit Order',
        content: `### Penempatan Pesanan Presisi:
- Konservatif: Limit Order di Open Order Block dengan SL di luar Low OB.
- Agresif: Limit Order di Mean Threshold (50% OB) untuk memperkecil risiko SL hingga 50%.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengabaikan sumbu panjang dan hanya mengukur dari pucuk wick ke dasar wick.',
        correction: 'Mean Threshold diukur strictly dari 50% tinggi body candle, bukan sumbu.'
      }
    ],
    keyTakeaways: [
      'Order block tanpa sweep likuiditas dan FVG adalah order block palsu.',
      'Mean Threshold adalah level invalidasi struktural objektif.'
    ],
    relatedTopics: [
      { slug: 'smc-breaker-mitigation-blocks', title: 'Breaker Blocks', category: 'Institutional' }
    ],
    references: [
      { title: 'The Order Block Blueprint', author: 'TLP Applied Series', year: '2024' }
    ]
  },

  'smc-breaker-mitigation-blocks': {
    id: 'art-smc-bb',
    nodeId: 'smc-2-2',
    slug: 'smc-breaker-mitigation-blocks',
    title: 'Breaker Block vs. Mitigation Block',
    category: 'Institutional Trading',
    level: 2,
    readingTimeMinutes: 12,
    difficulty: 'Intermediate',
    summary: 'Memanfaatkan order block gagal yang berubah fungsi menjadi support/resistance institusional setelah liquidity sweep terjadi.',
    prerequisites: ['smc-order-blocks'],
    tableOfContents: [
      { id: 'mekanika-breaker', title: '1. Mekanika Breaker Block' },
      { id: 'mitigation-block', title: '2. Perbedaan dengan Mitigation Block' },
      { id: 'eksekusi-bb', title: '3. Eksekusi Pada First Touch' }
    ],
    sections: [
      {
        id: 'mekanika-breaker',
        title: '1. Mekanika Breaker Block',
        content: `### Order Block Gagal yang Berbalik Fungsi
Breaker Block adalah Order Block yang gagal menahan harga setelah sebelumnya memicu sweep likuiditas. Ketika ditembus dengan displacement kuat, bank menutup posisi floating loss mereka pada retest pertama (*first touch*), memicu reaksi kuat ke arah tren baru.`
      },
      {
        id: 'mitigation-block',
        title: '2. Perbedaan dengan Mitigation Block',
        content: `### Perbedaan Krusial:
- **Breaker Block**: Terbentuk dengan adanya sapuan likuiditas (*Liquidity Sweep*).
- **Mitigation Block**: Terbentuk ketika harga gagal menyapu level ekstrim sebelumnya (*Failure Swing*).`
      },
      {
        id: 'eksekusi-bb',
        title: '3. Eksekusi Pada First Touch',
        content: `Pasang Limit order pada saat harga kembali mengunjungi level Breaker Block pertama kali dengan stop loss di luar swing origin breaker.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Melakukan re-entry pada pengujian ke-3 atau ke-4 Breaker Block.',
        correction: 'Breaker Block paling kuat hanya pada reaksi pertama (first touch).'
      }
    ],
    keyTakeaways: [
      'Breaker block memanfaatkan mitigasi posisi impas dari institusi yang sempat terjebak.',
      'Selalu pastikan ada liquidity sweep sebelum mengonfirmasi status Breaker.'
    ],
    relatedTopics: [
      { slug: 'smc-order-blocks', title: 'Order Blocks', category: 'Institutional' }
    ],
    references: [
      { title: 'ICT Breaker Block Playbook', author: 'ICT', year: '2022' }
    ]
  },

  'smc-volume-imbalance-voids': {
    id: 'art-smc-vi',
    nodeId: 'smc-2-3',
    slug: 'smc-volume-imbalance-voids',
    title: 'Volume Imbalance & Liquidity Voids',
    category: 'Institutional Trading',
    level: 2,
    readingTimeMinutes: 11,
    difficulty: 'Intermediate',
    summary: 'Memetakan celah tanpa transaksi antara ekor candle dan gap pembukaan harga yang wajib dikunjungi kembali algoritma IPDA.',
    prerequisites: ['smc-fvg-bpr-dynamics'],
    tableOfContents: [
      { id: 'volume-imbalance', title: '1. Definisi Volume Imbalance (VI)' },
      { id: 'liquidity-void', title: '2. Dinamika Liquidity Void' },
      { id: 'strategi-pengisian', title: '3. Strategi Pengisian Celah' }
    ],
    sections: [
      {
        id: 'volume-imbalance',
        title: '1. Definisi Volume Imbalance (VI)',
        content: `Volume Imbalance terjadi ketika body candle satu tidak bertumpukan dengan body candle berikutnya, namun sumbunya saling bertumpukan. Ini mencerminkan ketiadaan volume body pada level harga tersebut.`
      },
      {
        id: 'liquidity-void',
        title: '2. Dinamika Liquidity Void',
        content: `Lompatan harga tajam yang dipicu rilis berita berdampak tinggi. Algoritma diprogram untuk kembali menutup celah ini (*Rebalancing*) sebelum melanjutkan pergerakan tren makro.`
      },
      {
        id: 'strategi-pengisian',
        title: '3. Strategi Pengisian Celah',
        content: `Gunakan batas atas dan batas bawah void sebagai target sasaran Take Profit objektif.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membuka posisi melawan arah pengisian liquidity void.',
        correction: 'Ikuti tarikan magnet void hingga tertutup sempurna sebelum mencari setup berlawanan.'
      }
    ],
    keyTakeaways: [
      'Volume Imbalance adalah celah body-to-body dengan wick overlap.',
      'Liquidity void bertindak sebagai magnet penarik harga bagi algoritma IPDA.'
    ],
    relatedTopics: [
      { slug: 'smc-fvg-bpr-dynamics', title: 'Fair Value Gaps', category: 'Institutional' }
    ],
    references: [
      { title: 'Microstructure Gaps and Voids', author: 'TLP Quantitative Lab', year: '2024' }
    ]
  },

  'smc-asian-range-judas-swing': {
    id: 'art-smc-judas',
    nodeId: 'smc-3-1',
    slug: 'smc-asian-range-judas-swing',
    title: 'Asian Range Accumulation & London Judas Swing',
    category: 'Institutional Trading',
    level: 3,
    readingTimeMinutes: 13,
    difficulty: 'Advanced',
    summary: 'Mengukur rentang konsolidasi sesi Asia dan mengantisipasi pergerakan manipulasi palsu (Judas Swing) saat pembukaan London.',
    prerequisites: ['smc-liquidity-inducement'],
    tableOfContents: [
      { id: 'asian-range', title: '1. Mengukur Asian Range' },
      { id: 'anatomi-judas', title: '2. Anatomi Judas Swing' },
      { id: 'protokol-london', title: '3. Protokol Eksekusi London Open' }
    ],
    sections: [
      {
        id: 'asian-range',
        title: '1. Mengukur Asian Range',
        content: `Rentang sesi Tokyo (20:00 - 00:00 EST) mengumpulkan kolam likuiditas Buy-Side di atas Asian High dan Sell-Side di bawah Asian Low.`
      },
      {
        id: 'anatomi-judas',
        title: '2. Anatomi Judas Swing',
        content: `Tepat pukul 02:00 - 03:00 EST saat London dibuka, algoritma mendorong harga menembus Asian High/Low untuk memicu breakout trader dan menyapu stop loss, sebelum langsung berbalik arah menciptakan tren harian sejati.`
      },
      {
        id: 'protokol-london',
        title: '3. Protokol Eksekusi London Open',
        content: `Tunggu sapuan Asian High/Low selesai, amati terjadinya CHoCH di M5, lalu pasang limit order di FVG baru.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membeli saat harga melakukan breakout awal di pembukaan sesi London.',
        correction: 'Sebagian besar breakout pembukaan London adalah manipulasi Judas Swing.'
      }
    ],
    keyTakeaways: [
      'Asian Range mengakumulasi likuiditas retail di kedua sisinya.',
      'Judas Swing adalah jebakan pembalikan arah klasik sesi London.'
    ],
    relatedTopics: [
      { slug: 'smc-killzones-session-timing', title: 'Interbank Killzones', category: 'Institutional' }
    ],
    references: [
      { title: 'The London Open Judas Swing Blueprint', author: 'ICT', year: '2022' }
    ]
  },

  'smc-killzones-session-timing': {
    id: 'art-smc-killzones',
    nodeId: 'smc-3-2',
    slug: 'smc-killzones-session-timing',
    title: 'London & New York Killzones Timing Protocol',
    category: 'Institutional Trading',
    level: 3,
    readingTimeMinutes: 12,
    difficulty: 'Advanced',
    summary: 'Menentukan jendela waktu presisi lelang antarabank di mana ekspansi harga dan likuiditas tertinggi terjadi.',
    prerequisites: ['smc-asian-range-judas-swing'],
    tableOfContents: [
      { id: 'jadwal-killzone', title: '1. Matriks Jam Killzone Global' },
      { id: 'karakteristik-sesi', title: '2. Karakteristik Sesi London vs NY' },
      { id: 'disiplin-waktu', title: '3. Aturan Disiplin Waktu' }
    ],
    sections: [
      {
        id: 'jadwal-killzone',
        title: '1. Matriks Jam Killzone Global',
        content: `London Killzone: 02:00 - 05:00 EST. New York Open Killzone: 07:00 - 10:00 EST. London Close: 10:00 - 12:00 EST.`
      },
      {
        id: 'karakteristik-sesi',
        title: '2. Karakteristik Sesi London vs NY',
        content: `London sering membentuk titik High atau Low of the Day. New York memperluas tren tersebut atau membalikkan arah saat rilis berita besar.`
      },
      {
        id: 'disiplin-waktu',
        title: '3. Aturan Disiplin Waktu',
        content: `Dilarang membuka posisi baru di luar jam Killzone aktif untuk menghindari volatilitas rendah dan spread melebar.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trading sepanjang hari tanpa henti.',
        correction: 'Batasi eksekusi hanya pada 2-3 jam selama jendela Killzone aktif.'
      }
    ],
    keyTakeaways: [
      'Waktu lebih utama daripada pola visual di pasar antarabank.',
      'Sesi New York adalah waktu terbaik untuk instrumen berbasis USD dan Indeks Ekuitas.'
    ],
    relatedTopics: [
      { slug: 'smc-amd-daily-bias', title: 'Power of 3 (AMD)', category: 'Institutional' }
    ],
    references: [
      { title: 'Interbank Timing & Session Protocol', author: 'TLP Applied Series', year: '2024' }
    ]
  },

  'smc-amd-daily-bias': {
    id: 'art-smc-amd',
    nodeId: 'smc-3-3',
    slug: 'smc-amd-daily-bias',
    title: 'Power of 3 (AMD: Accumulation, Manipulation, Distribution)',
    category: 'Institutional Trading',
    level: 3,
    readingTimeMinutes: 13,
    difficulty: 'Advanced',
    summary: 'Memahami siklus pembentukan candle harian: Akumulasi di Open, Manipulasi ke arah berlawanan, dan Distribusi ekspansi.',
    prerequisites: ['smc-killzones-session-timing'],
    tableOfContents: [
      { id: 'siklus-amd', title: '1. Tiga Tahapan Siklus AMD' },
      { id: 'midnight-open', title: '2. Peran NY Midnight Open (00:00 EST)' },
      { id: 'daily-bias', title: '3. Menentukan Daily Bias Objektif' }
    ],
    sections: [
      {
        id: 'siklus-amd',
        title: '1. Tiga Tahapan Siklus AMD',
        content: `Accumulation (Open harga), Manipulation (pembentukan sumbu harian di arah berlawanan), dan Distribution (pergerakan tren utama ke arah sasaran).`
      },
      {
        id: 'midnight-open',
        title: '2. Peran NY Midnight Open (00:00 EST)',
        content: `Garis harga pembukaan tengah malam New York menjadi garis batas sakral: beli di bawah Midnight Open untuk hari bullish; jual di atas Midnight Open untuk hari bearish.`
      },
      {
        id: 'daily-bias',
        title: '3. Menentukan Daily Bias Objektif',
        content: `Bias harian ditentukan dari PD Array HTF mana yang sedang dituju oleh likuiditas harga.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membeli saat harga sudah berada jauh di atas harga Midnight Open pada hari bullish.',
        correction: 'Beli saat fase manipulasi sedang mendorong harga ke bawah Midnight Open.'
      }
    ],
    keyTakeaways: [
      'Siklus AMD adalah cetak biru pembentukan candlestick harian.',
      'Midnight Open New York adalah filter nilai wajar harian.'
    ],
    relatedTopics: [
      { slug: 'smc-silver-bullet-execution', title: 'ICT Silver Bullet', category: 'Institutional' }
    ],
    references: [
      { title: 'Power of Three Masterclass', author: 'ICT Core Series', year: '2023' }
    ]
  },

  'smc-smt-divergence': {
    id: 'art-smc-smt',
    nodeId: 'smc-4-1',
    slug: 'smc-smt-divergence',
    title: 'SMT Divergence (Smart Money Tool) Correlation',
    category: 'Institutional Trading',
    level: 4,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Mendeteksi ketidaksesuaian swing antara aset berkorelasi (EURUSD vs GBPUSD, DXY vs ES) untuk membaca konfirmasi smart money.',
    prerequisites: ['smc-amd-daily-bias'],
    tableOfContents: [
      { id: 'konsep-smt', title: '1. Konsep SMT Divergence' },
      { id: 'korelasi-aset', title: '2. Pasangan Aset Berkorelasi' },
      { id: 'filter-eksekusi', title: '3. SMT Sebagai Filter Eksekusi' }
    ],
    sections: [
      {
        id: 'konsep-smt',
        title: '1. Konsep SMT Divergence',
        content: `Ketika dua aset yang berkorelasi 90% gagal mencetak struktur yang sinkron (misal satu membuat Higher High, yang lain membentuk Lower High), ini adalah bukti mutlak adanya manipulasi institusi.`
      },
      {
        id: 'korelasi-aset',
        title: '2. Pasangan Aset Berkorelasi',
        content: `EUR/USD vs GBP/USD, S&P 500 (ES) vs Nasdaq (NQ), DXY vs Pasar Ekuitas.`
      },
      {
        id: 'filter-eksekusi',
        title: '3. SMT Sebagai Filter Eksekusi',
        content: `Hanya ambil posisi ketika SMT Divergence terkonfirmasi di level kunci HTF.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengabaikan divergensi antar indeks saham.',
        correction: 'Jika ES membuat Low baru tetapi NQ bertahan di atas Low, waspadai pembalikan bullish.'
      }
    ],
    keyTakeaways: [
      'SMT Divergence mengintip ketidaksinkronan komitmen bank besar.',
      'Sinyal konfirmasi paling objektif dalam metodologi ICT.'
    ],
    relatedTopics: [
      { slug: 'smc-pd-arrays-dealing-range', title: 'PD Arrays', category: 'Institutional' }
    ],
    references: [
      { title: 'Intermarket SMT Analysis', author: 'ICT Laboratory', year: '2023' }
    ]
  },

  'smc-pd-arrays-dealing-range': {
    id: 'art-smc-pd-arrays',
    nodeId: 'smc-4-2',
    slug: 'smc-pd-arrays-dealing-range',
    title: 'Dealing Ranges & Premium/Discount PD Array Matrix',
    category: 'Institutional Trading',
    level: 4,
    readingTimeMinutes: 13,
    difficulty: 'Advanced',
    summary: 'Menyusun hierarki matriks PD Array (Mitigation, Breaker, OB, FVG, Rejection Block) di dalam dealing range aktif 0% - 100%.',
    prerequisites: ['smc-smt-divergence'],
    tableOfContents: [
      { id: 'dealing-range', title: '1. Memetakan Dealing Range' },
      { id: 'hierarki-pd', title: '2. Hierarki Matriks PD Array' },
      { id: 'aturan-equilibrium', title: '3. Aturan Disiplin 50% Equilibrium' }
    ],
    sections: [
      {
        id: 'dealing-range',
        title: '1. Memetakan Dealing Range',
        content: `Dealing range ditarik dari swing low terendah ke swing high tertinggi yang bertanggung jawab atas pergerakan saat ini.`
      },
      {
        id: 'hierarki-pd',
        title: '2. Hierarki Matriks PD Array',
        content: `Urutan dari diskon terdalam ke premium: Old Low -> Rejection Block -> Order Block -> FVG -> Breaker -> Mitigation Block.`
      },
      {
        id: 'aturan-equilibrium',
        title: '3. Aturan Disiplin 50% Equilibrium',
        content: `Hanya Buy di bawah 50%; Hanya Sell di atas 50%.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membuka posisi Buy di area Premium hanya karena melihat FVG.',
        correction: 'FVG di area Premium adalah zona Take Profit, bukan zona Buy baru.'
      }
    ],
    keyTakeaways: [
      'Dealing range membingkai area nilai transaksi.',
      'Matriks PD Array menentukan level presisi eksekusi.'
    ],
    relatedTopics: [
      { slug: 'smc-silver-bullet-execution', title: 'Silver Bullet Model', category: 'Institutional' }
    ],
    references: [
      { title: 'The Complete PD Array Matrix', author: 'ICT', year: '2022' }
    ]
  },

  'smc-silver-bullet-execution': {
    id: 'art-smc-silver-bullet',
    nodeId: 'smc-5-1',
    slug: 'smc-silver-bullet-execution',
    title: 'ICT Silver Bullet 60-Minute Execution Model',
    category: 'Institutional Trading',
    level: 5,
    readingTimeMinutes: 15,
    difficulty: 'Advanced',
    summary: 'Menjalankan protokol eksekusi setup 1-jam (10:00-11:00 AM NY) berbasis MSS + FVG dengan target 10-15 ticks/pips.',
    prerequisites: ['smc-pd-arrays-dealing-range', 'smc-fvg-bpr-dynamics'],
    tableOfContents: [
      { id: 'jendela-waktu', title: '1. Jendela Waktu Silver Bullet' },
      { id: 'sop-eksekusi', title: '2. SOP 4 Langkah Eksekusi' },
      { id: 'target-profit', title: '3. Target Profit Objektif' }
    ],
    sections: [
      {
        id: 'jendela-waktu',
        title: '1. Jendela Waktu Silver Bullet',
        content: `Silver Bullet NY Pagi: 10:00 AM - 11:00 AM EST. Pada jendela ini, algoritma selalu mengirimkan minimal 1 setup FVG bertenaga tinggi.`
      },
      {
        id: 'sop-eksekusi',
        title: '2. SOP 4 Langkah Eksekusi',
        content: `1. Sapuan likuiditas -> 2. Market Structure Shift (MSS) di M1/M5 -> 3. Identifikasi FVG -> 4. Pasang limit order pada FVG.`
      },
      {
        id: 'target-profit',
        title: '3. Target Profit Objektif',
        content: `Target realistis 10 - 15 pips / points (atau 2R - 3R) tanpa serakah.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengeksekusi model Silver Bullet di luar jam 10:00 - 11:00 AM EST.',
        correction: 'Kunci model ini adalah faktor waktu lelang lelang antarabank yang tepat.'
      }
    ],
    keyTakeaways: [
      'Silver bullet adalah model eksekusi paling sistematis dan mekanis dalam ICT.',
      'Fokus pada 10-15 pips berkualitas tinggi setiap hari.'
    ],
    relatedTopics: [
      { slug: 'smc-institutional-scaling-invalidation', title: 'Scale-Out Management', category: 'Institutional' }
    ],
    references: [
      { title: 'ICT 2023 Silver Bullet Mentorship', author: 'Michael J. Huddleston', year: '2023' }
    ]
  },

  'smc-institutional-scaling-invalidation': {
    id: 'art-smc-scaling',
    nodeId: 'smc-5-2',
    slug: 'smc-institutional-scaling-invalidation',
    title: 'Institutional Invalidation & Scale-Out Management',
    category: 'Institutional Trading',
    level: 5,
    readingTimeMinutes: 12,
    difficulty: 'Advanced',
    summary: 'Eksekusi partial profit taking pada level likuiditas lawan dan pengamanan posisi tanpa merusak ruang napas order block.',
    prerequisites: ['smc-silver-bullet-execution'],
    tableOfContents: [
      { id: 'partial-taking', title: '1. Aturan Partial Profit Taking' },
      { id: 'breakeven-rules', title: '2. Kapan Boleh Menggeser SL ke BE?' },
      { id: 'runner-management', title: '3. Mengelola Sisa Posisi (Runner)' }
    ],
    sections: [
      {
        id: 'partial-taking',
        title: '1. Aturan Partial Profit Taking',
        content: `Ambil 50% profit di kolam likuiditas pertama (Internal Liquidity / EQH / EQL). Ambil 30% di HTF Key Level. Biarkan 20% runner.`
      },
      {
        id: 'breakeven-rules',
        title: '2. Kapan Boleh Menggeser SL ke BE?',
        content: `Hanya pindahkan SL ke BE setelah terbentuk BOS baru di timeframe eksekusi yang meninggalkan Order Block baru sebagai pelindung.`
      },
      {
        id: 'runner-management',
        title: '3. Mengelola Sisa Posisi (Runner)',
        content: `Kunci trailing stop di bawah swing low struktur baru hingga target makro Daily/H4 tercapai.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menggeser Stop Loss ke BE terlalu dini sebelum terbentuk BOS baru.',
        correction: 'Beri ruang napas pada order block untuk re-mitigation.'
      }
    ],
    keyTakeaways: [
      'Partial taking mengamankan modal dan menenangkan psikologis.',
      'Jangan biarkan trade yang sudah profit besar berubah menjadi kerugian total.'
    ],
    relatedTopics: [
      { slug: 'risk-management-psychology-mastery', title: 'Risk Management Mastery', category: 'Risk' }
    ],
    references: [
      { title: 'Capital Protection & Scale-Out Protocols', author: 'TLP Advisory', year: '2024' }
    ]
  }
};
