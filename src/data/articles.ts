import { EducationalArticle } from '../types';

export const EDUCATIONAL_ARTICLES: Record<string, EducationalArticle> = {
  'candlestick-anatomy-wick-dynamics': {
    id: 'art-candlestick-anatomy',
    nodeId: 'node-1-1',
    slug: 'candlestick-anatomy-wick-dynamics',
    title: 'Anatomi Candlestick & Dinamika Sumbu (Wick)',
    category: 'Price Action & Auction Theory',
    level: 1,
    readingTimeMinutes: 8,
    difficulty: 'Beginner',
    summary: 'Memahami bagaimana batang lilin merepresentasikan hasil lelang dua arah (Auction Market Theory), bukan sekadar pola hafalan visual.',
    prerequisites: ['Dasar Bid-Ask Spread', 'Mekanisme Order Pasar'],
    tableOfContents: [
      { id: 'auction-market-basis', title: '1. Pasar Finansial Sebagai Mekanisme Lelang' },
      { id: 'four-data-points', title: '2. Empat Titik Data: OHLC dan Makna Sebenarnya' },
      { id: 'body-vs-wick', title: '3. Dinamika Body vs. Sumbu (Wick Rejection)' },
      { id: 'absorption-physics', title: '4. Fisika Penyerapan Likuiditas (Absorption)' },
      { id: 'common-traps', title: '5. Kesalahan Fatal Trader Pemula' },
      { id: 'key-takeaways', title: '6. Rangkuman & Prinsip Eksekusi' }
    ],
    sections: [
      {
        id: 'auction-market-basis',
        title: '1. Pasar Finansial Sebagai Mekanisme Lelang',
        content: `Candlestick pertama kali diformulasikan oleh Munehisa Homma pada abad ke-18 di bursa beras Dojima di Osaka, Jepang. Meskipun sering diajarkan sebagai pola visual statis (seperti Doji, Hammer, atau Shooting Star), fungsi fundamental dari candlestick adalah mendokumentasikan hasil pertarungan lelang dua arah dalam kurun waktu tertentu.

Setiap instrumen finansial digerakkan oleh satu hukum tak terbantahkan: **Harga bergerak mencari likuiditas**. Ketika pembeli lebih agresif daripada penjual pada harga tertentu, harga terdorong ke atas hingga mencapai titik di mana penjual bersedia masuk kembali untuk menyeimbangkan penawaran. Candlestick mencatat histori lelang ini secara presisi.`,
        callout: {
          type: 'note',
          title: 'Prinsip Auction Market Theory',
          text: 'Tujuan pasar bukan menghasilkan pola grafik yang indah, melainkan memfasilitasi transaksi antara pembeli dan penjual secara efisien pada harga kesepakatan (fair value).'
        }
      },
      {
        id: 'four-data-points',
        title: '2. Empat Titik Data: OHLC dan Makna Sebenarnya',
        content: `Setiap candle memuat empat data krusial:
1. **Open (O)**: Titik tolak harga saat sesi dimulai. Merupakan ekspektasi awal pelaku pasar.
2. **High (H)**: Titik tertinggi di mana pembeli bersedia menawar sebelum penawaran habis atau penjual membanjiri pasar.
3. **Low (L)**: Titik terendah di mana penjual bersedia melepas sebelum pembeli agresif menganggap harga terlalu murah (undervalued).
4. **Close (C)**: Data paling objektif dan krusial dalam analisis teknikal. Close menunjukkan pihak mana yang secara sah memenangkan lelang pada penutupan sesi.

Banyak trader pemula melakukan kesalahan fatal dengan mengambil keputusan saat candlestick masih berjalan (unclosed candle). Padahal, sumbu panjang ke bawah bisa seketika berbalik menjadi full body bearish sebelum candle resmi ditutup.`,
        financialExample: {
          scenario: 'Sesi H4 EUR/USD membentuk sumbu bawah panjang saat menit ke-15, namun berita NFP dirilis pada menit ke-45.',
          analysis: 'Trader retail yang tergesa-gesa melakukan Buy saat candle masih aktif karena melihat "rejection pin bar". Pada menit ke-50, penjual institusional membanjiri pasar hingga candle ditutup sebagai strong bearish candle menembus titik Low sebelumnya.',
          outcome: 'Stop loss trader retail tersapu bersih karena bertindak atas probabilitas semu sebelum konfirmasi titik Close.'
        }
      },
      {
        id: 'body-vs-wick',
        title: '3. Dinamika Body vs. Sumbu (Wick Rejection)',
        content: `Rasio antara ukuran tubuh (Body) dan sumbu (Wick) menyampaikan volume komitmen:
- **Large Body, Short Wicks**: Mengindikasikan *Unidirectional Conviction* (keyakinan arah satu sisi). Satu kubu memegang kendali penuh tanpa perlawanan signifikan.
- **Small Body, Long Opposing Wick**: Mengindikasikan *Failed Auction* atau penolakan harga (Rejection). Harga mencoba menembus level baru, namun langsung direspons oleh pesanan batas (limit orders) berlawanan dengan volume lebih besar.
- **Narrow Range, Centered Body (Doji)**: Merepresentasikan ekuilibrium sesaat (Price Equilibrium). Bukan berarti pembalikan tren pasti terjadi, melainkan pasar sedang menanti likuiditas baru sebelum ekspansi berikutnya.`,
        visualType: 'candlestick_anatomy'
      },
      {
        id: 'absorption-physics',
        title: '4. Fisika Penyerapan Likuiditas (Absorption)',
        content: `Ketika sumbu atas yang panjang terbentuk pada area resistensi, apa yang sesungguhnya terjadi di balik layar (Order Book)?
Pembeli agresif (market buy orders) mendorong harga naik melampaui level psikologis. Di area tersebut, institusi atau penyedia likuiditas telah meletakkan tumpukan pesanan jual pasif (*iceberg sell limit orders*). 

Semua pesanan beli pasar terserap habis oleh pesanan jual pasif tersebut. Begitu daya beli retail habis, sedikit saja pesanan jual pasar dapat menjatuhkan harga kembali ke bawah, meninggalkan sumbu panjang ke atas (*Upper Shadow*). Inilah anatomi penyerapan likuiditas.`,
        callout: {
          type: 'tip',
          title: 'Aturan Wick Trading',
          text: 'Sumbu (wick) adalah jejak likuiditas. Di mana ada sumbu panjang pada timeframe tinggi (Daily/H4), di situ ada pertarungan volume institusional yang patut dijadikan acuan zona mitigasi masa depan.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengambil posisi sebelum candlestick resmi ditutup (Closed).',
        correction: 'Tunggu selalu candle Close pada timeframe acuan Anda sebelum mengeksekusi order validasi.'
      },
      {
        mistake: 'Menganggap Doji selalu menandakan pembalikan tren (reversal).',
        correction: 'Doji hanya menandakan jeda/keseimbangan. Di pasar bertren kuat, Doji seringkali merupakan konsolidasi minor sebelum kelanjutan tren.'
      },
      {
        mistake: 'Menganalisis candlestick secara terisolasi tanpa melihat struktur pasar di kirinya.',
        correction: 'Candlestick adalah kata, struktur pasar adalah kalimat. Pola lilin hanya valid bila muncul di level struktur atau likuiditas yang tepat.'
      }
    ],
    keyTakeaways: [
      'Titik penutupan (Close) adalah satu-satunya data konfirmasi lelang yang sah.',
      'Sumbu (wick) merepresentasikan penolakan harga dan penyerapan likuiditas oleh pesanan berlawanan.',
      'Kekuatan suatu candle ditentukan oleh rasio body-to-wick dan lokasinya terhadap struktur pasar.',
      'Hindari menghafal nama-nama pola lilin; pahami logika lelang di balik terbentuknya formasi harga tersebut.'
    ],
    relatedTopics: [
      { slug: 'support-resistance-liquidity', title: 'Support, Resistance & Kolam Likuiditas', category: 'Market Dynamics' },
      { slug: 'market-structure-bos-choch', title: 'Struktur Pasar: BOS & CHoCH', category: 'Structure' },
      { slug: 'supply-demand-order-blocks', title: 'Order Blocks & Supply-Demand', category: 'Institutional' }
    ],
    references: [
      { title: 'Japanese Candlestick Charting Techniques', author: 'Steve Nison', year: '1991' },
      { title: 'Mind Over Markets: Power Trading with Market Generated Information', author: 'James F. Dalton', year: '1990' },
      { title: 'Trading in the Zone', author: 'Mark Douglas', year: '2000' }
    ]
  },

  'support-resistance-liquidity': {
    id: 'art-support-resistance',
    nodeId: 'node-1-2',
    slug: 'support-resistance-liquidity',
    title: 'Support, Resistance & Kolam Likuiditas (Liquidity Pools)',
    category: 'Market Dynamics',
    level: 1,
    readingTimeMinutes: 10,
    difficulty: 'Beginner',
    summary: 'Mengapa garis horizontal konvensional kerap gagal dan bagaimana memahami Support/Resistance sebagai kolam likuiditas BSL dan SSL.',
    prerequisites: ['candlestick-anatomy-wick-dynamics'],
    tableOfContents: [
      { id: 'flaw-of-lines', title: '1. Mengapa Garis Tunggal Menjebak Retail' },
      { id: 'liquidity-pools-defined', title: '2. Anatomi Kolam Likuiditas: BSL dan SSL' },
      { id: 'false-breakouts-mechanics', title: '3. Mekanisme False Breakout (Liquidity Sweeps)' },
      { id: 'zone-identification', title: '4. Cara Menentukan Zona Nilai Objektif' },
      { id: 'common-mistakes', title: '5. Kesalahan Analisis Umum' },
      { id: 'key-takeaways', title: '6. Rangkuman & Pedoman' }
    ],
    sections: [
      {
        id: 'flaw-of-lines',
        title: '1. Mengapa Garis Tunggal Menjebak Retail',
        content: `Buku-buku analisis teknikal konvensional mengajarkan bahwa Support adalah garis horizontal tempat harga memantul ke atas, dan Resistance adalah garis tempat harga memantul ke bawah. Pendekatan garis tipis ini mengandung kelemahan fatal: **Pasar tidak beroperasi pada harga eksak tunggal, melainkan pada zona likuiditas.**

Ketika jutaan trader retail menarik garis yang sama persis pada grafik, apa yang terjadi? Mereka semua meletakkan Stop Loss beberapa pip di luar garis tersebut. Bagi pemain bermodal raksasa (smart money), kumpulan Stop Loss tersebut bukan sekadar angka risiko, melainkan **likuiditas bahan bakar** yang sangat mereka butuhkan untuk mengisi pesanan jutaan dolar mereka tanpa mengalami slippage besar.`,
        callout: {
          type: 'warning',
          title: 'Fakta Likuiditas',
          text: 'Di mana mayoritas trader retail meletakkan Stop Loss mereka, di situlah institusi menemukan likuiditas paling melimpah untuk mengeksekusi posisi mereka.'
        }
      },
      {
        id: 'liquidity-pools-defined',
        title: '2. Anatomi Kolam Likuiditas: BSL dan SSL',
        content: `Dalam konsep pasar modern, kita mengklasifikasikan kolam likuiditas menjadi dua:
1. **Buy-Side Liquidity (BSL)**:
   - Terletak di atas swing high atau resistance yang jelas.
   - Terdiri dari Stop Loss para penjual (yang merupakan order Beli Pasar / Buy Stop) dan order Buy Stop para breakout trader.
   - Institusi memanfaatkan BSL untuk menjual (mengekstrak keuntungan atau membuka short raksasa) kepada pembeli yang panik mengejar breakout.

2. **Sell-Side Liquidity (SSL)**:
   - Terletak di bawah swing low atau support yang jelas.
   - Terdiri dari Stop Loss para pembeli (yang merupakan order Jual Pasar / Sell Stop) dan order Sell Stop para breakdown trader.
   - Institusi memanfaatkan SSL untuk membeli murah dari penjual retail yang dipaksa cut loss.`,
        visualType: 'support_resistance'
      },
      {
        id: 'false-breakouts-mechanics',
        title: '3. Mekanisme False Breakout (Liquidity Sweeps)',
        content: `Pernahkah Anda menyaksikan harga menembus Resistance secara eksplosif, Anda segera melakukan Buy, namun dalam hitungan menit candle berbalik arah meninggalkan sumbu panjang ke atas dan menukik tajam?

Ini bukan kebetulan atau "broker mencurangi Anda". Fenomena ini disebut **Liquidity Sweep** (Pembersihan Likuiditas) atau Turtle Soup. Algoritma institusional dengan sengaja mendorong harga melintasi level kunci untuk memicu Stop Loss pembeli dan menarik pembeli breakout. Begitu kolam BSL terisi penuh ke dalam order jual institusi, harga runtuh seketika karena tidak ada lagi sisa pembeli pasar.`,
        financialExample: {
          scenario: 'Emas (XAU/USD) menguji resistance psikologis $2,650 sebanyak 3 kali berturut-turut.',
          analysis: 'Pada sentuhan ke-4, harga melesat ke $2,654, memicu semua Buy Stop retail. Volume melonjak drastis, namun candle H1 ditutup kembali di $2,646 dengan wick setinggi $8.',
          outcome: 'Breakout retail terjebak di pucuk ($2,652-$2,654) dan terlikuidasi saat harga anjlok ke $2,620.'
        }
      },
      {
        id: 'zone-identification',
        title: '4. Cara Menentukan Zona Nilai Objektif',
        content: `Untuk memetakan Support dan Resistance dengan presisi institusional:
1. **Gunakan Area (Zona), Bukan Garis**: Tarik rentang antara ujung sumbu (wick) hingga penutupan body candle pada swing high/low yang signifikan.
2. **Prioritaskan Higher Timeframe (HTF)**: Zona pada timeframe Daily dan H4 memiliki bobot volume 100 kali lebih besar daripada M5 atau M15.
3. **Cari Level yang Belum Pernah Disapu (Unmitigated)**: Level yang sudah berkali-kali disentuh justru rapuh dan rawan ditembus, bukan semakin kuat.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap semakin sering level disentuh, semakin kuat level tersebut.',
        correction: 'Setiap sentuhan memakan pesanan limit yang tersedia. Sentuhan ke-4 atau ke-5 biasanya menjadi target pembersihan (liquidity purge).'
      },
      {
        mistake: 'Menaruh Stop Loss tepat 2-3 pip di bawah garis support.',
        correction: 'Berikan ruang toleransi di luar kolam likuiditas terdekat, atau tunggu sweep terjadi sebelum masuk pasar.'
      }
    ],
    keyTakeaways: [
      'Support dan Resistance adalah zona likuiditas, bukan garis kaku magis.',
      'BSL berada di atas Swing High; SSL berada di bawah Swing Low.',
      'Waspadai ekspansi tajam yang gagal bertahan di atas resistance sebagai potensi liquidity sweep.',
      'Selalu utamakan zona berbasis timeframe tinggi untuk menentukan bias arah pasar.'
    ],
    relatedTopics: [
      { slug: 'market-structure-bos-choch', title: 'Struktur Pasar: BOS & CHoCH', category: 'Structure' },
      { slug: 'fair-value-gaps-imbalance', title: 'Fair Value Gaps & Ketidakseimbangan', category: 'Institutional' }
    ],
    references: [
      { title: 'Technical Analysis of the Financial Markets', author: 'John J. Murphy', year: '1999' },
      { title: 'Reminiscences of a Stock Operator', author: 'Edwin Lefèvre', year: '1923' }
    ]
  },

  'market-structure-bos-choch': {
    id: 'art-market-structure',
    nodeId: 'node-1-4',
    slug: 'market-structure-bos-choch',
    title: 'Struktur Pasar: Break of Structure (BOS) vs. Change of Character (CHoCH)',
    category: 'Market Structure',
    level: 2,
    readingTimeMinutes: 12,
    difficulty: 'Intermediate',
    summary: 'Fondasi membaca tren struktural objektif: membedakan kelanjutan tren (BOS) dari sinyal awal pembalikan struktural (CHoCH).',
    prerequisites: ['candlestick-anatomy-wick-dynamics', 'support-resistance-liquidity'],
    tableOfContents: [
      { id: 'dow-theory-modern', title: '1. Teori Dow dalam Konteks Algoritma Modern' },
      { id: 'defining-swings', title: '2. Cara Menentukan Titik Swing High dan Low yang Valid' },
      { id: 'bos-break-of-structure', title: '3. Break of Structure (BOS): Kelanjutan Tren' },
      { id: 'choch-change-of-character', title: '4. Change of Character (CHoCH): Sinyal Transisi' },
      { id: 'body-vs-wick-break', title: '5. Aturan Konfirmasi: Body Close vs. Wick Breach' },
      { id: 'key-takeaways', title: '6. Rangkuman & Ringkasan Alur' }
    ],
    sections: [
      {
        id: 'dow-theory-modern',
        title: '1. Teori Dow dalam Konteks Algoritma Modern',
        content: `Prinsip dasar tren pasar dirumuskan lebih dari seabad lalu oleh Charles Dow:
- **Uptrend**: Terbentuknya Higher Highs (HH) dan Higher Lows (HL) secara konsisten.
- **Downtrend**: Terbentuknya Lower Lows (LL) dan Lower Highs (LH) secara konsisten.

Namun dalam algoritma pengiriman harga institusional modern (seperti IPDA), kita tidak mengandalkan perkiraan kasual. Kita membutuhkan aturan mekanis dan objektif untuk menentukan kapan sebuah tren secara sah berlanjut, dan kapan tren tersebut kehilangan kendali strukturalnya.`,
        callout: {
          type: 'note',
          title: 'Definisi Struktur Mekanis',
          text: 'Sebuah Swing Low hanya diakui sah jika berhasil menghasilkan Swing High baru yang menembus titik tertinggi sebelumnya.'
        }
      },
      {
        id: 'defining-swings',
        title: '2. Cara Menentukan Titik Swing High dan Low yang Valid',
        content: `Banyak trader bingung membedakan antara pergerakan harga minor (*noise/internal structure*) dengan struktur utama (*swing structure*).
- **Valid Swing High**: Formasi minimal 3 lilin di mana lilin tengah memiliki titik tertinggi yang diapit oleh lilin kiri dan lilin kanan yang titik tertingginya lebih rendah.
- **Protected Low / Strong Low**: Titik terendah yang berhasil memicu pemecahan struktur ke atas. Jika titik ini jebol, bias bullish batal.
- **Target High / Weak High**: Puncak harga yang diperkirakan akan ditembus karena tren sedang berada dalam fase ekspansi bullish.`,
        visualType: 'market_structure'
      },
      {
        id: 'bos-break-of-structure',
        title: '3. Break of Structure (BOS): Kelanjutan Tren',
        content: `**Break of Structure (BOS)** terjadi ketika harga menembus titik ekstrem struktural searah dengan tren dominan:
- Dalam Uptrend: Harga menembus Higher High sebelumnya dan ditutup di atasnya. Ini mengonfirmasi bahwa pembeli masih memiliki momentum dominan dan tren bullish terus berlanjut.
- Dalam Downtrend: Harga menembus Lower Low sebelumnya dan ditutup di bawahnya. Ini mengonfirmasi bahwa penjual mempertahankan supremasi.

Setelah BOS terkonfirmasi, trader tidak langsung melakukan entry mengejar harga yang melesat. Sebaliknya, trader menunggu fase *Pullback / Retracement* ke zona diskon sebelum mencari posisi baru.`,
        callout: {
          type: 'tip',
          title: 'Aturan Pasca-BOS',
          text: 'BOS adalah sinyal ekspansi. Jangan beli di puncak ekspansi; tunggu pembentukan Higher Low baru pada zona diskon.'
        }
      },
      {
        id: 'choch-change-of-character',
        title: '4. Change of Character (CHoCH): Sinyal Transisi',
        content: `**Change of Character (CHoCH)** adalah sinyal peringatan pertama bahwa struktur pasar sedang mengalami pergeseran:
- Dalam Uptrend: Harga gagal mencetak HH baru, lalu berbalik menembus dan ditutup di bawah *Higher Low valid terakhir*. Pematahan HL terakhir ini adalah CHoCH bearish.
- Dalam Downtrend: Harga berbalik menembus dan ditutup di atas *Lower High valid terakhir*. Ini adalah CHoCH bullish.

CHoCH tidak menjamin pembalikan tren jangka panjang secara instan. Namun, CHoCH menandakan bahwa kendali kubu sebelumnya telah terinterupsi, dan pasar kemungkinan memasuki fase koreksi dalam atau perubahan arah.`,
        financialExample: {
          scenario: 'Bitcoin (BTC/USDT) bergerak naik dari $55,000 ke $68,000 pada timeframe H4 dengan serangkaian HH dan HL.',
          analysis: 'HL terakhir berada pada $64,200. Harga sempat menyentuh $68,500, namun kemudian turun drastis menembus $64,200 dan ditutup pada candle H4 di $63,800.',
          outcome: 'CHoCH terkonfirmasi. Trader cerdas berhenti mencari Setup Buy instan dan bersiap mencari peluang Short saat harga melakukan retracement menuju area imbalance di $66,000.'
        }
      },
      {
        id: 'body-vs-wick-break',
        title: '5. Aturan Konfirmasi: Body Close vs. Wick Breach',
        content: `Apakah sumbu (wick) yang menembus level struktur sudah dihitung sebagai BOS atau CHoCH?
- **Aturan Ketat (Recommended)**: Pemecahan struktur hanya diakui valid jika **Body Candlestick ditutup melampaui level swing** pada timeframe acuan Anda.
- **Wick Breach Only**: Jika hanya sumbu yang menembus level lalu body ditutup kembali ke dalam struktur, ini diklasifikasikan sebagai **Liquidity Sweep (Fakeout)**, bukan perubahan struktur sejati.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menandai setiap swing minor di timeframe rendah sebagai CHoCH pada tren timeframe tinggi.',
        correction: 'Bedakan antara Internal Structure dengan Swing Structure utama. Selalu selaraskan dengan timeframe tren yang lebih besar.'
      },
      {
        mistake: 'Menganggap penetrasi sumbu (wick breach) sebagai konfirmasi BOS.',
        correction: 'Tunggu body candle resmi ditutup melampaui level struktur untuk memastikan komitmen volume nyata.'
      }
    ],
    keyTakeaways: [
      'BOS mengonfirmasi kelanjutan tren searah.',
      'CHoCH adalah peringatan pertama patahnya struktur pasar valid terakhir.',
      'Selalu tunggu Body Close untuk mengonfirmasi pemecahan struktur objektif.',
      'Pasca-BOS, tunggu fase retracement ke area nilai sebelum mengeksekusi order.'
    ],
    relatedTopics: [
      { slug: 'multi-timeframe-fractality', title: 'Fraktalitas Multi-Timeframe', category: 'Structure' },
      { slug: 'liquidity-pools-inducement', title: 'Kolam Likuiditas & Inducement', category: 'Institutional' },
      { slug: 'supply-demand-order-blocks', title: 'Supply & Demand Order Blocks', category: 'Institutional' }
    ],
    references: [
      { title: 'The Wyckoff Methodology in Depth', author: 'Rubén Villahermosa', year: '2019' },
      { title: 'Encyclopedia of Chart Patterns', author: 'Thomas N. Bulkowski', year: '2005' }
    ]
  },

  'multi-timeframe-fractality': {
    id: 'art-multi-timeframe',
    nodeId: 'node-2-1',
    slug: 'multi-timeframe-fractality',
    title: 'Fraktalitas Multi-Timeframe: Top-Down Analysis',
    category: 'Market Structure',
    level: 2,
    readingTimeMinutes: 9,
    difficulty: 'Intermediate',
    summary: 'Bagaimana grafik pasar mengulang struktur yang identik pada semua skala waktu, dan cara menyelaraskan bias Higher Timeframe dengan eksekusi Lower Timeframe.',
    prerequisites: ['market-structure-bos-choch'],
    tableOfContents: [
      { id: 'fractal-nature', title: '1. Sifat Fraktal Pasar Finansial' },
      { id: 'holy-trinity-tf', title: '2. Tiga Tingkat Kerangka Waktu (HTF - MTF - LTF)' },
      { id: 'top-down-workflow', title: '3. Alur Kerja Top-Down yang Disiplin' },
      { id: 'fractal-alignment', title: '4. Keselarasan Fraktal untuk Eksekusi Presisi' },
      { id: 'common-mistakes', title: '5. Jebakan Trader Timeframe Rendah' },
      { id: 'key-takeaways', title: '6. Rangkuman & Checklist' }
    ],
    sections: [
      {
        id: 'fractal-nature',
        title: '1. Sifat Fraktal Pasar Finansial',
        content: `Konsep fraktal dalam matematika dipopulerkan oleh Benoît Mandelbrot. Sebuah fraktal adalah pola geometris yang memiliki kesamaan diri (*self-similarity*) pada skala pembesaran apa pun. 

Pasar finansial bersifat fraktal: sebuah pola candlestick atau pemecahan struktur (BOS/CHoCH) yang Anda temukan pada grafik Bulanan (Monthly) memiliki mekanika yang identik dengan yang terbentuk pada grafik 1 Menit (M1). Namun, timeframe yang lebih tinggi memiliki gravitasi dan volume yang jauh lebih besar. Satu lilin pada grafik H4 memuat dua puluh empat lilin grafik M10.`
      },
      {
        id: 'holy-trinity-tf',
        title: '2. Tiga Tingkat Kerangka Waktu (HTF - MTF - LTF)',
        content: `Untuk menghindari analisis yang saling bertentangan, kelompokkan timeframe Anda menjadi tiga lapis:
1. **Higher Timeframe (HTF - e.g., Daily / H4)**:
   - Menentukan arah bias makro dan lokasi Point of Interest (POI) utama.
   - Apakah kita sedang berada di zona diskon atau premium?
2. **Medium Timeframe (MTF - e.g., H1 / M15)**:
   - Memetakan struktur perantara dan fase koreksi.
   - Mengamati apakah harga sedang mendekati zona POI dari HTF.
3. **Lower Timeframe (LTF - e.g., M5 / M1)**:
   - Digunakan murni untuk waktu eksekusi dan meminimalkan ukuran Stop Loss.
   - Mencari CHoCH di dalam zona POI untuk mengonfirmasi bahwa penjual LTF telah menyerahkan kendali kembali ke pembeli HTF.`
      },
      {
        id: 'top-down-workflow',
        title: '3. Alur Kerja Top-Down yang Disiplin',
        content: `Urutan analisis harian yang benar:
1. Buka grafik Daily untuk melihat tren umum dan level likuiditas makro yang belum tersentuh.
2. Turun ke grafik H4 atau H1 untuk menandai zona Order Block atau FVG yang belum terisi.
3. Pasang alert harga dan **tutup grafik**. Jangan menunggu di timeframe M1 sebelum harga tiba di zona acuan.
4. Ketika alert berbunyi dan harga menyentuh zona HTF, buka timeframe M5/M1 untuk mencari konfirmasi struktural.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Terlalu lama menatap timeframe M1 tanpa memahami konteks tren Daily.',
        correction: 'Timeframe rendah penuh dengan noise transaksi minor. Selalu mulai dari gambaran besar sebelum menyelam ke micro structure.'
      }
    ],
    keyTakeaways: [
      'Struktur pasar bersifat fraktal dan berulang di semua skala waktu.',
      'Gunakan aturan 3 lapis: HTF untuk bias & POI, MTF untuk struktur perantara, LTF untuk eksekusi presisi.',
      'Jangan pernah melawan bias Higher Timeframe tanpa alasan pembalikan makro yang valid.'
    ],
    relatedTopics: [
      { slug: 'market-structure-bos-choch', title: 'Struktur Pasar: BOS & CHoCH', category: 'Structure' },
      { slug: 'supply-demand-order-blocks', title: 'Supply & Demand Order Blocks', category: 'Institutional' }
    ],
    references: [
      { title: 'The Misbehavior of Markets: A Fractal View of Financial Turbulence', author: 'Benoît Mandelbrot', year: '2004' }
    ]
  },

  'liquidity-pools-inducement': {
    id: 'art-liquidity-inducement',
    nodeId: 'node-2-2',
    slug: 'liquidity-pools-inducement',
    title: 'Kolam Likuiditas, Rekayasa Likuiditas & Inducement',
    category: 'Institutional Trading',
    level: 2,
    readingTimeMinutes: 11,
    difficulty: 'Intermediate',
    summary: 'Bagaimana pasar merekayasa likuiditas buatan (Inducement) untuk memancing pesanan retail sebelum pergerakan tren sesungguhnya diluncurkan.',
    prerequisites: ['support-resistance-liquidity', 'market-structure-bos-choch'],
    tableOfContents: [
      { id: 'what-is-inducement', title: '1. Apa itu Inducement (IDM)?' },
      { id: 'engineering-liquidity', title: '2. Cara Algoritma Merekayasa Likuiditas' },
      { id: 'equal-highs-lows', title: '3. Bahaya Equal Highs (EQH) dan Equal Lows (EQL)' },
      { id: 'trading-the-sweep', title: '4. Model Eksekusi Pasca-Liquidity Sweep' },
      { id: 'key-takeaways', title: '5. Rangkuman & Proteksi Modal' }
    ],
    sections: [
      {
        id: 'what-is-inducement',
        title: '1. Apa itu Inducement (IDM)?',
        content: `**Inducement (IDM)** adalah struktur minor yang sengaja dibentuk oleh pergerakan harga untuk *menginduksi* atau memancing trader yang tidak sabar agar segera masuk ke pasar sebelum harga mencapai zona institusional yang sesungguhnya.

Dalam tren bullish, setelah BOS terbentuk, harga akan membentuk pullback kecil. Seringkali trader pemula langsung menganggap titik swing pullback pertama tersebut sebagai zona support atau order block valid. Padahal, titik tersebut sengaja ditarik untuk menciptakan kolam likuiditas internal yang kemudian akan disapu sebelum ekspansi utama terjadi.`
      },
      {
        id: 'equal-highs-lows',
        title: '3. Bahaya Equal Highs (EQH) dan Equal Lows (EQL)',
        content: `Jika Anda melihat dua atau tiga puncak yang memiliki ketinggian yang hampir persis sama (**Equal Highs / EQH**), ini bukan "resistensi kuat yang tak tertembus". Bagi algoritma pasar, EQH adalah **magnet likuiditas berkadar tinggi**.

Jumlah Buy Stop yang berkumpul tepat di atas EQH sangat masif. Peluang harga untuk menyapu (sweep) titik tersebut melampaui 80% sebelum terjadi penurunan sesungguhnya. Hal yang sama berlaku bagi **Equal Lows (EQL)** di mana tumpukan Sell Stop menjadi sasaran empuk pembersihan SSL.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Melakukan entry pada Order Block yang berada persis di depan Inducement.',
        correction: 'Tunggu Inducement tersapu bersih terlebih dahulu, lalu cari entri pada zona Extreme Order Block di belakangnya.'
      }
    ],
    keyTakeaways: [
      'Inducement adalah umpan likuiditas untuk memerangkap trader prematur.',
      'Equal Highs (EQH) dan Equal Lows (EQL) adalah magnet likuiditas yang pasti menjadi target sweep.',
      'Konfirmasi entri paling aman terjadi setelah likuiditas internal tersapu bersih.'
    ],
    relatedTopics: [
      { slug: 'support-resistance-liquidity', title: 'Support & Kolam Likuiditas', category: 'Market Dynamics' },
      { slug: 'fair-value-gaps-imbalance', title: 'Fair Value Gaps & Imbalance', category: 'Institutional' }
    ],
    references: [
      { title: 'Inner Circle Trader (ICT) Core Concepts', author: 'Michael J. Huddleston', year: '2016' }
    ]
  },

  'fair-value-gaps-imbalance': {
    id: 'art-fair-value-gaps',
    nodeId: 'node-2-3',
    slug: 'fair-value-gaps-imbalance',
    title: 'Fair Value Gaps (FVG) & Algorithmic Price Delivery',
    category: 'Institutional Trading',
    level: 2,
    readingTimeMinutes: 10,
    difficulty: 'Intermediate',
    summary: 'Memahami ketidakseimbangan harga 3 lilin (Inefficiency), mengapa algoritma terprogram untuk menutup celah tersebut, serta aturan Premium vs. Discount.',
    prerequisites: ['candlestick-anatomy-wick-dynamics'],
    tableOfContents: [
      { id: 'fvg-definition', title: '1. Anatomi Formasi Tiga Candlestick FVG' },
      { id: 'why-markets-rebalance', title: '2. Mengapa Pasar Kembali Menyeimbangkan FVG?' },
      { id: 'consequent-encroachment', title: '3. Consequent Encroachment (Level 50% FVG)' },
      { id: 'premium-discount-filter', title: '4. Filter Zona Premium vs. Discount' },
      { id: 'key-takeaways', title: '5. Rangkuman Teknis' }
    ],
    sections: [
      {
        id: 'fvg-definition',
        title: '1. Anatomi Formasi Tiga Candlestick FVG',
        content: `**Fair Value Gap (FVG)**, sering juga disebut *Single Print Imbalance* atau *Inefficiency*, adalah kondisi di mana salah satu pihak (buyer atau seller) mendorong harga dengan volume yang sangat agresif sehingga transaksi dua arah yang wajar tidak sempat terlaksana.

Formasi FVG diidentifikasi melalui tiga lilin berturut-turut:
- **Bullish FVG**: Lilin ke-1 naik. Lilin ke-2 adalah lilin berukuran raksasa (*displacement candle*). Lilin ke-3 bergerak naik. Terdapat celah kosong antara **titik High lilin ke-1** dengan **titik Low lilin ke-3**. Sumbu keduanya tidak saling bersentuhan.
- **Bearish FVG**: Celah kosong antara **titik Low lilin ke-1** dengan **titik High lilin ke-3**.`
      },
      {
        id: 'why-markets-rebalance',
        title: '2. Mengapa Pasar Kembali Menyeimbangkan FVG?',
        content: `Algoritma pengiriman harga dirancang untuk efisiensi pasar. Ketika terjadi ketidakseimbangan ekstrem, pasar meninggalkan pesanan yang belum terpenuhi (*unfilled liquidity*). Oleh karena itu, harga memiliki kecenderungan magnetis untuk berbalik (*retrace*) mengisi celah kosong tersebut sebelum melanjutkan pergerakan utamanya.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap setiap FVG harus ditutup 100%.',
        correction: 'Seringkali sentuhan ke level 50% (Consequent Encroachment) sudah cukup bagi institusi untuk melanjutkan tren.'
      }
    ],
    keyTakeaways: [
      'FVG adalah celah ketidakseimbangan antara lilin ke-1 dan ke-3.',
      'Celah harga berfungsi sebagai magnet likuiditas sementara sebelum kelanjutan tren.',
      'Gunakan FVG bersamaan dengan filter zona Diskon untuk Buy, dan zona Premium untuk Sell.'
    ],
    relatedTopics: [
      { slug: 'supply-demand-order-blocks', title: 'Order Blocks & Supply-Demand', category: 'Institutional' }
    ],
    references: [
      { title: 'Algorithmic Trading & DMA', author: 'Barry Johnson', year: '2010' }
    ]
  },

  'supply-demand-order-blocks': {
    id: 'art-order-blocks',
    nodeId: 'node-3-1',
    slug: 'supply-demand-order-blocks',
    title: 'Order Blocks & Konsep Penawaran/Permintaan Institusional',
    category: 'Institutional Trading',
    level: 3,
    readingTimeMinutes: 12,
    difficulty: 'Advanced',
    summary: 'Mendeteksi jejak lilin terakhir institusi sebelum pergerakan eksplosif (Displacement) dan strategi mitigasi pesanan yang terjebak.',
    prerequisites: ['fair-value-gaps-imbalance', 'market-structure-bos-choch'],
    tableOfContents: [
      { id: 'order-block-definition', title: '1. Apa Sebenarnya Order Block Itu?' },
      { id: 'valid-ob-criteria', title: '2. Empat Kriteria Wajib Order Block Berkualitas Tinggi' },
      { id: 'mitigation-process', title: '3. Proses Mitigasi dan Penutupan Posisi Breakeven' },
      { id: 'order-flow-vs-order-block', title: '4. Keselarasan Order Flow Makro' },
      { id: 'key-takeaways', title: '5. Rangkuman & Pedoman Entry' }
    ],
    sections: [
      {
        id: 'order-block-definition',
        title: '1. Apa Sebenarnya Order Block Itu?',
        content: `Bukan sembarang candle berlawanan warna adalah Order Block. 
Secara harfiah, **Bullish Order Block (OB)** adalah lilin bearish terakhir sebelum pergerakan naik agresif yang berhasil:
1. Menyapu likuiditas sebelumnya (Liquidity Sweep).
2. Menghasilkan ketidakseimbangan nyata (FVG / Imbalance).
3. Memecahkan struktur pasar (BOS atau CHoCH).

Mengapa lilin ini penting? Karena saat institusi mengeksekusi akumulasi besar, sebagian pesanan jual mereka terjebak dalam kerugian (*drawdown*). Saat harga kembali ke area tersebut, institusi melakukan mitigasi (menutup posisi jual rugi tersebut pada titik impas / breakeven) sembari menambahkan pesanan beli baru.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menandai setiap lilin merah sebelum lilin hijau sebagai Order Block.',
        correction: 'Hanya lilin yang memicu BOS dan meninggalkan FVG yang memiliki validitas probabilitas tinggi.'
      }
    ],
    keyTakeaways: [
      'Order Block yang valid wajib memicu perpindahan harga (Displacement) dan meninggalkan FVG.',
      'Mitigasi adalah proses pasar kembali menjemput pesanan institusional yang tersisa.',
      'Jangan masuk sebelum harga menyentuh zona mitigasi secara terkontrol.'
    ],
    relatedTopics: [
      { slug: 'risk-management-1percent-rule', title: 'Manajemen Risiko 1% & R:R Asimetris', category: 'Risk' }
    ],
    references: [
      { title: 'Market Wizards: Interviews with Top Traders', author: 'Jack D. Schwager', year: '1989' }
    ]
  },

  'risk-management-1percent-rule': {
    id: 'art-risk-management',
    nodeId: 'node-4-1',
    slug: 'risk-management-1percent-rule',
    title: 'Manajemen Risiko Matematika: Aturan Risiko 1% & Asymmetric R:R',
    category: 'Risk Management',
    level: 4,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Sains matematika bertahan hidup: rumus ukuran lot objektif, tabel pemulihan drawdown, dan cara profitabel dengan win rate hanya 40%.',
    prerequisites: ['candlestick-anatomy-wick-dynamics'],
    tableOfContents: [
      { id: 'gamblers-ruin', title: '1. Teorema Kehancuran Penjudi (Gambler\'s Ruin)' },
      { id: 'one-percent-rule', title: '2. Rumus Baku Aturan Risiko 1%' },
      { id: 'asymmetric-rr', title: '3. Kekuatan Asymmetric Risk-to-Reward (R:R)' },
      { id: 'drawdown-math', title: '4. Tabel Matematika Pemulihan Kerugian' },
      { id: 'position-sizing-calc', title: '5. Algoritma Kalkulasi Ukuran Posisi' },
      { id: 'key-takeaways', title: '6. Rangkuman Hukum Besi Risiko' }
    ],
    sections: [
      {
        id: 'gamblers-ruin',
        title: '1. Teorema Kehancuran Penjudi (Gambler\'s Ruin)',
        content: `Banyak trader pemula percaya bahwa kunci sukses trading adalah menemukan "indikator ajaib" atau win rate 90%. Realitas statistik membuktikan sebaliknya: sebagian besar akun trading musnah bukan karena analisis arah salah, melainkan karena **ketidakmampuan mengelola risiko per transaksi**.

Dalam teori probabilitas, *Gambler's Ruin Theorem* menyatakan bahwa seorang pelaku pasar dengan modal terbatas yang mempertaruhkan persentase tetap yang terlalu besar pada setiap taruhan (misal 10% atau 20%) dipastikan akan mengalami kebangkrutan total dalam jangka panjang, bahkan jika sistem trading memiliki ekspektasi positif.`
      },
      {
        id: 'one-percent-rule',
        title: '2. Rumus Baku Aturan Risiko 1%',
        content: `Hukum besi manajemen modal institusional adalah **membatasi kerugian maksimal pada setiap satu trade tidak lebih dari 1% dari total ekuitas akun**.

Jika akun Anda bernilai $10,000, maka risiko maksimal pada trade apa pun adalah $100.
Artinya:
$$\\text{Dollar Risk} = \\text{Equity} \\times 0.01$$

Jika Anda mengalami 5 kekalahan beruntun (hal yang lumrah dalam distribusi probabilitas acak), Anda hanya kehilangan sekitar 4.9% dari total modal Anda. Anda masih memiliki 95.1% modal untuk melanjutkan kompetisi dengan tenang.`
      },
      {
        id: 'asymmetric-rr',
        title: '3. Kekuatan Asymmetric Risk-to-Reward (R:R)',
        content: `Dengan menerapkan rasio Risk to Reward minimal 1:3 (merisikokan $100 untuk menargetkan potensi keuntungan $300):
- Dari 10 trade, Anda hanya perlu benar 4 kali (Win Rate 40%).
- 4 trade menang: $4 \\times \$300 = +\$1,200$
- 6 trade kalah: $6 \\times \$100 = -\$600$
- **Hasil Bersih**: Profit $+\$600$ meskipun Anda lebih sering kalah daripada menang!

Inilah rahasia mengapa hedge fund dan trader profesional bisa mencetak laba konsisten tanpa harus menebak masa depan dengan sempurna.`,
        callout: {
          type: 'tip',
          title: 'Ekspektansi Positif',
          text: 'Formula Expectancy: E = (Win Rate × Rata-rata Menang) - (Loss Rate × Rata-rata Kalah). Pastikan nilai E selalu positif.'
        }
      },
      {
        id: 'drawdown-math',
        title: '4. Tabel Matematika Pemulihan Kerugian',
        content: `Mengapa drawdown modal sangat berbahaya? Karena matematika pemulihan kerugian bersifat eksponensial:

| Penurunan Modal (Loss) | Modal Tersisa | Keuntungan Diperlukan untuk Breakeven |
| :--- | :--- | :--- |
| **10%** | 90% | **11.1%** |
| **20%** | 80% | **25.0%** |
| **30%** | 70% | **42.8%** |
| **50%** | 50% | **100.0%** (Wajib 2x lipat!) |
| **75%** | 25% | **300.0%** |
| **90%** | 10% | **900.0%** (Nyaris mustahil) |

Ketika Anda kehilangan 50% dari modal Anda, Anda membutuhkan keuntungan 100% dari sisa modal hanya untuk kembali ke titik impas awal. Jangan pernah membiarkan akun Anda terjerumus ke dalam drawdown yang dalam!`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menggunakan ukuran lot tetap tanpa menghitung jarak Stop Loss dalam pip/poin.',
        correction: 'Ukuran lot harus dihitung dinamis berdasarkan jarak Stop Loss agar risiko uang tunai tetap presisi 1%.'
      },
      {
        mistake: 'Menghapus atau menggeser Stop Loss saat harga mendekati titik rugi.',
        correction: 'Stop Loss adalah biaya bisnis terencana. Menerima kerugian kecil terencana melindungi Anda dari kerugian mematikan.'
      }
    ],
    keyTakeaways: [
      'Batasi risiko maksimal per transaksi tidak lebih dari 1% dari total ekuitas akun.',
      'Targetkan Risk to Reward minimal 1:2 atau 1:3 untuk membangun keunggulan matematis.',
      'Matematika drawdown bersifat eksponensial; mencegah kerugian besar adalah prioritas nomor satu.',
      'Ukuran posisi wajib dihitung berdasarkan rumus: Lot = Risiko Uang / (Jarak Stop Loss × Pip Value).'
    ],
    relatedTopics: [
      { slug: 'trading-psychology-tilt', title: 'Psikologi Trading & Mitigasi Tilt', category: 'Psychology' },
      { slug: 'trading-journal-metrics', title: 'Jurnal Trading & Metrik Statistik', category: 'Execution' }
    ],
    references: [
      { title: 'The Mathematics of Money Management', author: 'Ralph Vince', year: '1992' },
      { title: 'Against the Gods: The Remarkable Story of Risk', author: 'Peter L. Bernstein', year: '1996' }
    ]
  },

  'trading-psychology-tilt': {
    id: 'art-trading-psychology',
    nodeId: 'node-4-2',
    slug: 'trading-psychology-tilt',
    title: 'Psikologi Trading: Mengatasi Emosi, Bias Kognitif & Tilt',
    category: 'Trading Psychology',
    level: 4,
    readingTimeMinutes: 11,
    difficulty: 'Advanced',
    summary: 'Menghadapi musuh terbesar dalam trading: otak manusia. Mengendalikan Loss Aversion, FOMO, Revenge Trading, dan membangun mindset berbasis probabilitas.',
    prerequisites: ['risk-management-1percent-rule'],
    tableOfContents: [
      { id: 'brain-wired-for-loss', title: '1. Mengapa Otak Manusia Diciptakan Gagal dalam Trading' },
      { id: 'four-primary-fears', title: '2. Empat Ketakutan Fundamental Menurut Mark Douglas' },
      { id: 'tilt-mechanism', title: '3. Fenomena Tilt dan Amigdala Hijack' },
      { id: 'process-oriented-mindset', title: '4. Pergeseran Mindset: Berorientasi Proses vs. Hasil' },
      { id: 'key-takeaways', title: '5. Protokol Kesehatan Mental Trader' }
    ],
    sections: [
      {
        id: 'brain-wired-for-loss',
        title: '1. Mengapa Otak Manusia Diciptakan Gagal dalam Trading',
        content: `Evolusi biologis melatih otak manusia untuk mencari kepastian dan menghindari rasa sakit. Daniel Kahneman dan Amos Tversky melalui *Prospect Theory* membuktikan bahwa rasa sakit akibat kehilangan uang secara psikologis bernilai dua kali lipat lebih intens dibandingkan kepuasan mendapatkan jumlah uang yang sama (*Loss Aversion*).

Dalam trading finansial, rasa sakit inilah yang mendorong trader untuk menolak mengakui kesalahan, menahan posisi rugi berlarut-larut dengan harapan harga kembali, serta memotong posisi untung terlalu cepat karena takut keuntungannya hilang.`
      },
      {
        id: 'tilt-mechanism',
        title: '3. Fenomena Tilt dan Amigdala Hijack',
        content: `Istilah *Tilt* dipinjam dari dunia poker: kondisi emosional di mana seorang pemain kehilangan kontrol rasional setelah serangkaian kekalahan yang menyakitkan.

Secara neurologis, ini disebut *Amygdala Hijack*. Bagian emosional otak mengambil alih kendali dari korteks prefrontal (pusat logika). Gejala tilt dalam trading:
- **Revenge Trading**: Masuk kembali ke pasar secara impulsif sesaat setelah terkena Stop Loss dengan ukuran lot dua kali lipat untuk "merebut kembali uang yang dicuri pasar".
- **Overtrading**: Membuka puluhan transaksi tanpa alasan sinyal yang sah.
- Menolak mematuhi batas risiko harian.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap emosi bisa dihilangkan sepenuhnya.',
        correction: 'Emosi tidak bisa dimatikan, namun reaksinya bisa diatur melalui protokol tertulis dan jeda wajib (cooling-off period).'
      }
    ],
    keyTakeaways: [
      'Hasil satu trade individual adalah acak, namun keunggulan sistem bekerja dalam sampel 100 trade.',
      'Jika mengalami 2 kekalahan beruntun dalam satu sesi, tutup platform dan jauhi layar monitor.',
      'Fokuslah pada eksekusi proses trading plan yang sempurna, bukan pada hasil uang instan.'
    ],
    relatedTopics: [
      { slug: 'risk-management-1percent-rule', title: 'Manajemen Risiko Matematika', category: 'Risk' },
      { slug: 'trading-journal-metrics', title: 'Jurnal Trading & Metrik Statistik', category: 'Execution' }
    ],
    references: [
      { title: 'Trading in the Zone: Master the Market with Confidence', author: 'Mark Douglas', year: '2000' },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011' }
    ]
  },

  'trading-journal-metrics': {
    id: 'art-trading-journal',
    nodeId: 'node-4-3',
    slug: 'trading-journal-metrics',
    title: 'Jurnal Trading & Metrik Statistik: Expectancy, Profit Factor & Sharpe',
    category: 'Trading Operations',
    level: 4,
    readingTimeMinutes: 10,
    difficulty: 'Advanced',
    summary: 'Mengubah trading dari sekadar tebakan hobi menjadi bisnis terukur dengan mencatat metrik kuantitatif: Expectancy, Profit Factor, Max Drawdown, dan Sharpe Ratio.',
    prerequisites: ['risk-management-1percent-rule'],
    tableOfContents: [
      { id: 'why-journal', title: '1. Jurnal Adalah Cermin Kinerja Profesional' },
      { id: 'core-metrics', title: '2. Empat Metrik Statistik Wajib' },
      { id: 'tagging-system', title: '3. Sistem Tagging Setup dan Emosi' },
      { id: 'audit-routine', title: '4. Rutinitas Audit Mingguan dan Bulanan' },
      { id: 'key-takeaways', title: '5. Rangkuman & Template' }
    ],
    sections: [
      {
        id: 'why-journal',
        title: '1. Jurnal Adalah Cermin Kinerja Profesional',
        content: `Peter Drucker pernah menyatakan: *"Apa yang tidak dapat diukur, tidak dapat dikelola."* Seorang trader tanpa jurnal adalah seorang penjudi yang berharap keberuntungan.

Jurnal trading bukan sekadar daftar untung-rugi nominal uang. Jurnal adalah catatan forensik yang membuktikan apakah Anda mematuhi trading plan Anda, setup mana yang memiliki edge terbaik, dan pada sesi apa Anda paling sering membuat kesalahan.`
      },
      {
        id: 'core-metrics',
        title: '2. Empat Metrik Statistik Wajib',
        content: `Setiap akhir bulan, seorang trader harus menghitung:
1. **Mathematical Expectancy ($E$)**: Nilai rata-rata yang diharapkan dihasilkan untuk setiap dolar yang dirisikokan.
2. **Profit Factor**: Total kotor keuntungan dibagi total kotor kerugian. Sistem sehat memiliki Profit Factor $> 1.75$.
3. **Maximum Drawdown (MDD)**: Penurunan persentase terbesar dari titik puncak ekuitas (*equity peak*) ke titik terendah (*trough*).
4. **Win Rate vs. Loss Rate**: Persentase kemenangan yang disandingkan dengan rata-rata Rasio Risk/Reward.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Hanya mencatat trade yang menang dan menyembunyikan trade yang kalah.',
        correction: 'Trade yang kalah adalah sumber data paling berharga untuk mendeteksi kelemahan sistem Anda.'
      }
    ],
    keyTakeaways: [
      'Jurnal trading adalah dokumen wajib yang membedakan profesional dari amatir.',
      'Hitung Expectancy dan Profit Factor setiap minimal 30 transaksi.',
      'Lakukan audit mingguan untuk mengeliminasi setup dengan ekspektansi negatif.'
    ],
    relatedTopics: [
      { slug: 'risk-management-1percent-rule', title: 'Manajemen Risiko 1%', category: 'Risk' }
    ],
    references: [
      { title: 'Trade Your Way to Financial Freedom', author: 'Van K. Tharp', year: '1998' }
    ]
  }
};

export function getArticleBySlug(slug: string): EducationalArticle | null {
  return EDUCATIONAL_ARTICLES[slug] || null;
}

export function getAllArticles(): EducationalArticle[] {
  return Object.values(EDUCATIONAL_ARTICLES);
}

export function getArticlesByCategory(): Record<string, EducationalArticle[]> {
  const map: Record<string, EducationalArticle[]> = {};
  Object.values(EDUCATIONAL_ARTICLES).forEach(art => {
    if (!map[art.category]) map[art.category] = [];
    map[art.category].push(art);
  });
  return map;
}
