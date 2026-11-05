import { EducationalArticle } from '../../types';

export const SMC_ARTICLES: Record<string, EducationalArticle> = {
  // Master Guide SMC & ICT
  'smart-money-concepts-ict-mastery': {
    id: 'art-smc-mastery',
    slug: 'smart-money-concepts-ict-mastery',
    title: 'Smart Money Concepts & ICT: Memahami Jejak Algoritma IPDA & Likuiditas Interbank',
    category: 'Institutional Trading',
    level: 1,
    readingTimeMinutes: 24,
    difficulty: 'Intermediate',
    summary: 'Panduan kurikulum master Smart Money Concepts (SMC) dan Inner Circle Trader (ICT): algoritma lelang IPDA, perburuan likuiditas, Fair Value Gap, Order Block, Killzones waktu, dan model eksekusi Silver Bullet.',
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

> Algoritma IPDA diprogram dengan dua mandat tunggal: **Menawarkan harga pada nilai wajar (Fair Value Repricing)** dan **Menyerap likuiditas yang bertumpuk (Liquidity Run)**.`,
        callout: {
          type: 'note',
          title: 'Mandat IPDA',
          text: 'Bank sentral dan bank komersial tier-1 bertransaksi dalam volume raksasa. Mereka membutuhkan counter-party order yang cukup besar, yang sengaja dikumpulkan dari stop loss para trader retail.'
        }
      },
      {
        id: 'inducement-vs-sweep',
        title: '2. Inducement (IDM) vs. True Liquidity Sweep',
        visualType: 'liquidity_pools',
        callout: {
          type: 'warning',
          title: 'Jebakan Inducement',
          text: 'Jangan pernah memasang posisi Buy di pullback pertama sebelum level Inducement disapu oleh algoritma!'
        },
        financialExample: {
          scenario: 'EUR/USD di timeframe M15 membentuk swing high di 1.0920 lalu terkoreksi ke 1.0880 (IDM) dan memantul ke 1.0905.',
          analysis: 'Retail trader membuka posisi Buy agresif dengan SL di 1.0875. Algoritma menusuk ke 1.0865 menyapu SL retail, memantul dari Order Block di 1.0860, lalu meroket ke 1.0980.',
          outcome: 'Retail terkena Stop Out; trader SMC yang menunggu sweep IDM meraih keuntungan +115 pips dengan R:R 1:4.5.'
        },
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
        visualType: 'fvg_bpr_diagram',
        callout: {
          type: 'tip',
          title: 'Aturan 50% Consequent Encroachment',
          text: 'Jika candle retest ditutup menembus level 50% CE sebuah FVG, kemungkinan besar FVG tersebut akan terisi penuh atau bahkan gagal dipertahankan.'
        },
        financialExample: {
          scenario: 'GBP/USD H1 melesat dari 1.2650 ke 1.2780 dipicu rilis data suku bunga Bank of England, meninggalkan FVG antara 1.2690 dan 1.2730.',
          analysis: 'Titik tengah 50% CE berada tepat di 1.2710. Trader memasang limit Buy di 1.2715 dengan SL di 1.2680 (35 pips).',
          outcome: 'Harga menyentuh 1.2712 lalu memantul agresif ke 1.2840 menghasilkan profit +125 pips (R:R 1:3.5).'
        },
        content: `### Mengapa Algoritma Wajib Menutup FVG?
Fair Value Gap (FVG) adalah celah ketidaktertumpukan lelang 3 candlestick yang mencerminkan dominasi satu sisi pasar secara mutlak:
- **BISI (Buyside Imbalance Sellside Inefficiency)**: Terbentuk saat lilin bullish raksasa melesat kencang sehingga High Candle 1 tidak bertumpukan dengan Low Candle 3. Di celah tersebut, tidak ada transaksi penjualan yang difasilitasi.
- **SIBI (Sellside Imbalance Buyside Inefficiency)**: Terjadi saat lilin bearish raksasa jatuh bebas sehingga Low Candle 1 tidak bertumpukan dengan High Candle 3.
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
        visualType: 'order_block_diagram',
        callout: {
          type: 'note',
          title: 'Mean Threshold 50%',
          text: 'Mean Threshold dihitung dari 50% tinggi real body candle OB. Ini adalah garis pertahanan terakhir institusi.'
        },
        financialExample: {
          scenario: 'US Dollar Index (DXY) di H4 membentuk Bearish OB di 104.50 sebelum anjlok 120 pips menembus support.',
          analysis: 'Ketika harga terkoreksi ke 104.45 (Mean Threshold OB), muncul penolakan wick atas di M15.',
          outcome: 'Entry sell di 104.40 dengan SL di 104.60 (20 pips) menghasilkan target penurunan ke 103.40 (+100 pips, R:R 1:5).'
        },
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
        visualType: 'asian_range_judas_diagram',
        callout: {
          type: 'warning',
          title: 'Disiplin Killzone',
          text: 'Trading di luar jam Killzone memperbesar risiko terjebak whipsaw dan pelebaran spread broker hingga 3-5x lipat.'
        },
        financialExample: {
          scenario: 'Asian Range EUR/USD berkonsolidasi ketat antara 1.0820 (Low) dan 1.0850 (High).',
          analysis: 'Pukul 02:30 EST (London Open), harga menusuk ke 1.0862 (Judas Swing menyapu Asian High) lalu membentuk CHoCH M5 ke bawah.',
          outcome: 'Entry sell di FVG M5 1.0855 dengan target ke Asian Low 1.0820 menghasilkan +35 pips bersih dalam 45 menit.'
        },
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
        visualType: 'entry_protocol',
        callout: {
          type: 'tip',
          title: 'Target Harian Cukup 15 Pips',
          text: 'Model Silver Bullet tidak dirancang untuk menangkap 300 pips. Model ini adalah senjata presisi harian untuk mengamankan 15 pips secara konsisten.'
        },
        financialExample: {
          scenario: 'Pukul 10:15 AM EST pada Nasdaq (NQ), harga menyapu Liquidity High pukul 09:30 AM lalu membentuk MSS M1 ke bawah dengan FVG di 18,240.',
          analysis: 'Limit sell dipasang di 18,238 dengan SL di 18,252 (14 poin). Target Take Profit di 18,196 (42 poin).',
          outcome: 'Harga terisi rapi pada 10:18 AM dan mencapai target Take Profit pada 10:42 AM (R:R 1:3).'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'liquidity_pools',
        callout: {
          type: 'warning',
          title: 'Waspada Jebakan Pertama',
          text: 'Pullback awal pasca BOS adalah umpan institusi untuk menarik modal retail yang tidak sabaran.'
        },
        content: `### Mengapa Titik Pantulan Pertama Adalah Jebakan?
Di dalam struktur lelang pasar yang bergerak naik, harga membentuk ayunan gelombang. Pullback valid pertama yang tercipta setelah penembusan BOS disebut **Inducement (IDM)**.
- Banyak retail trader menganggap IDM sebagai garis Support baru dan menempatkan Stop Loss tepat di bawahnya.
- Algoritma IPDA sengaja menembus level IDM ini untuk menyapu seluruh stop loss retail sebelum melanjutkan ekspansi tren sejati.
- Begitu stop loss retail terpicu, tercipta gelombang pesanan jual paksa (*Sell Stop*) yang langsung dibeli dengan rakus oleh institusi pada harga diskon (*Discount Price*).`
      },
      {
        id: 'validasi-struktur',
        title: '2. Aturan Validasi Struktur Mekanis',
        visualType: 'strong_weak_levels',
        callout: {
          type: 'note',
          title: 'Aturan Mekanis Tanpa Kompromi',
          text: 'Sebelum Inducement tersapu, jangan pernah memberi label Higher High pada puncak harga saat itu.'
        },
        content: `### Rumus Struktur Mekanis Anti-Subjektivitas:
1. **Valid Higher High**: Hanya terkonfirmasi sah ketika harga telah mengambil (*swept*) titik Inducement (IDM) sebelumnya.
2. **Valid Higher Low**: Terkonfirmasi ketika harga berhasil menembus Valid Higher High sebelumnya dengan penutupan full candle body (BOS).
3. **Internal vs External Liquidity**:
   - *Internal Liquidity*: Bertumpuk di area IDM dan minor swing di dalam rentang ayunan.
   - *External Liquidity*: Bertumpuk di puncak High utama dan lembah Low utama struktur dealing range.`
      },
      {
        id: 'studi-kasus',
        title: '3. Studi Kasus Nyata EUR/USD',
        visualType: 'liquidity_sweep',
        financialExample: {
          scenario: 'EUR/USD membentuk Higher High di 1.0950, lalu terkoreksi ke 1.0910 (IDM) dan memantul ke 1.0935.',
          analysis: 'Retail trader berbondong-bondong membuka posisi Buy di 1.0930 dengan Stop Loss di 1.0905. Algoritma menekan harga ke 1.0895 untuk memicu likuiditas jual, menyentuh Order Block di 1.0890, lalu meroket.',
          outcome: 'Trader SMC yang menunggu sweep IDM meraih entri buy di 1.0892 dengan Stop Loss di 1.0875 (17 pips), mengunci Take Profit di 1.1020 (+128 pips, R:R 1:7.5).'
        },
        content: `### Skenario Lapangan:
Dalam pengujian data riil EUR/USD M15, 83% dari pullback pertama pasca penembusan BOS akan disapu bersih oleh algoritma dalam 12 bar berikutnya. Menunggu sapuan IDM adalah cara paling efektif untuk menyaring setup palsu.`
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
      'Sebuah Higher High belum sah sebelum harga menyapu Inducement.',
      'Sabar menunggu sapuan likuiditas meningkatkan win-rate sistem secara drastis.'
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
    readingTimeMinutes: 15,
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
        visualType: 'fvg_bpr_diagram',
        callout: {
          type: 'note',
          title: '3-Candle Imbalance',
          text: 'FVG hanya sah jika Candle 2 memiliki ukuran badan lilin lebar (displacement) dan tidak ada tumpang tindih antara wick Candle 1 dan Candle 3.'
        },
        content: `### Tiga Elemen Wajib FVG:
1. **Candle 1**: Lilin pembuka yang menetapkan batas rentang awal.
2. **Candle 2**: Lilin impulsif berukuran masif (*displacement bar*) yang digerakkan oleh aliran dana institusional.
3. **Candle 3**: Lilin penutup di mana sumbunya tidak bertumpukan dengan Candle 1, meninggalkan celah kosong lelang.`
      },
      {
        id: 'consequent-encroachment',
        title: '2. Aturan Consequent Encroachment (50%)',
        callout: {
          type: 'tip',
          title: 'Eksekusi di Level 50%',
          text: 'Memasang limit order pada level 50% CE memberikan Stop Loss yang lebih kecil dibandingkan memasang order di awal celah FVG.'
        },
        content: `### Titik Keseimbangan Matematis
Consequent Encroachment (CE) adalah titik tengah 50% dari FVG. Jika saat retest candle hanya menyentuh CE dan segera ditutup dengan sumbu penolakan, ini adalah konfirmasi bahwa institusi telah selesai mengisi pesanan mereka dan siap melanjutkan arah dominan.`
      },
      {
        id: 'bpr-magnet',
        title: '3. Balanced Price Range (BPR)',
        financialExample: {
          scenario: 'Emas (XAU/USD) di M15 naik kencang membentuk Bullish FVG di $2,310 - $2,320. Tiga jam kemudian, rilis berita NFP menembus turun area tersebut dengan Bearish FVG di $2,308 - $2,322.',
          analysis: 'Dua FVG berlawanan yang bertumpukan menciptakan Balanced Price Range super kuat di rentang $2,310 - $2,320.',
          outcome: 'Saat harga terkoreksi naik ke $2,318, trader membuka posisi Sell dengan SL di $2,325. Emas terjun bebas ke $2,275 (+430 pips).'
        },
        content: `### Super Magnet Harga
Balanced Price Range (BPR) terjadi ketika FVG Bullish ditembus kembali oleh FVG Bearish yang bertumpukan di area yang sama. Area ini menjadi zona support/resistance institusi dengan akurasi sangat tinggi karena lelang telah difasilitasi di kedua sisi secara agresif.`
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
      'Level 50% CE sering kali menjadi batas pantulan presisi algoritma.',
      'BPR adalah perpaduan dua FVG berlawanan yang memberikan reaksi paling eksplosif.'
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
    readingTimeMinutes: 15,
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
        visualType: 'order_block_diagram',
        callout: {
          type: 'warning',
          title: 'Bukan Sekadar Warna Berlawanan',
          text: 'Sebuah candle berlawanan BUKAN Order Block jika tidak melakukan liquidity sweep dan tidak memicu FVG di depannya.'
        },
        content: `### 3 Syarat Mutlak High-Probability OB:
1. Candle tersebut harus menyapu likuiditas (*liquidity sweep*) dari swing sebelumnya.
2. Candle berikutnya wajib bergerak impulsif memecahkan struktur (*MSS / BOS*).
3. Harus meninggalkan Fair Value Gap (FVG) yang belum tersentuh di depannya.`
      },
      {
        id: 'mean-threshold',
        title: '2. Mean Threshold (50% Body)',
        callout: {
          type: 'tip',
          title: 'Toleransi Maksimal',
          text: 'Jika body candle penutupan menembus Mean Threshold, OB tersebut langsung dianggap cacat.'
        },
        content: `### Level Toleransi Maksimal
Mean Threshold (MT) adalah titik 50% dari body candle Order Block. Jika harga melakukan pullback dan candle ditutup melewati MT, maka OB tersebut dinyatakan gagal (*invalidated*).`
      },
      {
        id: 'protokol-entry',
        title: '3. Protokol Entry Limit Order',
        financialExample: {
          scenario: 'GBP/USD H1 membentuk Bullish OB di 1.2580 - 1.2610 setelah menyapu Asian Low dan memecahkan swing high H1.',
          analysis: 'Mean Threshold 50% berada di 1.2595. Trader memasang Buy Limit di 1.2595 dengan Stop Loss di 1.2575 (20 pips).',
          outcome: 'Harga menyentuh 1.2592 lalu melesat kencang menuju 1.2740, memberikan profit +145 pips dengan R:R 1:7.25.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'bos_choch',
        callout: {
          type: 'note',
          title: 'Mitigasi Posisi Impas Institusi',
          text: 'Institusi yang sempat membuka posisi berlawanan saat menyapu likuiditas akan menutup order floating loss mereka pada Breakeven saat harga kembali ke Breaker.'
        },
        content: `### Order Block Gagal yang Berbalik Fungsi
Breaker Block adalah Order Block yang gagal menahan harga setelah sebelumnya memicu sweep likuiditas. Ketika ditembus dengan displacement kuat, bank menutup posisi floating loss mereka pada retest pertama (*first touch*), memicu reaksi kuat ke arah tren baru.`
      },
      {
        id: 'mitigation-block',
        title: '2. Perbedaan dengan Mitigation Block',
        callout: {
          type: 'warning',
          title: 'Kunci Pembeda: Liquidity Sweep',
          text: 'Tanpa sweep likuiditas, pola tersebut hanya Mitigation Block biasa dengan probabilitas keberhasilan lebih rendah daripada Breaker Block.'
        },
        content: `### Perbedaan Krusial:
- **Breaker Block**: Terbentuk dengan adanya sapuan likuiditas (*Liquidity Sweep*). Paling kuat dan memiliki rasio kemenangan tinggi.
- **Mitigation Block**: Terbentuk ketika harga gagal menyapu level ekstrim sebelumnya (*Failure Swing / Lower High*).`
      },
      {
        id: 'eksekusi-bb',
        title: '3. Eksekusi Pada First Touch',
        financialExample: {
          scenario: 'AUD/USD H1 menyapu level resistance 0.6620 lalu runtuh drastis menembus swing low terakhir di 0.6550, mengubah Bullish OB di 0.6580 menjadi Bearish Breaker Block.',
          analysis: 'Trader memasang Limit Sell tepat pada retest pertama di 0.6580 dengan SL di 0.6605 (25 pips).',
          outcome: 'Harga menyentuh 0.6582 lalu terdorong jatuh ke 0.6480 menghasilkan keuntungan +100 pips (R:R 1:4).'
        },
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
    readingTimeMinutes: 13,
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
        callout: {
          type: 'note',
          title: 'Wick Overlap, No Body',
          text: 'Volume Imbalance terjadi ketika body candle tidak bertemu, namun sumbunya saling bersentuhan.'
        },
        content: `Volume Imbalance terjadi ketika body candle satu tidak bertumpukan dengan body candle berikutnya, namun sumbunya saling bertumpukan. Ini mencerminkan ketiadaan volume body pada level harga tersebut.`
      },
      {
        id: 'liquidity-void',
        title: '2. Dinamika Liquidity Void',
        visualType: 'fvg_bpr_diagram',
        callout: {
          type: 'tip',
          title: 'Magnet Penyeimbang',
          text: 'Void yang ditinggalkan oleh lonjakan berita akan selalu bertindak sebagai sasaran Take Profit utama karena IPDA diprogram untuk menyeimbangkan kembali volume yang kosong.'
        },
        content: `Lompatan harga tajam yang dipicu rilis berita berdampak tinggi. Algoritma diprogram untuk kembali menutup celah ini (*Rebalancing*) sebelum melanjutkan pergerakan tren makro.`
      },
      {
        id: 'strategi-pengisian',
        title: '3. Strategi Pengisian Celah',
        financialExample: {
          scenario: 'Rilis data CPI AS memicu penurunan vertikal 250 poin pada S&P 500 futures dalam 5 menit, meninggalkan Liquidity Void antara 5,120 dan 5,060.',
          analysis: 'Dua hari kemudian harga membentuk swing low dan berbalik naik. Trader menargetkan batas atas void di 5,120 sebagai target Take Profit.',
          outcome: 'Pasar mengisi void persis hingga 5,122 sebelum kembali berputar turun, memberikan profit penuh pada posisi buy koreksi.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'asian_range_judas_diagram',
        callout: {
          type: 'note',
          title: 'Batasan Jam Asia',
          text: 'Tandai titik High dan Low yang terbentuk antara pukul 20:00 hingga 00:00 EST (07:00 - 11:00 WIB). Rentang optimal adalah 20-30 pips.'
        },
        content: `Rentang sesi Tokyo (20:00 - 00:00 EST) mengumpulkan kolam likuiditas Buy-Side di atas Asian High dan Sell-Side di bawah Asian Low.`
      },
      {
        id: 'anatomi-judas',
        title: '2. Anatomi Judas Swing',
        callout: {
          type: 'warning',
          title: 'Jebakan Breakout Pagi London',
          text: 'Lonjakan harga 15-25 pips menembus Asian Range antara pukul 02:00 - 03:00 EST adalah manipulasi Judas Swing murni.'
        },
        content: `Tepat pukul 02:00 - 03:00 EST saat London dibuka, algoritma mendorong harga menembus Asian High/Low untuk memicu breakout trader dan menyapu stop loss, sebelum langsung berbalik arah menciptakan tren harian sejati.`
      },
      {
        id: 'protokol-london',
        title: '3. Protokol Eksekusi London Open',
        financialExample: {
          scenario: 'EUR/USD Asian Range: High 1.0860, Low 1.0835 (25 pips). Pukul 02:15 EST harga meroket ke 1.0878 (sapuan likuiditas atas).',
          analysis: 'Di M5 terbentuk bearish CHoCH pada 1.0858 dengan FVG di 1.0865. Trader memasang sell limit di 1.0865 dengan SL di 1.0882 (17 pips).',
          outcome: 'Harga turun tajam menyapu Asian Low di 1.0835 dan berlanjut ke 1.0780 (+85 pips, R:R 1:5).'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'asian_range_judas_diagram',
        callout: {
          type: 'note',
          title: 'Waktu New York (EST) Sebagai Acuan',
          text: 'Gunakan jam EST/EDT New York pada platform charting TradingView Anda untuk menjaga akurasi jendela algoritma.'
        },
        content: `London Killzone: 02:00 - 05:00 EST. New York Open Killzone: 07:00 - 10:00 EST. London Close: 10:00 - 12:00 EST.

| Sesi | Jam EST | Jam WIB | Target Pasangan Utama |
| :--- | :--- | :--- | :--- |
| **Asian Session** | 20:00 - 00:00 | 07:00 - 11:00 | AUD, NZD, JPY |
| **London Open** | 02:00 - 05:00 | 13:00 - 16:00 | EUR, GBP, CHF |
| **New York Open** | 07:00 - 10:00 | 18:00 - 21:00 | USD Pairs, Gold, S&P 500, NQ |
| **London Close** | 10:00 - 12:00 | 21:00 - 23:00 | Retracement & Silver Bullet |`
      },
      {
        id: 'karakteristik-sesi',
        title: '2. Karakteristik Sesi London vs NY',
        content: `London sering membentuk titik High atau Low of the Day (70% probabilitas pada EUR/USD dan GBP/USD). Sesi New York memperluas tren tersebut atau membalikkan arah saat rilis berita besar seperti CPI, FOMC, atau NFP.`
      },
      {
        id: 'disiplin-waktu',
        title: '3. Aturan Disiplin Waktu',
        financialExample: {
          scenario: 'Trader menunggu setup EUR/USD di luar sesi Killzone pada pukul 12:00 EST (tengah hari New York).',
          analysis: 'Pasar memasuki fase lunch-hour konsolidasi dengan likuiditas kering dan spread melebar.',
          outcome: 'Posisi terkena whipsaw berulang kali; trader profesional memilih libur dan hanya trading di jam Killzone aktif.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'amd_power_of_3_diagram',
        callout: {
          type: 'note',
          title: 'Anatomi Candle Harian',
          text: 'Setiap candlestick harian bullish terdiri dari Open, pergerakan turun membentuk sumbu bawah (Manipulasi), reli ekspansi tubuh candle (Distribusi), dan Close.'
        },
        content: `Accumulation (Open harga), Manipulation (pembentukan sumbu harian di arah berlawanan), dan Distribution (pergerakan tren utama ke arah sasaran).`
      },
      {
        id: 'midnight-open',
        title: '2. Peran NY Midnight Open (00:00 EST)',
        callout: {
          type: 'tip',
          title: 'Garis Ekuilibrium Harian',
          text: 'Jika daily bias Anda bullish, carilah entri HANYA ketika harga berada di bawah harga Midnight Open (diskon harian).'
        },
        content: `Garis harga pembukaan tengah malam New York menjadi garis batas sakral: beli di bawah Midnight Open untuk hari bullish; jual di atas Midnight Open untuk hari bearish.`
      },
      {
        id: 'daily-bias',
        title: '3. Menentukan Daily Bias Objektif',
        financialExample: {
          scenario: 'Daily chart DXY (Dollar Index) memantul dari Bullish Order Block dan mengincar FVG di 105.20. Daily bias USD adalah Bullish.',
          analysis: 'Pada EUR/USD, bias harian otomatis Bearish. Pukul 00:00 EST, Midnight Open tercatat di 1.0850. Pukul 02:30 EST harga didorong naik ke 1.0870 (manipulasi di atas Midnight Open).',
          outcome: 'Trader mengeksekusi Sell di 1.0868 dengan target penutupan harian di 1.0790 (+78 pips).'
        },
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
    readingTimeMinutes: 15,
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
        visualType: 'smt_divergence_diagram',
        callout: {
          type: 'tip',
          title: 'Petunjuk Ketidaksesuaian',
          text: 'Ketika EUR/USD mencetak Higher High namun GBP/USD gagal mencetak Higher High (Lower High), Smart Money sedang menyuntikkan pesanan jual masif pada pasangan yang lebih lemah.'
        },
        content: `Ketika dua aset yang berkorelasi 90% gagal mencetak struktur yang sinkron (misal satu membuat Higher High, yang lain membentuk Lower High), ini adalah bukti mutlak adanya manipulasi institusi.`
      },
      {
        id: 'korelasi-aset',
        title: '2. Pasangan Aset Berkorelasi',
        content: `Pasangan korelasi utama: EUR/USD vs GBP/USD, S&P 500 (ES) vs Nasdaq (NQ), DXY vs Pasar Ekuitas/Valas mayor.`
      },
      {
        id: 'filter-eksekusi',
        title: '3. SMT Sebagai Filter Eksekusi',
        financialExample: {
          scenario: 'Pada sesi New York, EUR/USD menusuk resistance dan mencetak Higher High di 1.0925. Pada saat yang persis sama, GBP/USD tertahan dan mencetak Lower High di 1.2740 (SMT Bearish).',
          analysis: 'Ketidakmampuan GBP/USD mengonfirmasi level pucuk EUR/USD menandakan Buyer institusi sudah tidak mendanai kenaikan harga.',
          outcome: 'Trader mengambil posisi Short pada GBP/USD (aset yang lebih lemah). Dalam 2 jam, GBP/USD anjlok 95 pips sementara EUR/USD turun 60 pips.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'premium_discount',
        callout: {
          type: 'note',
          title: 'Definisi Dealing Range',
          text: 'Tarik Fibonacci 0% - 100% dari swing low struktural ke swing high struktural yang bertanggung jawab atas ekspansi saat ini.'
        },
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
        financialExample: {
          scenario: 'Dealing Range GBP/USD H4 berada antara 1.2500 (Low 0%) dan 1.2800 (High 100%). Ekuilibrium 50% berada di 1.2650.',
          analysis: 'Harga sedang berada di 1.2720 (Zona Premium). Muncul FVG Bullish di M15.',
          outcome: 'Trader disiplin menolak membuka Buy di zona Premium. Harga berbalik turun ke 1.2580 (Zona Diskon 26%), memvalidasi aturan bahwa Buy hanya boleh dieksekusi di bawah 50%.'
        },
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
    readingTimeMinutes: 16,
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
        visualType: 'entry_protocol',
        callout: {
          type: 'note',
          title: '3 Jendela Silver Bullet Resmi',
          text: '1. London Pagi: 03:00 - 04:00 AM EST\n2. New York Pagi: 10:00 - 11:00 AM EST\n3. New York Siang: 02:00 - 03:00 PM EST'
        },
        content: `Silver Bullet NY Pagi: 10:00 AM - 11:00 AM EST. Pada jendela ini, algoritma selalu mengirimkan minimal 1 setup FVG bertenaga tinggi.`
      },
      {
        id: 'sop-eksekusi',
        title: '2. SOP 4 Langkah Eksekusi',
        callout: {
          type: 'tip',
          title: 'Checklist Ketat',
          text: 'Jangan pernah mengejar harga. Pasang Limit Order di FVG dengan SL di atas/bawah swing pembalik MSS.'
        },
        content: `1. Sapuan likuiditas -> 2. Market Structure Shift (MSS) di M1/M5 -> 3. Identifikasi FVG -> 4. Pasang limit order pada FVG.`
      },
      {
        id: 'target-profit',
        title: '3. Target Profit Objektif',
        financialExample: {
          scenario: 'Pukul 10:08 AM EST pada S&P 500 futures (ES), harga menyapu likuiditas pembukaan 09:30 AM di 5,145 lalu membentuk Bearish MSS di M1.',
          analysis: 'Terbentuk FVG M1 di 5,141 - 5,143. Limit sell dipasang di 5,141.50 dengan SL di 5,145.50 (4 poin). Target TP di 5,129.50 (12 poin).',
          outcome: 'Order terisi pada 10:12 AM dan menyentuh target TP pada 10:34 AM, menghasilkan profit bersih 12 poin ($600 per kontrak) dengan R:R 1:3.'
        },
        content: `Target realistis 10 - 15 pips / points (atau 2R - 3R) tanpa serakah.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengeksekusi model Silver Bullet di luar jam 10:00 - 11:00 AM EST.',
        correction: 'Kunci model ini adalah faktor waktu lelang antarabank yang tepat.'
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
    readingTimeMinutes: 14,
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
        visualType: 'risk_reward_calc',
        callout: {
          type: 'note',
          title: 'Mengunci Kemenangan',
          text: 'Mengambil 50% profit pada likuiditas terdekat mengubah trade Anda menjadi posisi bebas risiko psikologis secara instan.'
        },
        content: `Ambil 50% profit di kolam likuiditas pertama (Internal Liquidity / EQH / EQL). Ambil 30% di HTF Key Level. Biarkan 20% runner.`
      },
      {
        id: 'breakeven-rules',
        title: '2. Kapan Boleh Menggeser SL ke BE?',
        callout: {
          type: 'warning',
          title: 'Jangan Terburu-buru Geser BE',
          text: 'Banyak trader menggeser SL ke BE seketika saat floating profit +5 pips, hanya untuk terkena sumbu re-mitigation lalu harga terbang ke target.'
        },
        content: `Hanya pindahkan SL ke BE setelah terbentuk BOS baru di timeframe eksekusi yang meninggalkan Order Block baru sebagai pelindung.`
      },
      {
        id: 'runner-management',
        title: '3. Mengelola Sisa Posisi (Runner)',
        financialExample: {
          scenario: 'Posisi Buy EUR/USD 2 lot dibuka di 1.0820. Target 1 (1.0870) tercapai (+50 pips).',
          analysis: 'Trader menutup 1 lot (+ $500), memindahkan SL sisa 1 lot ke 1.0825 (Lock in +5 pips profit), dan membiarkan runner mengincar target Daily di 1.0990.',
          outcome: 'Ketika harga mencapai 1.0980, runner menghasilkan tambahan +$1,600, total profit posisi menjadi +$2,100 tanpa stres.'
        },
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
