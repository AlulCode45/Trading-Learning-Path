import { EducationalArticle } from '../types';

export const EDUCATIONAL_ARTICLES: Record<string, EducationalArticle> = {
  // ==========================================
  // MATERI UTAMA 0: MENGENAL TRADING FUNDAMENTAL
  // ==========================================
  'what-is-trading-fundamentals': {
    id: 'art-what-is-trading',
    nodeId: 'node-intro',
    slug: 'what-is-trading-fundamentals',
    title: 'Mengenal Trading: Hakikat Pasar Finansial, Partisipan, & Realitas Probabilitas',
    category: 'Market Fundamentals',
    level: 1,
    readingTimeMinutes: 15,
    difficulty: 'Beginner',
    summary: 'Panduan fundamental terlengkap mengenai hakikat trading: perbedaan dengan investasi dan judi, anatomi ekosistem partisipan pasar, mekanika bid-ask spread, leverage, serta realitas matematika untuk bertahan hidup.',
    prerequisites: [],
    tableOfContents: [
      { id: 'essence-of-trading', title: '1. Hakikat Trading: Bukan Judi, Bukan Cepat Kaya' },
      { id: 'trading-vs-investing-gambling', title: '2. Spektrum: Trading vs. Investing vs. Gambling' },
      { id: 'market-ecosystem', title: '3. Ekosistem Partisipan: Siapa Lawan Anda di Pasar?' },
      { id: 'asset-classes', title: '4. Ragam Kelas Aset: Karakteristik, Jam Pasar & Volatilitas' },
      { id: 'order-mechanics', title: '5. Mekanika Transaksi: Bid, Ask, Spread, Margin & Leverage' },
      { id: 'trading-styles', title: '6. Empat Gaya Trading Berdasarkan Horison Waktu' },
      { id: 'harsh-reality-9090', title: '7. Realitas Statistik: Mengapa 90% Gagal & Kunci Bertahan' },
      { id: 'key-takeaways', title: '8. Prinsip Bertahan & Rangkuman Kurikulum' }
    ],
    sections: [
      {
        id: 'essence-of-trading',
        title: '1. Hakikat Trading: Bukan Judi, Bukan Cepat Kaya',
        content: `**Trading finansial** pada hakikatnya adalah aktivitas jual beli instrumen keuangan (seperti mata uang, saham, komoditas, obligasi, atau kripto) dengan tujuan mengekstrak keuntungan dari selisih fluktuasi harga dalam rentang waktu tertentu.

Berbeda dari narasi media sosial yang kerap menggambarkan trading sebagai "mesin uang otomatis", pasar finansial di dunia nyata adalah **mekanisme lelang dua arah (*Double Auction Market*)** yang sangat kompetitif. Di pasar ini, risiko dan modal dialokasikan kembali secara konstan dari partisipan yang tidak berdisiplin kepada partisipan yang memiliki keunggulan matematis (*statistical edge*).

### Konsep Zero-Sum vs. Negative-Sum Game
Banyak yang menyebut trading sebagai *Zero-Sum Game* (keuntungan satu pihak adalah kerugian pihak lain). Namun pada realitas industri, trading adalah **Negative-Sum Game**. Mengapa?
Karena setiap kali Anda membuka atau menutup posisi, terdapat biaya friksi pasar yang ditarik oleh perantara:
- **Komisi (*Broker Commission*)**
- **Spread (*Selisih Harga Bid & Ask*)**
- **Biaya Inap (*Overnight Swap / Financing Fee*)**

Tanpa strategi terukur dan manajemen risiko ketat, biaya friksi ini secara perlahan akan mengikis modal Anda bahkan sebelum Anda sempat menyadari kesalahan analisis Anda.`,
        callout: {
          type: 'note',
          title: 'Definisi Profesional',
          text: 'Trading bukan tentang menebak masa depan dengan bola kristal. Trading adalah bisnis pengelolaan risiko di bawah ketidakpastian matematis.'
        }
      },
      {
        id: 'trading-vs-investing-gambling',
        title: '2. Spektrum: Trading vs. Investing vs. Gambling',
        content: `Banyak pelaku pasar pemula merugi karena mencampuradukkan pola pikir investasi dengan trading, atau bahkan tanpa sadar memperlakukan pasar sebagai kasino judi.

Berikut adalah tabel perbandingan fundamental antara ketiganya:

| Parameter Evaluasi | Trading Finansial | Investasi Jangka Panjang | Perjudian (Gambling) |
| :--- | :--- | :--- | :--- |
| **Horison Waktu** | Menit, Jam, Hari, hingga Beberapa Pekan | Bertahun-tahun hingga Puluhan Tahun | Instan / Hitungan Detik |
| **Fokus Analisis** | *Price Action*, Struktur Likuiditas, Volume & Volatilitas | Laporan Keuangan, Valuasi DCF, Dividen & Pertumbuhan Bisnis | Keberuntungan Murni (*Blind Luck / Random Odds*) |
| **Kontrol Risiko** | Wajib menggunakan *Stop Loss* dan alokasi modal per posisi | Diversifikasi portofolio dan *Dollar-Cost Averaging (DCA)* | Tidak ada kontrol; taruhan habis bila kalah |
| **Ekspektansi Matematis** | Didasarkan pada *Edge* sistematis teruji (*Expectancy > 0*) | Pertumbuhan ekonomi riil dan laba kumulatif perusahaan | Ekspektansi negatif matematis (*House Always Wins*) |
| **Sikap Mental** | Disiplin proses probabilitas dan eksekusi tanpa emosi | Kesabaran pasif dan ketahanan terhadap siklus makro | Sensasi adrenalin, keserakahan, dan kecanduan dopamin |`,
        callout: {
          type: 'warning',
          title: 'Jebakan "Menjadi Investor Mendadak"',
          text: 'Jangan pernah mengubah posisi trading yang sedang merugi menjadi "investasi jangka panjang" hanya karena Anda tidak rela mengakui kesalahan dan menolak memotong kerugian (Cut Loss).'
        }
      },
      {
        id: 'market-ecosystem',
        title: '3. Ekosistem Partisipan: Siapa Lawan Anda di Pasar?',
        content: `Saat Anda menekan tombol *Buy* atau *Sell*, Anda memasuki arena lelang global. Memahami siapa saja partisipan di pasar adalah kunci agar Anda tidak menjadi mangsa empuk.

Berikut adalah piramida hierarki pelaku pasar finansial global:

| Kategori Partisipan | Pemain Utama | Motivasi & Karakteristik | Dampak terhadap Pasar |
| :--- | :--- | :--- | :--- |
| **Tingkat 1: Bank Sentral** | The Fed, ECB, Bank of Japan, Bank Indonesia | Menjaga stabilitas moneter, mengendalikan inflasi & nilai tukar | Mengubah tren makro multi-bulan via suku bunga |
| **Tingkat 2: Tier-1 Banks (Market Makers)** | JP Morgan, Citi, Goldman Sachs, Deutsche Bank | Menyediakan likuiditas global dan memfasilitasi aliran dana raksasa | Membentuk likuiditas utama (*Interbank Liquidity*) |
| **Tingkat 3: Institutional Hedge Funds** | Bridgewater, Renaissance Tech, Citadel, Millennium | Mengejar *Alpha* (keuntungan di atas rata-rata pasar) via algoritma | Menggerakkan momentum harga impulsif harian |
| **Tingkat 4: Commercial Hedgers** | Maskapai (lindung nilai bahan bakar), Eksportir multinasional | Mengunci harga komoditas/valas untuk operasional bisnis riil | Transaksi masif tanpa spekulasi tren |
| **Tingkat 5: Retail Traders** | Trader perorangan di rumah | Mencari keuntungan mandiri dengan modal relatif kecil | Menjadi kolam likuiditas (*Liquidity Pools*) bagi institusi |`,
        visualType: 'market_structure'
      },
      {
        id: 'asset-classes',
        title: '4. Ragam Kelas Aset: Karakteristik, Jam Pasar & Volatilitas',
        content: `Pasar keuangan dunia terbagi ke dalam beberapa kelas instrumen dengan tabiat pergerakan yang berbeda:

1. **Foreign Exchange (Forex)**:
   - Pasar terbesar di dunia dengan omset harian melampaui $7.5 triliun.
   - Buka 24 jam sehari, 5 hari sepekan (sesi Sydney, Tokyo, London, dan New York).
   - Likuiditas tertinggi dengan spread sangat tipis pada pasangan mata uang utama (*Major Pairs* seperti EUR/USD, GBP/USD, USD/JPY).
2. **Komoditas (Commodities)**:
   - Emas (*XAU/USD*), Minyak Mentah (*WTI/Brent*), Gas Alam, Perak.
   - Sangat sensitif terhadap inflasi, suku bunga riil, dan geopolitik global.
3. **Indeks Saham Global (Indices)**:
   - S&P 500, Nasdaq 100 (US Tech), Dow Jones, DAX 40 (Jerman), Nikkei 225.
   - Mencerminkan performa kumpulan emiten terbaik dan memiliki volatilitas tinggi pada jam pembukaan bursa regional.
4. **Pasar Kripto (Cryptocurrency)**:
   - Bitcoin (BTC), Ethereum (ETH), altcoins.
   - Buka 24/7 tanpa henti dengan volatilitas ekstrem dan dipengaruhi oleh sentimen likuiditas global.`,
        callout: {
          type: 'tip',
          title: 'Saran Pemula',
          text: 'Fokuslah pada 1 atau 2 instrumen likuid (misalnya EUR/USD atau XAU/USD) hingga Anda benar-benar mengenali karakteristik sesi dan perilaku volatilitasnya.'
        }
      },
      {
        id: 'order-mechanics',
        title: '5. Mekanika Transaksi: Bid, Ask, Spread, Margin & Leverage',
        content: `Sebelum menyusun strategi teknikal, Anda wajib menguasai bahasa dasar transaksi di buku pesanan (*Order Book*):

- **Bid**: Harga tertinggi yang bersedia dibayar oleh pembeli saat itu.
- **Ask (Offer)**: Harga terendah yang bersedia diterima oleh penjual saat itu.
- **Spread**: Selisih antara harga Ask dan Bid. Ini adalah ongkos langsung yang dibayar ke penyedia likuiditas.
- **Slippage**: Perbedaan antara harga yang Anda klik pada layar dengan harga eksekusi aktual saat order diterima server, terutama pada momen rilis berita volatilitas tinggi.

### Bahaya Leverage: Pedang Bermata Dua
**Leverage** adalah fasilitas pinjaman dana proporsional dari broker yang memungkinkan Anda mengontrol nilai kontrak besar dengan jaminan modal (*Margin*) yang kecil.

| Modal Anda | Rasio Leverage | Daya Beli Efektif | Gerakan Pasar 1% Melawan Anda | Hasil Finansial |
| :--- | :--- | :--- | :--- | :--- |
| **$1,000** | **1:1 (Tanpa Leverage)** | $1,000 | Rugi $10 | Modal sisa $990 (-1%) — Sangat Aman |
| **$1,000** | **1:10 (Moderat)** | $10,000 | Rugi $100 | Modal sisa $900 (-10%) — Terkelola |
| **$1,000** | **1:100 (Tinggi)** | $100,000 | Rugi $1,000 | **Modal HABIS ($0) — Margin Call / Likuifaksi Total!** |`,
        financialExample: {
          scenario: 'Seorang trader menggunakan akun $500 dengan leverage 1:500 untuk membuka posisi 1.0 lot pada Gold (XAU/USD).',
          analysis: 'Satu lot Gold bernilai 100 troy ounce. Setiap penurunan $1 pada harga emas mengakibatkan kerugian $100.',
          outcome: 'Harga emas hanya perlu berfluktuasi $5 berlawanan arah (pergerakan normal dalam 2 menit) untuk melenyapkan 100% modal akun trader tersebut secara instan.'
        }
      },
      {
        id: 'trading-styles',
        title: '6. Empat Gaya Trading Berdasarkan Horison Waktu',
        content: `Tidak ada gaya trading yang "paling hebat"; gaya terbaik adalah yang cocok dengan psikologi, ketersediaan waktu, dan toleransi stres Anda:

| Gaya Trading | Rentang Penahanan Posisi | Timeframe Analisis | Beban Mental & Waktu Layar | Karakter Kepribadian |
| :--- | :--- | :--- | :--- | :--- |
| **Scalping** | Beberapa detik hingga menit | M1, M5, Tick Charts | Sangat Intens; membutuhkan reaksi kilat di depan monitor | Sangat fokus, disiplin ketat, toleran terhadap tempo tinggi |
| **Day Trading (Intraday)** | Beberapa jam; posisi ditutup sebelum hari berganti | M15, H1, H4 | Moderat; aktif pada jam sesi tertentu (London/NY Open) | Terorganisir, tidak suka membawa beban posisi saat tidur |
| **Swing Trading** | 2 hari hingga beberapa pekan | Daily, H4, H1 | Rendah; analisis dilakukan 1-2 kali sehari pasca penutupan candle | Sabar, tenang, mampu menahan fluktuasi jangka menengah |
| **Position Trading** | Beberapa bulan hingga tahunan | Weekly, Monthly | Sangat Rendah; fokus pada siklus makro ekonomi | Berpandangan luas, tahan terhadap koreksi interim besar |`
      },
      {
        id: 'harsh-reality-9090',
        title: '7. Realitas Statistik: Mengapa 90% Gagal & Kunci Bertahan',
        content: `Otoritas pengawas keuangan internasional (seperti FCA di Inggris dan ESMA di Eropa) secara hukum mewajibkan broker CFD untuk mencantumkan data statistik riil: **70% hingga 89% akun trader retail kehilangan uang**.

Di kalangan profesional dikenal aturan **Hukum 90/90/90**:
> *"90% trader retail kehilangan 90% modal mereka dalam 90 hari pertama."*

### Mengapa Sebagian Besar Gagal?
1. **Under-capitalization & Unrealistic Expectations**: Berharap mengubah $100 menjadi $10,000 dalam sebulan mendorong pengambilan risiko irasional.
2. **Ketiadaan Edge Statistik**: Melakukan eksekusi berdasarkan firasat, sinyal acak media sosial, atau indikator yang bertentangan.
3. **Mengabaikan Manajemen Risiko**: Tidak menggunakan Stop Loss atau mempertaruhkan 20-50% modal per trade.
4. **Revenge Trading & Tilt Emosional**: Melipatgandakan ukuran lot setelah kalah karena marah pada pasar.

### Bagaimana Masuk ke 10% yang Bertahan?
- Memandang trading sebagai profesi ilmiah probabilitas, bukan hiburan.
- Menjaga risiko per transaksi maksimal **1% dari total modal**.
- Memiliki Trading Plan tertulis yang mendikte kapan masuk, kapan keluar, dan kapan harus menahan diri untuk tidak bertransaksi.
- Mencatat dan mengaudit setiap transaksi dalam Jurnal Trading.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap trading adalah cara instan untuk menyelesaikan masalah keuangan darurat.',
        correction: 'Trading dengan "uang panas" atau uang kebutuhan hidup menjamin kegagalan psikologis karena emosi takut kalah akan melumpuhkan logika Anda.'
      },
      {
        mistake: 'Menggunakan leverage maksimal yang disediakan broker tanpa menghitung risiko nominal dolar.',
        correction: 'Leverage adalah fasilitas margin, bukan alasan untuk membuka lot raksasa. Ukuran posisi wajib dihitung berdasarkan jarak Stop Loss.'
      },
      {
        mistake: 'Mengikuti sinyal berbayar di media sosial tanpa memahami logika struktur pasar di baliknya.',
        correction: 'Bangun kemandirian analitis Anda sendiri melalui pemahaman Price Action dan lelang pasar yang objektif.'
      }
    ],
    keyTakeaways: [
      'Trading adalah bisnis pengelolaan risiko di bawah ketidakpastian matematis, bukan ramalan masa depan.',
      'Pasar finansial adalah lelang dua arah di mana pesanan institusional menggerakkan harga.',
      'Leverage adalah instrumen pengali ganda: bisa melipatgandakan hasil, namun mempercepat kehancuran modal jika salah digunakan.',
      'Keberhasilan jangka panjang 100% ditentukan oleh kontrol risiko, keunggulan probabilitas sistematis, dan audit jurnal disiplin.'
    ],
    relatedTopics: [
      { slug: 'candlestick-anatomy-wick-dynamics', title: 'Anatomi Candlestick & Wick Dynamics', category: 'Price Action' },
      { slug: 'multi-timeframe-fractality', title: 'Fraktalitas Multi-Timeframe', category: 'Price Action' },
      { slug: 'logical-stop-loss-asymmetric-rr', title: 'Manajemen Risiko: Aturan 1%', category: 'Risk' }
    ],
    references: [
      { title: 'Reminiscences of a Stock Operator', author: 'Edwin Lefèvre', year: '1923' },
      { title: 'Trading in the Zone', author: 'Mark Douglas', year: '2000' },
      { title: 'Market Wizards: Interviews with Top Traders', author: 'Jack D. Schwager', year: '1989' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 1: CANDLESTICK ANATOMY
  // ==========================================
  'candlestick-anatomy-wick-dynamics': {
    id: 'art-candlestick-anatomy',
    nodeId: 'node-1-1',
    slug: 'candlestick-anatomy-wick-dynamics',
    title: 'Anatomi Candlestick & Dinamika Sumbu (Wick Rejection)',
    category: 'Price Action Core',
    level: 1,
    readingTimeMinutes: 10,
    difficulty: 'Beginner',
    summary: 'Membaca bahasa lilin murni: membedakan tekanan pembeli vs. penjual melalui perbandingan body dan sumbu, serta mengapa harga penutupan (Close) adalah data paling objektif dalam lelang pasar.',
    prerequisites: ['what-is-trading-fundamentals'],
    tableOfContents: [
      { id: 'auction-market-candle', title: '1. Teori Lelang di Balik Formasi Candlestick' },
      { id: 'four-data-points', title: '2. Empat Titik Data Lelang: Open, High, Low, Close' },
      { id: 'body-vs-wick', title: '3. Dinamika Body vs. Sumbu (Wick Rejection)' },
      { id: 'absorption-physics', title: '4. Fisika Penyerapan Likuiditas (Absorption)' },
      { id: 'key-takeaways', title: '5. Rangkuman & Pedoman Praktik' }
    ],
    sections: [
      {
        id: 'auction-market-candle',
        title: '1. Teori Lelang di Balik Formasi Candlestick',
        content: `Sebuah candlestick bukanlah sekadar balok berwarna hijau atau merah pada layar grafik. Candlestick adalah **laporan ringkas pertarungan lelang finansial (*Auction Market Theory*)** selama interval waktu tertentu (misal: 1 jam, 4 jam, atau 1 hari).

Pada setiap pembukaan candle, proses lelang dimulai:
- Pembeli berusaha menaikkan harga untuk mencari batas kesediaan penjual melepaskan aset.
- Penjual berusaha menekan harga turun untuk mencari pembeli yang bersedia menampung volume mereka.
- Candle selesai ketika waktu sesi berakhir, dan titik penutupan (*Close*) mengesahkan kubu pemenang lelang pada periode tersebut.`,
        callout: {
          type: 'note',
          title: 'Prinsip Kunci',
          text: 'Jangan menghafal pola lilin grafis yang kaku. Pahami logika penawaran dan permintaan yang membentuk sumbu dan badan candle tersebut.'
        }
      },
      {
        id: 'four-data-points',
        title: '2. Empat Titik Data Lelang: Open, High, Low, Close',
        content: `Setiap lilin memuat empat informasi berharga:
1. **Open (O)**: Titik tolak harga saat sesi dimulai. Merupakan ekspektasi awal pelaku pasar.
2. **High (H)**: Titik tertinggi di mana pembeli bersedia menawar sebelum penawaran habis atau penjual membanjiri pasar.
3. **Low (L)**: Titik terendah di mana penjual bersedia melepas sebelum pembeli agresif menganggap harga terlalu murah (*undervalued*).
4. **Close (C)**: Data paling objektif dan krusial dalam analisis teknikal. Close menunjukkan pihak mana yang secara sah memenangkan lelang pada penutupan sesi.

Banyak trader pemula melakukan kesalahan fatal dengan mengambil keputusan saat candlestick masih berjalan (*unclosed candle*). Padahal, sumbu panjang ke bawah bisa seketika berbalik menjadi full body bearish sebelum candle resmi ditutup.`
      },
      {
        id: 'body-vs-wick',
        title: '3. Dinamika Body vs. Sumbu (Wick Rejection)',
        content: `Rasio antara ukuran tubuh (*Body*) dan sumbu (*Wick*) menyampaikan volume komitmen:
- **Large Body, Short Wicks**: Mengindikasikan *Unidirectional Conviction* (keyakinan arah satu sisi). Satu kubu memegang kendali penuh tanpa perlawanan signifikan.
- **Small Body, Long Opposing Wick**: Mengindikasikan *Failed Auction* atau penolakan harga (*Rejection*). Harga mencoba menembus level baru, namun langsung direspons oleh pesanan batas berlawanan dengan volume lebih besar.
- **Narrow Range, Centered Body (Doji)**: Merepresentasikan ekuilibrium sesaat (*Price Equilibrium*). Pasar sedang menanti likuiditas baru sebelum ekspansi berikutnya.

### Tabel Matriks Interpretasi Anatomi Candlestick:

| Formasi Lilin | Rasio Body vs Sumbu | Implikasi Mekanisme Lelang | Sikap Tindakan Trader |
| :--- | :--- | :--- | :--- |
| **Marubozu / Full Body** | Body > 85%, Sumbu minimal | Komitmen volume satu arah sangat dominan | Ikuti arah ekspansi tren; hindari melawan arus |
| **Long Upper Wick Rejection** | Sumbu atas > 60%, Body kecil di bawah | Penyerapan agresif oleh Sell Limit; kegagalan buyer | Cari konfirmasi entri Sell pasca sweep |
| **Long Lower Wick Rejection** | Sumbu bawah > 60%, Body kecil di atas | Penyerapan agresif oleh Buy Limit; kegagalan seller | Cari konfirmasi entri Buy pasca sweep |
| **Doji / Spinning Top** | Body tipis di tengah, sumbu simetris | Ekuilibrium harga; pembeli dan penjual seimbang | Menunggu konfirmasi breakout atau rilis data |`,
        visualType: 'candlestick_anatomy'
      },
      {
        id: 'absorption-physics',
        title: '4. Fisika Penyerapan Likuiditas (Absorption)',
        content: `Ketika sumbu atas yang panjang terbentuk pada area resistensi, apa yang sesungguhnya terjadi di balik layar *Order Book*?
Pembeli agresif mendorong harga naik melampaui level psikologis. Di area tersebut, institusi atau penyedia likuiditas telah meletakkan tumpukan pesanan jual pasif (*Iceberg Sell Limit Orders*).

Semua pesanan beli pasar terserap habis oleh pesanan jual pasif tersebut. Begitu daya beli retail habis, sedikit saja pesanan jual pasar dapat menjatuhkan harga kembali ke bawah, meninggalkan sumbu panjang ke atas (*Upper Shadow*). Inilah anatomi penyerapan likuiditas.`
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
      }
    ],
    keyTakeaways: [
      'Titik penutupan (Close) adalah satu-satunya data konfirmasi lelang yang sah.',
      'Sumbu (wick) merepresentasikan penolakan harga dan penyerapan likuiditas oleh pesanan berlawanan.',
      'Kekuatan suatu candle ditentukan oleh rasio body-to-wick dan lokasinya terhadap struktur pasar.',
      'Hindari menghafal nama-nama pola lilin; pahami logika lelang di balik terbentuknya formasi harga tersebut.'
    ],
    relatedTopics: [
      { slug: 'multi-timeframe-fractality', title: 'Fraktalitas Multi-Timeframe', category: 'Price Action' },
      { slug: 'valid-swing-high-low', title: 'Valid Swing High & Low', category: 'Price Action' }
    ],
    references: [
      { title: 'Japanese Candlestick Charting Techniques', author: 'Steve Nison', year: '1991' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 2: MULTI-TIMEFRAME
  // ==========================================
  'multi-timeframe-fractality': {
    id: 'art-multi-timeframe',
    nodeId: 'node-1-2',
    slug: 'multi-timeframe-fractality',
    title: 'Fraktalitas Multi-Timeframe: Top-Down Analysis',
    category: 'Market Structure',
    level: 1,
    readingTimeMinutes: 10,
    difficulty: 'Intermediate',
    summary: 'Bagaimana grafik pasar mengulang struktur yang identik pada semua skala waktu, dan cara menyelaraskan bias Higher Timeframe dengan eksekusi Lower Timeframe tanpa terjebak noise.',
    prerequisites: ['candlestick-anatomy-wick-dynamics'],
    tableOfContents: [
      { id: 'fractal-nature', title: '1. Sifat Fraktal Pasar Finansial' },
      { id: 'holy-trinity-tf', title: '2. Tiga Tingkat Kerangka Waktu (HTF - MTF - LTF)' },
      { id: 'top-down-workflow', title: '3. Alur Kerja Top-Down yang Disiplin' },
      { id: 'common-mistakes', title: '4. Jebakan Trader Timeframe Rendah' },
      { id: 'key-takeaways', title: '5. Rangkuman & Checklist' }
    ],
    sections: [
      {
        id: 'fractal-nature',
        title: '1. Sifat Fraktal Pasar Finansial',
        content: `Konsep fraktal dalam matematika dipopulerkan oleh Benoît Mandelbrot. Sebuah fraktal adalah pola geometris yang memiliki kesamaan diri (*self-similarity*) pada skala pembesaran apa pun.

Pasar finansial bersifat fraktal: sebuah pola candlestick atau pemecahan struktur (BOS/CHoCH) yang Anda temukan pada grafik Bulanan (*Monthly*) memiliki mekanika yang identik dengan yang terbentuk pada grafik 1 Menit (*M1*). Namun, timeframe yang lebih tinggi memiliki gravitasi dan volume yang jauh lebih besar. Satu lilin pada grafik H4 memuat enam belas lilin grafik M15.`
      },
      {
        id: 'holy-trinity-tf',
        title: '2. Tiga Tingkat Kerangka Waktu (HTF - MTF - LTF)',
        content: `Untuk menghindari analisis yang saling bertentangan, kelompokkan timeframe Anda menjadi tiga lapis:

### Matriks Harmonisasi Multi-Timeframe (Top-Down Alignment):

| Lapisan Timeframe | Skala Waktu Acuan | Peran Analitis | Output Keputusan |
| :--- | :--- | :--- | :--- |
| **Higher Timeframe (HTF)** | Daily / H4 | Bias Naratif & Likuiditas Makro | Menentukan arah: Long Only atau Short Only |
| **Medium Timeframe (MTF)** | H1 / M15 | Struktur Tren Lokal & Dealing Range | Menemukan POI (Order Block / FVG) valid |
| **Lower Timeframe (LTF)** | M5 / M1 | Trigger Eksekusi Presisi (CHoCH / Sweep) | Entry dengan Stop Loss tipis dan R:R asimetris |`
      },
      {
        id: 'top-down-workflow',
        title: '3. Alur Kerja Top-Down yang Disiplin',
        content: `Urutan analisis harian yang benar:
1. Buka grafik Daily untuk melihat tren umum dan level likuiditas makro yang belum tersentuh.
2. Turun ke H1/M15 untuk menandai struktur swing aktif dan zona Order Block atau FVG.
3. Tunggu harga memasuki zona H1 tersebut, lalu pantau M5/M1 untuk konfirmasi pergeseran karakter (CHoCH).
4. Masuk posisi hanya jika ketiga timeframe selaras searah.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mencoba melawan tren Daily hanya karena melihat sinyal pembalikan kecil di grafik M1.',
        correction: 'Tren timeframe tinggi ibarat kereta ekspres; sinyal M1 yang melawan HTF seringkali tergilas oleh ekspansi tren utama.'
      }
    ],
    keyTakeaways: [
      'Struktur pasar berulang di semua timeframe dengan prinsip mekanis yang sama.',
      'Gunakan HTF untuk arah bias, MTF untuk area nilai, dan LTF untuk pemicu entri.',
      'Jangan pernah membuka posisi di LTF tanpa mengetahui posisi Anda dalam konteks Daily/H4.'
    ],
    relatedTopics: [
      { slug: 'valid-swing-high-low', title: 'Valid Swing High & Low', category: 'Price Action' },
      { slug: 'bos-vs-choch', title: 'Struktur Pasar: BOS vs CHoCH', category: 'Price Action' }
    ],
    references: [
      { title: 'The (Mis)Behavior of Markets: A Fractal View of Risk, Ruin, and Reward', author: 'Benoit Mandelbrot', year: '2004' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 3: VALID SWING HIGH/LOW
  // ==========================================
  'valid-swing-high-low': {
    id: 'art-valid-swings',
    nodeId: 'node-2-1',
    slug: 'valid-swing-high-low',
    title: 'Valid Swing High & Swing Low: Pemetaan Struktur Mekanis Objektif',
    category: 'Market Structure',
    level: 2,
    readingTimeMinutes: 11,
    difficulty: 'Intermediate',
    summary: 'Menghilangkan subjektivitas dalam membaca chart: kriteria mekanis 3-candle untuk menentukan puncak (Swing High) dan lembah (Swing Low) yang sah tanpa terdistraksi noise minor.',
    prerequisites: ['candlestick-anatomy-wick-dynamics', 'multi-timeframe-fractality'],
    tableOfContents: [
      { id: 'why-objective-swings', title: '1. Mengapa Subjektivitas Membunuh Akurasi Trader' },
      { id: 'three-candle-rule', title: '2. Aturan Mekanis Formasi Tiga Candlestick' },
      { id: 'pullback-validation', title: '3. Konfirmasi Pullback: Kapan Swing Diakui Sah?' },
      { id: 'internal-vs-swing', title: '4. Membedakan Internal Structure vs. Major Swing' },
      { id: 'key-takeaways', title: '5. Rangkuman & Aturan Praktik' }
    ],
    sections: [
      {
        id: 'why-objective-swings',
        title: '1. Mengapa Subjektivitas Membunuh Akurasi Trader',
        content: `Sebagian besar trader pemula menandai titik tertinggi (*high*) dan terendah (*low*) secara acak berdasarkan intuisi visual semata. Akibatnya, pada hari yang sama dua trader bisa melihat tren yang bertolak belakang pada grafik yang sama.

Untuk membangun sistem trading yang konsisten (*reproducible*), kita membutuhkan aturan mekanis:
- Kapan sebuah titik pucuk diakui sebagai **Swing High** resmi?
- Kapan sebuah titik lembah diakui sebagai **Swing Low** resmi?
- Bagaimana membedakan riak kecil (*noise*) dari gelombang struktur utama?`
      },
      {
        id: 'three-candle-rule',
        title: '2. Aturan Mekanis Formasi Tiga Candlestick',
        content: `Kriteria fraktal dasar untuk titik swing objektif:

### Tabel Kriteria Struktur Titik Swing Objektif:

| Elemen Struktur | Karakteristik Lilin Utama | Karakteristik Lilin Kiri & Kanan | Syarat Konfirmasi Sah |
| :--- | :--- | :--- | :--- |
| **Valid Swing High** | Memiliki titik tertinggi (High) paling tinggi di antara tetangganya | Candle sebelum dan sesudahnya memiliki High lebih rendah | Terjadi penembusan ke bawah titik Low candle formasi tersebut |
| **Valid Swing Low** | Memiliki titik terendah (Low) paling rendah di antara tetangganya | Candle sebelum dan sesudahnya memiliki Low lebih tinggi | Terjadi penembusan ke atas titik High candle formasi tersebut |`,
        visualType: 'swing_structure'
      },
      {
        id: 'pullback-validation',
        title: '3. Konfirmasi Pullback: Kapan Swing Diakui Sah?',
        content: `Sebuah Swing High dalam tren bullish **BELUM RESMI** diakui sebelum harga melakukan *pullback valid*.
Pullback valid terkonfirmasi ketika harga berhasil menyapu atau menembus titik Low dari candle tertinggi sebelumnya.

Sebelum pullback valid terjadi, setiap kenaikan harga lanjutan hanyalah perpanjangan (*expansion*) dari satu gelombang yang sama, bukan pembentukan titik swing baru.`
      },
      {
        id: 'internal-vs-swing',
        title: '4. Membedakan Internal Structure vs. Major Swing',
        content: `Di dalam satu ayunan (*swing leg*) pada timeframe H4, grafik M15 akan membentuk puluhan Higher Highs dan Higher Lows kecil. Ini disebut **Internal Structure**.

Jangan pernah mencampuradukkan swing internal M15 dengan swing utama H4:
- Internal structure digunakan untuk timing entry dan mencari zona diskon.
- Swing structure utama digunakan untuk menentukan bias arah umum dan target TP jangka panjang.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menandai setiap candle berlawanan warna sebagai titik swing baru.',
        correction: 'Titik swing hanya sah bila memenuhi aturan formasi fraktal dan terkonfirmasi oleh pullback lelang yang jelas.'
      }
    ],
    keyTakeaways: [
      'Titik swing yang valid wajib ditentukan secara mekanis tanpa tebak-tebakan visual.',
      'Swing High membutuhkan candle di kirinya dan di kanannya dengan titik High yang lebih rendah.',
      'Selalu bedakan swing utama timeframe tinggi dari struktur internal timeframe rendah.'
    ],
    relatedTopics: [
      { slug: 'bos-vs-choch', title: 'Struktur Pasar: BOS vs CHoCH', category: 'Market Structure' },
      { slug: 'strong-vs-weak-high-low', title: 'Strong vs Weak Highs & Lows', category: 'Market Structure' }
    ],
    references: [
      { title: 'Technical Analysis of Stock Trends', author: 'Robert D. Edwards & John Magee', year: '1948' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 4: BOS VS CHOCH
  // ==========================================
  'bos-vs-choch': {
    id: 'art-market-structure',
    nodeId: 'node-2-2',
    slug: 'bos-vs-choch',
    title: 'Struktur Pasar: Break of Structure (BOS) vs. Change of Character (CHoCH)',
    category: 'Market Structure',
    level: 2,
    readingTimeMinutes: 12,
    difficulty: 'Intermediate',
    summary: 'Fondasi membaca tren struktural objektif: membedakan kelanjutan tren (BOS) dari sinyal awal pembalikan struktural (CHoCH), serta aturan konfirmasi Body Close vs Wick Sweep.',
    prerequisites: ['valid-swing-high-low'],
    tableOfContents: [
      { id: 'dow-theory-modern', title: '1. Teori Dow dalam Konteks Algoritma Modern' },
      { id: 'bos-break-of-structure', title: '2. Break of Structure (BOS): Kelanjutan Tren' },
      { id: 'choch-change-of-character', title: '3. Change of Character (CHoCH): Sinyal Transisi' },
      { id: 'body-vs-wick-break', title: '4. Aturan Konfirmasi: Body Close vs. Wick Breach' },
      { id: 'key-takeaways', title: '5. Rangkuman & Ringkasan Alur' }
    ],
    sections: [
      {
        id: 'dow-theory-modern',
        title: '1. Teori Dow dalam Konteks Algoritma Modern',
        content: `Prinsip dasar tren pasar dirumuskan lebih dari seabad lalu oleh Charles Dow:
- **Uptrend**: Terbentuknya Higher Highs (HH) dan Higher Lows (HL) secara konsisten.
- **Downtrend**: Terbentuknya Lower Lows (LL) dan Lower Highs (LH) secara konsisten.

Namun dalam pembacaan harga institusional, kita membutuhkan kriteria pemecahan struktur yang terukur secara mekanis agar tidak terjebak sinyal palsu.`
      },
      {
        id: 'bos-break-of-structure',
        title: '2. Break of Structure (BOS): Kelanjutan Tren',
        content: `**Break of Structure (BOS)** terjadi ketika harga menembus titik ekstrem struktural searah dengan tren dominan:
- Dalam Uptrend: Harga menembus Higher High sebelumnya dan ditutup di atasnya. Ini mengonfirmasi bahwa pembeli masih memiliki momentum dominan.
- Dalam Downtrend: Harga menembus Lower Low sebelumnya dan ditutup di bawahnya. Ini mengonfirmasi kelanjutan tren bearish.`
      },
      {
        id: 'choch-change-of-character',
        title: '3. Change of Character (CHoCH): Sinyal Transisi',
        content: `**Change of Character (CHoCH)** adalah sinyal peringatan pertama bahwa struktur pasar sedang mengalami pergeseran:
- Dalam Uptrend: Harga gagal mencetak HH baru, lalu berbalik menembus dan ditutup di bawah *Higher Low valid terakhir*.
- Dalam Downtrend: Harga berbalik menembus dan ditutup di atas *Lower High valid terakhir*.

### Perbandingan Komprehensif: BOS vs. CHoCH

| Parameter Karakteristik | Break of Structure (BOS) | Change of Character (CHoCH) |
| :--- | :--- | :--- |
| **Arah Penembusan** | Searah tren dominan (*Pro-trend*) | Berlawanan tren dominan (*Counter-trend*) |
| **Signifikansi Pasar** | Konfirmasi kelanjutan tren (*Continuation*) | Peringatan awal perubahan arah (*Reversal Alert*) |
| **Titik Level Acuan** | Swing High (Bullish) / Swing Low (Bearish) | Higher Low terakhir (Bullish) / Lower High terakhir (Bearish) |
| **Syarat Validitas** | Wajib Body Close melampaui level | Wajib Body Close melampaui level |
| **Tindakan Trader** | Tunggu koreksi ke zona diskon untuk entri searah | Waspada pembalikan arah; hentikan entri searah tren lama |`,
        visualType: 'bos_choch'
      },
      {
        id: 'body-vs-wick-break',
        title: '4. Aturan Konfirmasi: Body Close vs. Wick Breach',
        content: `Apakah sumbu (wick) yang menembus level struktur sudah dihitung sebagai BOS atau CHoCH?
- **Aturan Ketat (Recommended)**: Pemecahan struktur hanya diakui valid jika **Body Candlestick ditutup melampaui level swing** pada timeframe acuan Anda.
- **Wick Breach Only**: Jika hanya sumbu yang menembus level lalu body ditutup kembali ke dalam struktur, ini diklasifikasikan sebagai **Liquidity Sweep (Fakeout)**, bukan perubahan struktur sejati.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap penetrasi sumbu (wick breach) sebagai konfirmasi BOS.',
        correction: 'Tunggu body candle resmi ditutup melampaui level struktur untuk memastikan komitmen volume nyata.'
      }
    ],
    keyTakeaways: [
      'BOS menandakan kelanjutan tren; CHoCH memperingatkan potensi pembalikan atau pullback dalam.',
      'Hanya akui penembusan struktur yang dikonfirmasi oleh penutupan Body Candle.',
      'Jangan masuk posisi langsung saat BOS terjadi; tunggu fase retracement ke area nilai.'
    ],
    relatedTopics: [
      { slug: 'strong-vs-weak-high-low', title: 'Strong vs Weak Highs & Lows', category: 'Market Structure' },
      { slug: 'supply-demand-fresh-mitigated', title: 'Supply & Demand Order Blocks', category: 'Price Action' }
    ],
    references: [
      { title: 'Dow Theory', author: 'Charles H. Dow', year: '1902' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 5: STRONG VS WEAK HIGHS/LOWS
  // ==========================================
  'strong-vs-weak-high-low': {
    id: 'art-strong-weak-levels',
    nodeId: 'node-2-3',
    slug: 'strong-vs-weak-high-low',
    title: 'Strong vs. Weak Highs & Lows: Protected Swings & Target Likuiditas',
    category: 'Market Structure',
    level: 2,
    readingTimeMinutes: 11,
    difficulty: 'Intermediate',
    summary: 'Menentukan level struktural mana yang dilindungi oleh institusi (*Protected*) dan level mana yang rentan ditembus sebagai target Take Profit alami (*Targeted Liquidity*).',
    prerequisites: ['bos-vs-choch'],
    tableOfContents: [
      { id: 'concept-protected-swings', title: '1. Logika di Balik Protected Swings' },
      { id: 'identifying-strong-levels', title: '2. Cara Mengidentifikasi Strong High dan Strong Low' },
      { id: 'identifying-weak-levels', title: '3. Anatomi Weak High dan Weak Low (Targeted Levels)' },
      { id: 'comparison-matrix', title: '4. Matriks Komparasi Strong vs. Weak Extremes' },
      { id: 'stop-loss-placement', title: '5. Penempatan Stop Loss Logis Berbasis Struktur Kuat' },
      { id: 'key-takeaways', title: '6. Rangkuman & Prinsip Eksekusi' }
    ],
    sections: [
      {
        id: 'concept-protected-swings',
        title: '1. Logika di Balik Protected Swings',
        content: `Tidak semua titik puncak dan lembah diciptakan setara. Institusi keuangan menempatkan modal miliaran dolar untuk memicu pergerakan harga. Ketika pergerakan tersebut berhasil menembus struktur sebelumnya (*BOS*), titik asal dari pergerakan tersebut menjadi **benteng pertahanan (*Protected Level*)**.

Sebaliknya, titik ekstrem yang gagal menghasilkan penembusan struktur baru adalah titik yang lemah (*Weak Level*) dan secara alami menjadi magnet sasaran likuiditas yang siap dilindas.`
      },
      {
        id: 'identifying-strong-levels',
        title: '2. Cara Mengidentifikasi Strong High dan Strong Low',
        content: `- **Strong (Protected) Low**: Swing Low yang bertanggung jawab atas terjadinya penembusan Higher High (BOS) dalam tren bullish. Selama titik ini tidak jebol, bias bullish tetap 100% utuh.
- **Strong (Protected) High**: Swing High yang bertanggung jawab atas terjadinya penembusan Lower Low (BOS) dalam tren bearish. Titik ini dilindungi oleh penjual institusional.`
      },
      {
        id: 'identifying-weak-levels',
        title: '3. Anatomi Weak High dan Weak Low (Targeted Levels)',
        content: `- **Weak High**: Puncak harga dalam tren bullish yang terbentuk dari pantulan sementara. Karena tren dominan adalah naik, puncak ini diperkirakan akan ditembus. Ini adalah target Take Profit terbaik untuk posisi Buy.
- **Weak Low**: Lembah harga dalam tren bearish yang memantul lemah. Ini adalah target Take Profit alami untuk posisi Sell.`
      },
      {
        id: 'comparison-matrix',
        title: '4. Matriks Komparasi Strong vs. Weak Extremes',
        content: `### Tabel Matriks Evaluasi Tingkat Kekuatan Level:

| Parameter Evaluasi | Strong (Protected) Swing | Weak (Targeted) Swing |
| :--- | :--- | :--- |
| **Pencapaian Struktural** | Berhasil memicu Break of Structure (BOS) | Gagal menembus struktur; hanya koreksi sementara |
| **Perilaku Pasar** | Dipertahankan agresif oleh pesanan institusi | Rentan disapu dan ditembus dengan mudah |
| **Fungsi bagi Trader** | Tempat meletakkan **Stop Loss logis** di baliknya | Tempat meletakkan **Take Profit objektif** di depannya |
| **Karakteristik Lilin** | Seringkali memiliki *Imbalance / FVG* di depannya | Pergerakan lambat, overlapping, dan volume rendah |`,
        visualType: 'strong_weak_levels'
      },
      {
        id: 'stop-loss-placement',
        title: '5. Penempatan Stop Loss Logis Berbasis Struktur Kuat',
        content: `Trader amatir meletakkan Stop Loss secara acak (misal: "harus 20 pip dari entry"). Trader profesional meletakkan Stop Loss **tepat di luar Strong Protected Low/High**.
Mengapa? Karena jika Strong Low tersebut sampai jebol oleh body candle, tesis struktural Anda secara ilmiah telah gugur (*Invalidated*), dan Anda memang seharusnya keluar dari pasar.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menaruh Stop Loss tepat di dalam zona Weak High/Low.',
        correction: 'Weak Level adalah sasaran tembusan pasar; lindungi posisi Anda di balik Strong Protected Extremes.'
      }
    ],
    keyTakeaways: [
      'Strong Low adalah titik yang sukses menghasilkan BOS baru ke atas.',
      'Weak High adalah target sasaran yang ditakdirkan untuk ditembus dalam tren bullish.',
      'Gunakan Strong Level untuk proteksi Stop Loss, dan Weak Level untuk target Take Profit.'
    ],
    relatedTopics: [
      { slug: 'supply-demand-fresh-mitigated', title: 'Supply & Demand Order Blocks', category: 'Price Action' },
      { slug: 'logical-stop-loss-asymmetric-rr', title: 'Stop Loss Logis & R:R', category: 'Risk' }
    ],
    references: [
      { title: 'Auction Market Theory Applied', author: 'TLP Institutional Research', year: '2024' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 6: SUPPLY & DEMAND FRESH/MITIGATED
  // ==========================================
  'supply-demand-fresh-mitigated': {
    id: 'art-supply-demand',
    nodeId: 'node-3-1',
    slug: 'supply-demand-fresh-mitigated',
    title: 'Supply & Demand: Fresh vs. Mitigated Order Blocks',
    category: 'Price Action Institutional',
    level: 3,
    readingTimeMinutes: 11,
    difficulty: 'Intermediate',
    summary: 'Menganalisis zona ketidakseimbangan order institusional, membedakan zona perawan (Fresh) yang berprobabilitas tinggi dari zona yang sudah berkali-kali disentuh (Mitigated).',
    prerequisites: ['strong-vs-weak-high-low'],
    tableOfContents: [
      { id: 'origin-of-imbalance', title: '1. Asal Mula Terbentuknya Zona Supply dan Demand' },
      { id: 'order-blocks-mechanics', title: '2. Mekanisme Order Block: Jejak Transaksi Raksasa' },
      { id: 'fresh-vs-mitigated', title: '3. Perbedaan Kritis: Fresh vs. Mitigated Zones' },
      { id: 'the-fourth-touch-trap', title: '4. Jebakan Sentuhan ke-4: Mengapa Support Rapuh' },
      { id: 'key-takeaways', title: '5. Rangkuman & Pedoman Validasi' }
    ],
    sections: [
      {
        id: 'origin-of-imbalance',
        title: '1. Asal Mula Terbentuknya Zona Supply dan Demand',
        content: `Pasar bergerak dalam dua fase bergantian: konsolidasi ekuilibrium dan ekspansi agresif.
Ketika institusi memutuskan memindahkan harga dari level $100 ke $120, mereka meletakkan volume beli yang jauh melampaui seluruh penawaran yang ada di pasar. 
Titik awal terjadinya ketidakseimbangan agresif (*Displacement*) ini meninggalkan jejak zona:
- **Demand Zone**: Basis harga sebelum terjadi ledakan kenaikan (*Rally*).
- **Supply Zone**: Basis harga sebelum terjadi penurunan tajam (*Drop*).`
      },
      {
        id: 'order-blocks-mechanics',
        title: '2. Mekanisme Order Block: Jejak Transaksi Raksasa',
        content: `**Order Block (OB)** adalah lilin berlawanan terakhir sebelum pergerakan impulsif yang memicu Break of Structure (BOS):
- **Bullish Order Block**: Lilin bearish terakhir sebelum harga meledak ke atas memecahkan swing high.
- **Bearish Order Block**: Lilin bullish terakhir sebelum harga anjlok ke bawah memecahkan swing low.`
      },
      {
        id: 'fresh-vs-mitigated',
        title: '3. Perbedaan Kritis: Fresh vs. Mitigated Zones',
        content: `### Tabel Evaluasi Kualitas Zona: Fresh vs. Mitigated

| Parameter Evaluasi | Fresh Order Block (Unmitigated) | Mitigated Order Block (Telah Diuji) |
| :--- | :--- | :--- |
| **Kapasitas Pesanan** | Pesanan batas institusi masih utuh (100% kapasitas) | Sebagian atau seluruh pesanan telah terisi pada sentuhan lalu |
| **Probabilitas Reaksi** | **Sangat Tinggi (High Probability Reaction)** | Menurun drastis; rentan dijebol (*Low Probability*) |
| **Jumlah Kunjungan** | Belum pernah dikunjungi kembali (0 sentuhan) | 1, 2, atau lebih sentuhan harga sebelumnya |
| **Keamanan Stop Loss** | Terukur dan rasional di balik sumbu ekstrem zona | Sangat berisiko karena bantalan pesanan penahan sudah tipis |`,
        visualType: 'supply_demand_zones'
      },
      {
        id: 'the-fourth-touch-trap',
        title: '4. Jebakan Sentuhan ke-4: Mengapa Support Rapuh',
        content: `Analisis teknikal klasik sering mengajarkan: *"Semakin sering garis disentuh, semakin kuat garis tersebut."* Ini adalah mitos paling berbahaya di pasar finansial!

Realitas mekanis lelang: Setiap kali harga memantul dari zona Demand, sejumlah pesanan Buy Limit yang ada di zona tersebut tereksekusi dan habis. Pada sentuhan ke-3 atau ke-4, persediaan pembeli di zona tersebut telah menipis. Ketika dorongan jual berikutnya datang, zona tersebut akan tembus seketika.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Melakukan entry pada Order Block yang sudah disentuh berkali-kali.',
        correction: 'Prioritaskan selalu zona Fresh yang belum pernah tersentuh sejak terbentuknya BOS.'
      }
    ],
    keyTakeaways: [
      'Zona Fresh memiliki probabilitas pantulan tertinggi pada sentuhan pertama (first touch).',
      'Setiap sentuhan harga memakan resting orders institusi, membuat zona semakin rapuh.',
      'Order Block yang sah wajib menghasilkan penembusan struktur (BOS) dan meninggalkan FVG.'
    ],
    relatedTopics: [
      { slug: 'premium-vs-discount-pricing', title: 'Premium vs Discount Equilibrium', category: 'Price Action' },
      { slug: 'bsl-ssl-liquidity-pools', title: 'Liquidity Pools BSL & SSL', category: 'Price Action' }
    ],
    references: [
      { title: 'Supply and Demand Trading Secrets', author: 'Sam Seiden', year: '2012' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 7: PREMIUM VS DISCOUNT PRICING
  // ==========================================
  'premium-vs-discount-pricing': {
    id: 'art-premium-discount',
    nodeId: 'node-3-2',
    slug: 'premium-vs-discount-pricing',
    title: 'Premium vs. Discount Pricing: Fibonacci Equilibrium & Fair Value Gaps',
    category: 'Price Action Institutional',
    level: 3,
    readingTimeMinutes: 10,
    difficulty: 'Intermediate',
    summary: 'Menerapkan logika pedagang grosir profesional: disiplin membeli di area Diskon (<50%) dan menjual di area Premium (>50%) menggunakan Consequent Encroachment.',
    prerequisites: ['supply-demand-fresh-mitigated'],
    tableOfContents: [
      { id: 'wholesale-auction-logic', title: '1. Logika Lelang Grosir: Mengapa Harga 50% Menjadi Kunci' },
      { id: 'dealing-ranges', title: '2. Cara Menarik Dealing Range Aktif' },
      { id: 'fvg-imbalance-role', title: '3. Peran Fair Value Gaps (FVG) dalam Zona Nilai' },
      { id: 'pricing-matrix', title: '4. Matriks Valuasi Premium vs. Discount' },
      { id: 'key-takeaways', title: '5. Rangkuman & Aturan Eksekusi' }
    ],
    sections: [
      {
        id: 'wholesale-auction-logic',
        title: '1. Logika Lelang Grosir: Mengapa Harga 50% Menjadi Kunci',
        content: `Bayangkan Anda adalah pemilik toko elektronik grosir. Anda tidak akan pernah membeli stok barang dagangan pada harga eceran tertinggi (*Premium*). Anda akan menunggu distributor menawarkan diskon minimal 50% (*Discount*) agar margin keuntungan Anda aman.

Institusi finansial raksasa mengoperasikan logika yang persis sama. Algoritma IPDA diprogram untuk menyeimbangkan pasar pada level **Equilibrium (50% dari rentang harga aktif)**.`
      },
      {
        id: 'dealing-ranges',
        title: '2. Cara Menarik Dealing Range Aktif',
        content: `Tarik alat bantu Fibonacci Retracement dari titik **Strong Low** ke titik **Strong High** yang baru saja membentuk BOS:
- **Level 1.0 - 0.5**: Zona **Premium** (Area mahal — Hanya mencari peluang SELL).
- **Level 0.5**: Titik **Equilibrium** (Nilai wajar pasar).
- **Level 0.5 - 0.0**: Zona **Discount** (Area murah — Hanya mencari peluang BUY).`
      },
      {
        id: 'fvg-imbalance-role',
        title: '3. Peran Fair Value Gaps (FVG) dalam Zona Nilai',
        content: `Sebuah **Fair Value Gap (FVG)** adalah celah harga tiga lilin di mana lilin tengah bergerak begitu kencang sehingga candle ke-1 dan candle ke-3 tidak bertindihan (*no overlap*).
Titik tengah dari celah FVG (level 50% dari gap) disebut **Consequent Encroachment (C.E.)**. Level ini bertindak sebagai magnet penyeimbang harga yang sangat kuat.`
      },
      {
        id: 'pricing-matrix',
        title: '4. Matriks Valuasi Premium vs. Discount',
        content: `### Tabel Matriks Disiplin Valuasi Pasar:

| Zona Valuasi | Lokasi Rentang Fibonacci | Status Kelayakan Entri | Risiko Kesalahan Retail |
| :--- | :--- | :--- | :--- |
| **Deep Premium** | Level 0.705 - 1.0 | Sangat Layak untuk **SELL** | Membeli di pucuk karena FOMO melihat lilin hijau besar |
| **Equilibrium** | Level 0.500 | Area Netral / Tanpa Edge | Terjebak pergerakan sideways yang memakan biaya spread |
| **Deep Discount** | Level 0.0 - 0.295 | Sangat Layak untuk **BUY** | Panik menjual di dasar lembah karena berita negatif |`,
        visualType: 'premium_discount'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membuka posisi Buy saat harga sudah berada di area Premium (>50%).',
        correction: 'Sabar menunggu harga retrace memasuki zona Discount (<50%) sebelum mencari trigger entry Buy.'
      }
    ],
    keyTakeaways: [
      'Jangan pernah membeli di area Premium dan jangan pernah menjual di area Discount.',
      'Level Equilibrium 50% adalah garis batas netral dari rentang struktur aktif.',
      'Kombinasikan zona Discount dengan Fresh Order Block untuk mendapatkan Risk to Reward terbaik.'
    ],
    relatedTopics: [
      { slug: 'bsl-ssl-liquidity-pools', title: 'Liquidity Pools BSL & SSL', category: 'Price Action' },
      { slug: 'ltf-shift-entry-protocol', title: 'Protokol Konfirmasi Entry', category: 'Execution' }
    ],
    references: [
      { title: 'Mind Over Markets', author: 'James F. Dalton', year: '1990' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 8: BSL & SSL LIQUIDITY POOLS
  // ==========================================
  'bsl-ssl-liquidity-pools': {
    id: 'art-liquidity-pools',
    nodeId: 'node-4-1',
    slug: 'bsl-ssl-liquidity-pools',
    title: 'Kolam Likuiditas: Buy-Side (BSL) & Sell-Side (SSL) Liquidity',
    category: 'Market Dynamics',
    level: 4,
    readingTimeMinutes: 11,
    difficulty: 'Advanced',
    summary: 'Memahami bahwa likuiditas adalah bahan bakar sejati pergerakan harga finansial: memetakan kumpulan pesanan Stop Loss retail pada Equal Highs dan Equal Lows.',
    prerequisites: ['premium-vs-discount-pricing'],
    tableOfContents: [
      { id: 'liquidity-as-fuel', title: '1. Likuiditas Adalah Bahan Bakar Pergerakan Pasar' },
      { id: 'bsl-mechanics', title: '2. Buy-Side Liquidity (BSL): Kumpulan Stop Buy' },
      { id: 'ssl-mechanics', title: '3. Sell-Side Liquidity (SSL): Kumpulan Stop Sell' },
      { id: 'eqh-eql-magnets', title: '4. Bahaya Equal Highs (EQH) dan Equal Lows (EQL)' },
      { id: 'key-takeaways', title: '5. Rangkuman & Peta Likuiditas' }
    ],
    sections: [
      {
        id: 'liquidity-as-fuel',
        title: '1. Likuiditas Adalah Bahan Bakar Pergerakan Pasar',
        content: `Untuk mengeksekusi order beli senilai $500 juta, institusi tidak bisa langsung menekan tombol *Market Buy* karena akan menyebabkan harga melesat naik tak terkendali (*massive slippage*).
Institusi membutuhkan **pihak lawan (*counterparty*)** yang menjual aset dalam jumlah masif di satu titik harga yang terkonsentrasi.

Di mana kumpulan pesanan jual tersebut berada? Tepat di atas puncak-puncak harga di mana para trader meletakkan Stop Loss mereka!`
      },
      {
        id: 'bsl-mechanics',
        title: '2. Buy-Side Liquidity (BSL): Kumpulan Stop Buy',
        content: `**Buy-Side Liquidity (BSL)** adalah kolam likuiditas yang bertumpuk di atas Swing High, Resistance klasik, atau pola Double Top.
Kolam ini terdiri dari:
1. Pesanan Stop Loss dari para penjual (yang secara teknis berupa pesanan *Buy Stop*).
2. Pesanan *Buy Stop* dari para breakout trader retail yang berharap harga terus melesat.`
      },
      {
        id: 'ssl-mechanics',
        title: '3. Sell-Side Liquidity (SSL): Kumpulan Stop Sell',
        content: `**Sell-Side Liquidity (SSL)** adalah kolam likuiditas yang bertumpuk di bawah Swing Low, Support klasik, atau pola Double Bottom.
Kolam ini terdiri dari Stop Loss posisi buy (berupa pesanan *Sell Stop*) yang menjadi sasaran empuk institusi untuk membeli dengan harga murah (*Discount*).`
      },
      {
        id: 'eqh-eql-magnets',
        title: '4. Bahaya Equal Highs (EQH) dan Equal Lows (EQL)',
        content: `### Tabel Perbandingan Pola Pikir Retail vs. Realitas Likuiditas:

| Pola Grafik | Pandangan Analisis Retail Tradisional | Realitas Algoritma Likuiditas Institusi |
| :--- | :--- | :--- |
| **Equal Highs (EQH)** | Double Top / Resistance kuat tak tertembus | Magnet likuiditas BSL tebal yang pasti disapu (*Sweep*) |
| **Equal Lows (EQL)** | Double Bottom / Lantai support kokoh | Magnet likuiditas SSL tebal yang siap dibersihkan |
| **Trendline Support** | Garis pantulan aman untuk Buy berulang kali | Likuiditas likuidasi miring (*Engineered Liquidity*) |`,
        visualType: 'liquidity_pools'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menaruh Stop Loss tepat 2 pip di atas pola Double Top yang sangat rapi.',
        correction: 'Pola yang terlalu rapi adalah perangkap likuiditas buatan; beri ruang toleransi di luar area sweep.'
      }
    ],
    keyTakeaways: [
      'Pasar bergerak dari satu kolam likuiditas ke kolam likuiditas berikutnya.',
      'BSL berada di atas puncak swing; SSL berada di bawah lembah swing.',
      'Equal Highs dan Equal Lows bertindak sebagai magnet penarik harga berkadar tinggi.'
    ],
    relatedTopics: [
      { slug: 'liquidity-sweep-fakeout-mechanics', title: 'Liquidity Sweep Mechanics', category: 'Price Action' },
      { slug: 'ltf-shift-entry-protocol', title: 'Protokol Konfirmasi Entry', category: 'Execution' }
    ],
    references: [
      { title: 'Market Microstructure Theory', author: 'Maureen O\'Hara', year: '1995' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 9: LIQUIDITY SWEEP & FAKEOUT
  // ==========================================
  'liquidity-sweep-fakeout-mechanics': {
    id: 'art-liquidity-sweep',
    nodeId: 'node-4-2',
    slug: 'liquidity-sweep-fakeout-mechanics',
    title: 'Liquidity Sweep & Fakeout Mechanics: Protokol Turtle Soup',
    category: 'Market Dynamics',
    level: 4,
    readingTimeMinutes: 11,
    difficulty: 'Advanced',
    summary: 'Mengenali saat harga menusuk level resistensi atau support kunci murni untuk memicu Stop Loss massal sebelum berbalik arah secara agresif (*Displacement*).',
    prerequisites: ['bsl-ssl-liquidity-pools'],
    tableOfContents: [
      { id: 'anatomy-of-sweep', title: '1. Tiga Fase Terjadinya Liquidity Sweep' },
      { id: 'turtle-soup-protocol', title: '2. Pola Klasik Turtle Soup Buy & Sell' },
      { id: 'real-breakout-vs-sweep', title: '3. Membedakan Breakout Asli vs. Sapuan Likuiditas' },
      { id: 'displacement-confirmation', title: '4. Konfirmasi Displacement: Volume & Reaksi' },
      { id: 'key-takeaways', title: '5. Rangkuman & Aturan Eksekusi' }
    ],
    sections: [
      {
        id: 'anatomy-of-sweep',
        title: '1. Tiga Fase Terjadinya Liquidity Sweep',
        content: `Sebuah **Liquidity Sweep** (atau *Stop Hunt*) terjadi melalui tiga tahap berurutan:
1. **Rekayasa Likuiditas (*Inducement*)**: Pasar sengaja membentuk level support/resistance yang sangat mencolok agar para trader menumpuk pesanan Stop Loss di baliknya.
2. **Pembersihan (*The Sweep*)**: Lilin bervolume tinggi menusuk menembus level tersebut. Stop Loss terserap dan breakout trader retail terpancing masuk.
3. **Pembalikan Agresif (*Displacement*)**: Harga segera ditutup kembali ke dalam rentang struktur awal dengan candle besar ke arah berlawanan, meninggalkan sumbu panjang.`
      },
      {
        id: 'turtle-soup-protocol',
        title: '2. Pola Klasik Turtle Soup Buy & Sell',
        content: `Dipopulerkan oleh Linda Raschke dalam *Street Smarts*:
- **Turtle Soup Buy**: Harga menembus titik swing low 20 candle terakhir, namun gagal bertahan dan ditutup kembali di atas level low tersebut dalam 1-2 candle berikutnya.
- **Turtle Soup Sell**: Harga menembus titik swing high 20 candle terakhir, namun gagal bertahan dan ditutup kembali di bawah level high tersebut.`
      },
      {
        id: 'real-breakout-vs-sweep',
        title: '3. Membedakan Breakout Asli vs. Sapuan Likuiditas',
        content: `### Tabel Karakteristik: Breakout Sejati vs. Liquidity Sweep:

| Parameter Pengamatan | Breakout Sejati (BOS Valid) | Liquidity Sweep (Fakeout / Turtle Soup) |
| :--- | :--- | :--- |
| **Penutupan Candle** | Body candle ditutup mantap di luar level | Body candle ditutup kembali ke dalam rentang (*Wick only*) |
| **Karakter Lilin Lanjutan** | Terjadi ekspansi berturut-turut searah | Terjadi pembalikan agresif instan (*Displacement*) |
| **Kondisi FVG** | Meninggalkan FVG searah dengan arah tembusan | Meninggalkan FVG besar berlawanan dengan arah tembusan |
| **Tindakan Trader** | Tunggu pullback untuk entri searah tren | Masuk posisi berlawanan pasca konfirmasi sweep |`,
        visualType: 'liquidity_sweep'
      },
      {
        id: 'displacement-confirmation',
        title: '4. Konfirmasi Displacement: Volume & Reaksi',
        content: `Jangan pernah sembarangan menebak pembalikan harga hanya karena harga menyentuh level support/resistance.
Tunggu selalu konfirmasi **Displacement**: lilin berbadan lebar dengan kecepatan tinggi yang menutup kembali ke dalam struktur dan membuktikan bahwa institusi telah selesai mengisi pesanan mereka.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Melakukan entry Buy instan tepat saat candle menusuk ke atas resistance.',
        correction: 'Tunggu penutupan candle; jika meninggalkan wick panjang dan ditutup di bawah resistance, itu adalah sweep, bukan breakout.'
      }
    ],
    keyTakeaways: [
      'Liquidity sweep adalah pola pembalikan paling andal dalam metodologi Price Action.',
      'Sapu likuiditas dikonfirmasi jika candle gagal menutup di luar level ekstrem.',
      'Konfirmasi Displacement membuktikan bahwa pihak institusi telah mengambil alih kendali pasar.'
    ],
    relatedTopics: [
      { slug: 'ltf-shift-entry-protocol', title: 'Protokol Konfirmasi Entry', category: 'Execution' },
      { slug: 'logical-stop-loss-asymmetric-rr', title: 'Stop Loss Logis & R:R', category: 'Risk' }
    ],
    references: [
      { title: 'Street Smarts: High Probability Short Term Trading Strategies', author: 'Laurence A. Connors & Linda B. Raschke', year: '1995' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 10: LTF SHIFT ENTRY PROTOCOL
  // ==========================================
  'ltf-shift-entry-protocol': {
    id: 'art-entry-protocol',
    nodeId: 'node-5-1',
    slug: 'ltf-shift-entry-protocol',
    title: 'Protokol Konfirmasi Entry: Lower Timeframe Shift (LTF)',
    category: 'Execution Protocol',
    level: 5,
    readingTimeMinutes: 12,
    difficulty: 'Advanced',
    summary: 'Menghubungkan gambaran besar HTF ke eksekusi mikro LTF: alur 3 langkah disiplin menunggu CHoCH pada timeframe eksekusi sebelum menekan tombol transaksi untuk rasio R:R maksimal.',
    prerequisites: ['liquidity-sweep-fakeout-mechanics'],
    tableOfContents: [
      { id: 'why-not-blind-limit', title: '1. Bahaya Blind Limit Order Tanpa Konfirmasi' },
      { id: 'three-step-protocol', title: '2. Tiga Langkah Alur Kerja Protokol Eksekusi' },
      { id: 'timeframe-pairing-matrix', title: '3. Matriks Pasangan Timeframe Eksekusi' },
      { id: 'refined-entry-points', title: '4. Titik Entri Optimal: OTE & FVG Retracement' },
      { id: 'key-takeaways', title: '5. Rangkuman & Checklist Eksekusi' }
    ],
    sections: [
      {
        id: 'why-not-blind-limit',
        title: '1. Bahaya Blind Limit Order Tanpa Konfirmasi',
        content: `Banyak trader pemula memasang order limit langsung pada Order Block H4 atau Daily tanpa menunggu konfirmasi (*Blind Entry*). Jika momentum berita atau likuiditas makro sedang sangat deras, zona tersebut bisa diterobos begitu saja tanpa reaksi sedikit pun.

Dengan menunggu **konfirmasi pergeseran karakter di Lower Timeframe (LTF Shift)**:
- Anda memastikan bahwa pembalikan arah bukan sekadar harapan, melainkan sudah mulai terjadi secara nyata.
- Ukuran Stop Loss berkurang dari misalnya 60 pip (H4) menjadi hanya 8-12 pip (M5/M1), melipatgandakan rasio Risk to Reward Anda.`
      },
      {
        id: 'three-step-protocol',
        title: '2. Tiga Langkah Alur Kerja Protokol Eksekusi',
        content: `Protokol eksekusi standar institusional:
1. **Langkah 1: Tap Into HTF POI**: Harga resmi menyentuh zona Order Block atau menyapu BSL/SSL pada timeframe H4/Daily.
2. **Langkah 2: LTF Character Shift (CHoCH)**: Turun ke timeframe eksekusi (M15 atau M5) dan tunggu terbentuknya CHoCH yang menembus struktur berlawanan dengan body candle valid.
3. **Langkah 3: Mitigation Retracement Entry**: Pasang Limit Order pada FVG atau Order Block baru yang terbentuk di LTF pasca-CHoCH tersebut, dengan Stop Loss di balik titik ekstrem LTF.`
      },
      {
        id: 'timeframe-pairing-matrix',
        title: '3. Matriks Pasangan Timeframe Eksekusi',
        content: `### Tabel Pasangan Timeframe Eksekusi yang Selaras:

| Gaya Trading | Timeframe HTF (Bias & POI) | Timeframe MTF (Struktur) | Timeframe LTF (Konfirmasi Entry) |
| :--- | :--- | :--- | :--- |
| **Intraday Scalping** | Grafik 1 Jam (H1) | Grafik 15 Menit (M15) | **Grafik 1 Menit (M1) / 3 Menit** |
| **Day Trading Standar** | Grafik 4 Jam (H4) | Grafik 1 Jam (H1) | **Grafik 5 Menit (M5) / 15 Menit** |
| **Swing Trading** | Grafik Harian (Daily) | Grafik 4 Jam (H4) | **Grafik 15 Menit (M15) / 1 Jam** |
| **Position Trading** | Grafik Mingguan (Weekly) | Grafik Harian (Daily) | **Grafik 4 Jam (H4)** |`,
        visualType: 'entry_protocol'
      },
      {
        id: 'refined-entry-points',
        title: '4. Titik Entri Optimal: OTE & FVG Retracement',
        content: `Setelah CHoCH di LTF terbentuk, harga biasanya melakukan koreksi masuk ke area **Optimal Trade Entry (OTE)** pada level Fibonacci 0.618 - 0.705.
Kombinasikan level OTE ini dengan FVG yang belum tertutup untuk mendapatkan tingkat presisi entri tertinggi.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Memaksa mencari entri LTF di sembarang tempat tanpa adanya sentuhan pada HTF POI.',
        correction: 'LTF CHoCH hanya bermakna jika terjadi di dalam zona nilai Higher Timeframe.'
      }
    ],
    keyTakeaways: [
      'Konfirmasi LTF memperkecil Stop Loss dan melipatgandakan potensi Risk to Reward.',
      'Alur eksekusi: Sentuhan HTF POI -> Pembentukan LTF CHoCH -> Entri pada FVG pullback.',
      'Jangan pernah membuka posisi jika syarat protokol eksekusi belum lengkap.'
    ],
    relatedTopics: [
      { slug: 'logical-stop-loss-asymmetric-rr', title: 'Stop Loss Logis & R:R', category: 'Risk' },
      { slug: 'journaling-post-trade-review', title: 'Jurnal & Review Pasca-Eksekusi', category: 'Operations' }
    ],
    references: [
      { title: 'The Disciplined Trader', author: 'Mark Douglas', year: '1990' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 11: LOGICAL STOP LOSS & ASYMMETRIC RR
  // ==========================================
  'logical-stop-loss-asymmetric-rr': {
    id: 'art-risk-management',
    nodeId: 'node-5-2',
    slug: 'logical-stop-loss-asymmetric-rr',
    title: 'Manajemen Risiko: Stop Loss Logis & Asimetris R:R (Aturan 1%)',
    category: 'Risk Management',
    level: 5,
    readingTimeMinutes: 12,
    difficulty: 'Advanced',
    summary: 'Matematika bertahan hidup seorang trader profesional: penentuan titik invalidasi struktural objektif, hukum drawdown eksponensial, dan formula kalkulasi lot dinamis.',
    prerequisites: ['ltf-shift-entry-protocol'],
    tableOfContents: [
      { id: 'stop-loss-as-invalidation', title: '1. Hakikat Stop Loss: Titik Invalidasi Objektif' },
      { id: 'drawdown-math-table', title: '2. Tabel Matematika Pemulihan Kerugian (Drawdown)' },
      { id: 'asymmetric-risk-reward', title: '3. Keajaiban Rasio Risk to Reward Asimetris' },
      { id: 'one-percent-rule', title: '4. Aturan Risiko Maksimal 1% Modal' },
      { id: 'lot-sizing-formula', title: '5. Formula Kalkulasi Ukuran Posisi Dinamis' },
      { id: 'key-takeaways', title: '6. Rangkuman & Pedoman Disiplin' }
    ],
    sections: [
      {
        id: 'stop-loss-as-invalidation',
        title: '1. Hakikat Stop Loss: Titik Invalidasi Objektif',
        content: `Bagi trader amatir, Stop Loss terasa seperti "hukuman" atau "beban". Bagi trader institusi, Stop Loss adalah **ongkos bisnis terencana (*Cost of Doing Business*)** dan **pintu keluar logis**.

Titik Stop Loss yang benar bukan angka acak 20 pip, melainkan **titik invalidasi struktural**: level di mana jika harga menyentuhnya, maka seluruh tesis analisa teknikal Anda resmi terbukti salah. Menolak memasang Stop Loss sama dengan mengemudi mobil berkecepatan 200 km/jam tanpa rem.`
      },
      {
        id: 'drawdown-math-table',
        title: '2. Tabel Matematika Pemulihan Kerugian (Drawdown)',
        content: `Mengapa trader profesional sangat protektif terhadap modal mereka? Karena matematika pemulihan kerugian (*Drawdown Recovery Math*) bersifat eksponensial:

### Tabel Matematika Pemulihan Kerugian Akun:

| Penurunan Modal (Loss) | Modal Tersisa | Keuntungan Diperlukan untuk Breakeven | Tingkat Kesulitan Pemulihan |
| :--- | :--- | :--- | :--- |
| **10%** | 90% | **11.1%** | Sangat Mudah & Normal |
| **20%** | 80% | **25.0%** | Terkelola dengan Disiplin |
| **30%** | 70% | **42.8%** | Mulai Berat |
| **50%** | 50% | **100.0% (Wajib 2x Lipat!)** | Sangat Sulit & Rentan Hancur |
| **75%** | 25% | **300.0%** | Nyaris Mustahil |
| **90%** | 10% | **900.0%** | Secara Statistik Sudah Mati |`,
        callout: {
          type: 'warning',
          title: 'Hukum Eksponensial',
          text: 'Kehilangan 50% modal membutuhkan profit 100% dari sisa saldo hanya untuk kembali ke titik impas awal. Jangan pernah biarkan modal Anda tergelincir ke jurang drawdown dalam!'
        }
      },
      {
        id: 'asymmetric-risk-reward',
        title: '3. Keajaiban Rasio Risk to Reward Asimetris',
        content: `Banyak orang mengira menjadi trader kaya membutuhkan win rate 80-90%. Ini adalah kesalahpahaman total.
Dengan rasio **Risk to Reward minimal 1:3**, Anda hanya membutuhkan win rate 30% untuk mencetak profit bersih yang konsisten:

Misal dari 10 trade berisiko $100 per trade:
- 7 kali Kalah = -$700
- 3 kali Menang (3 × $300) = +$900
- **Hasil Bersih**: Profit **+$200** meskipun Anda kalah 70% dari waktu Anda!`
      },
      {
        id: 'lot-sizing-formula',
        title: '5. Formula Kalkulasi Ukuran Posisi Dinamis',
        content: `Jangan pernah menggunakan ukuran lot tetap (misal: "saya selalu trading 0.5 lot"). Ukuran lot wajib dihitung dinamis setiap kali membuka posisi:

$$\\text{Ukuran Lot} = \\frac{\\text{Modal Akun} \\times \\text{Toleransi Risiko (1%)}}{\\text{Jarak Stop Loss dalam Pips} \\times \\text{Nilai per Pip}}$$`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menggeser Stop Loss menjauh saat harga mendekati titik rugi.',
        correction: 'Menerima kerugian kecil yang terencana adalah satu-satunya pelindung dari kerugian yang mematikan.'
      }
    ],
    keyTakeaways: [
      'Batasi risiko maksimal 1% dari total ekuitas akun per satu transaksi.',
      'Targetkan Risk to Reward minimal 1:2 atau 1:3 untuk membangun keunggulan matematis.',
      'Hitung ukuran lot secara dinamis berdasarkan jarak Stop Loss, bukan tebakan.'
    ],
    relatedTopics: [
      { slug: 'journaling-post-trade-review', title: 'Jurnal & Review Pasca-Eksekusi', category: 'Operations' }
    ],
    references: [
      { title: 'The Mathematics of Money Management', author: 'Ralph Vince', year: '1992' }
    ]
  },

  // ==========================================
  // MATERI PRICE ACTION 12: JOURNALING & POST-TRADE REVIEW
  // ==========================================
  'journaling-post-trade-review': {
    id: 'art-journaling-review',
    nodeId: 'node-5-3',
    slug: 'journaling-post-trade-review',
    title: 'Jurnal Trading & Review Pasca-Eksekusi: Audit Statistik & Edge',
    category: 'Trading Operations',
    level: 5,
    readingTimeMinutes: 11,
    difficulty: 'Advanced',
    summary: 'Membangun bisnis trading berbasis data: dokumentasi forensik transaksi, 4 metrik kinerja kuantitatif (Expectancy, Profit Factor, MDD), dan audit mingguan eliminasi emosi.',
    prerequisites: ['logical-stop-loss-asymmetric-rr'],
    tableOfContents: [
      { id: 'why-journaling-matters', title: '1. Mengapa Trader Tanpa Jurnal Adalah Penjudi' },
      { id: 'four-core-metrics', title: '2. Empat Metrik Statistik Wajib' },
      { id: 'journal-template-table', title: '3. Template Struktur Jurnal Forensik' },
      { id: 'weekly-audit-routine', title: '4. Rutinitas Audit Mingguan & Deteksi Tilt' },
      { id: 'key-takeaways', title: '5. Rangkuman & Protokol Bisnis' }
    ],
    sections: [
      {
        id: 'why-journaling-matters',
        title: '1. Mengapa Trader Tanpa Jurnal Adalah Penjudi',
        content: `Peter Drucker pernah menyatakan: *"Apa yang tidak dapat diukur, tidak dapat dikelola."*
Seorang trader tanpa jurnal tidak memiliki bisnis; mereka hanya memiliki hobi spekulasi yang mahal.

Jurnal trading bukan sekadar daftar untung-rugi nominal uang. Jurnal adalah catatan forensik yang membuktikan:
- Apakah Anda benar-benar mematuhi Trading Plan Anda?
- Setup teknikal mana yang menghasilkan ekspektansi tertinggi?
- Pada hari atau sesi apa Anda paling sering membuat kesalahan impulsif?`
      },
      {
        id: 'four-core-metrics',
        title: '2. Empat Metrik Statistik Wajib',
        content: `Setiap bulan, hitung metrik kuantitatif akun Anda:
1. **Mathematical Expectancy ($E$)**: Nilai rata-rata keuntungan per dolar yang dirisikokan.
2. **Profit Factor**: Total kotor keuntungan dibagi total kotor kerugian (Sistem sehat memiliki Profit Factor $> 1.75$).
3. **Maximum Drawdown (MDD)**: Penurunan persentase terbesar dari puncak ekuitas.
4. **Win/Loss Ratio**: Perbandingan persentase kemenangan terhadap rata-rata rasio R:R aktual.`
      },
      {
        id: 'journal-template-table',
        title: '3. Template Struktur Jurnal Forensik',
        content: `### Tabel Kolom Wajib Jurnal Trading Standar Institusi:

| Kolom Data | Deskripsi Isi Catatan | Tujuan Evaluasi |
| :--- | :--- | :--- |
| **Tanggal & Waktu** | Waktu entri dan sesi lelang (misal: London Open 14:30 WIB) | Mengetahui sesi trading paling menguntungkan Anda |
| **Instrumen & Arah** | Pasangan mata uang / aset (misal: EUR/USD - Long) | Memetakan aset yang paling cocok dengan karakter Anda |
| **Setup Model** | Alasan teknikal (misal: H4 Demand + M5 CHoCH + Sweep SSL) | Menguji *edge* dari masing-masing jenis setup |
| **Risiko Nominal & %** | Besaran dolar yang dirisikokan (misal: $100 / 1%) | Memastikan konsistensi manajemen risiko disiplin |
| **Rasio R:R Terencana** | Target perbandingan keuntungan (misal: 1:3.5) | Memastikan keunggulan matematis sebelum entry |
| **Rasio R:R Aktual** | Hasil akhir yang direalisasikan (misal: +3.5R atau -1R) | Menghitung Expectancy matematis riil sistem |
| **Catatan Emosi** | Kondisi mental (Tenang / Takut / FOMO / Revenge) | Mendeteksi amigdala hijack dan pemicu *tilt* |`,
        visualType: 'risk_reward_calc'
      },
      {
        id: 'weekly-audit-routine',
        title: '4. Rutinitas Audit Mingguan & Deteksi Tilt',
        content: `Setiap akhir pekan saat pasar tutup:
1. Buka kembali seluruh tangkapan layar (*screenshot*) grafik transaksi Anda.
2. Kelompokkan trade yang kalah ke dalam dua kategori:
   - **Good Loss**: Trade yang kalah namun mematuhi 100% aturan Trading Plan Anda (ini adalah biaya bisnis normal).
   - **Bad Loss**: Trade yang kalah akibat melanggar aturan (misal: FOMO, memindahkan SL, atau lot berlebihan).
3. Eliminasi perilaku penyebab *Bad Loss* pada pekan berikutnya.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Hanya mencatat trade yang menang dan menghapus jejak trade yang kalah.',
        correction: 'Trade yang kalah adalah sumber data paling berharga untuk menyempurnakan kelemahan sistem Anda.'
      }
    ],
    keyTakeaways: [
      'Jurnal trading adalah dokumen wajib yang membedakan trader profesional dari amatir.',
      'Hitung Expectancy dan Profit Factor setiap minimal sampel 30 transaksi.',
      'Kekalahan yang mematuhi aturan plan adalah Good Loss; kekalahan akibat melanggar aturan adalah racun modal.'
    ],
    relatedTopics: [
      { slug: 'logical-stop-loss-asymmetric-rr', title: 'Manajemen Risiko 1%', category: 'Risk' },
      { slug: 'what-is-trading-fundamentals', title: 'Mengenal Trading Fundamental', category: 'Fundamentals' }
    ],
    references: [
      { title: 'Trade Your Way to Financial Freedom', author: 'Van K. Tharp', year: '1998' }
    ]
  }
};

// Aliases for seamless routing between roadmap node slugs and article slugs
EDUCATIONAL_ARTICLES['valid-swing-high-low'] = EDUCATIONAL_ARTICLES['valid-swing-high-low'];
EDUCATIONAL_ARTICLES['market-structure-bos-choch'] = EDUCATIONAL_ARTICLES['bos-vs-choch'];
EDUCATIONAL_ARTICLES['support-resistance-liquidity'] = EDUCATIONAL_ARTICLES['bsl-ssl-liquidity-pools'];
EDUCATIONAL_ARTICLES['liquidity-pools-inducement'] = EDUCATIONAL_ARTICLES['liquidity-sweep-fakeout-mechanics'];
EDUCATIONAL_ARTICLES['fair-value-gaps-imbalance'] = EDUCATIONAL_ARTICLES['premium-vs-discount-pricing'];
EDUCATIONAL_ARTICLES['supply-demand-order-blocks'] = EDUCATIONAL_ARTICLES['supply-demand-fresh-mitigated'];
EDUCATIONAL_ARTICLES['risk-management-1percent-rule'] = EDUCATIONAL_ARTICLES['logical-stop-loss-asymmetric-rr'];
EDUCATIONAL_ARTICLES['risk-management-1-percent'] = EDUCATIONAL_ARTICLES['logical-stop-loss-asymmetric-rr'];
EDUCATIONAL_ARTICLES['trading-journal-metrics'] = EDUCATIONAL_ARTICLES['journaling-post-trade-review'];

export function getArticleBySlug(slug: string): EducationalArticle | null {
  return EDUCATIONAL_ARTICLES[slug] || null;
}

export function getAllArticles(): EducationalArticle[] {
  const seen = new Set<string>();
  const list: EducationalArticle[] = [];
  
  for (const article of Object.values(EDUCATIONAL_ARTICLES)) {
    if (!seen.has(article.id)) {
      seen.add(article.id);
      list.push(article);
    }
  }
  return list;
}
