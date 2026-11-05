import { QuizQuestion } from '../seedData.ts';

export const allQuizzesData: Record<string, QuizQuestion[]> = {
  // Price Action Quizzes
  'node-1-1': [
    {
      id: 'q-1-1-1',
      question: 'Apa informasi paling objektif yang disampaikan oleh penutupan (Close) sebuah candlestick?',
      options: [
        'Sentimen spekulasi sesaat yang mudah berubah',
        'Fakta akhir hasil lelang antara buyer dan seller pada rentang waktu tersebut',
        'Besaran pips stop loss yang wajib dipasang',
        'Sinyal konfirmasi indikator lagging'
      ],
      correctAnswer: 1,
      explanation: 'Penutupan candle adalah satu-satunya data fakta final yang mengonfirmasi siapa pemenang lelang dalam sesi tersebut.'
    },
    {
      id: 'q-1-1-2',
      question: 'Sumbu (wick) panjang di bagian atas candle dengan penutupan di bagian bawah menandakan apa?',
      options: [
        'Dominasi buyer yang tak terbendung',
        'Penolakan harga (price rejection) dan penyerapan agresif oleh seller di harga tinggi',
        'Sinyal buy breakout instan',
        'Tidak ada makna struktural'
      ],
      correctAnswer: 1,
      explanation: 'Sumbu panjang atas mencerminkan upaya buyer mendorong harga yang kemudian dipukul mundur oleh likuiditas penawaran seller.'
    }
  ],
  'node-1-2': [
    {
      id: 'q-1-2-1',
      question: 'Bagaimana hubungan fraktal antara Higher Timeframe (HTF) dan Lower Timeframe (LTF)?',
      options: [
        'Setiap timeframe terisolasi dan tidak berhubungan',
        'Chart bersifat fraktal: gelombang tren di LTF adalah bagian dari satu candle atau koreksi di HTF',
        'LTF mendikte tren makro pasar',
        'Timeframe harian tidak berguna untuk day trader'
      ],
      correctAnswer: 1,
      explanation: 'Prinsip fraktalitas membuktikan bahwa struktur mikro di timeframe kecil menyusun gelombang lelang di timeframe besar.'
    }
  ],
  'node-2-1': [
    {
      id: 'q-2-1-1',
      question: 'Kapan sebuah Swing High dapat dinyatakan valid secara objektif?',
      options: [
        'Setiap kali candle berganti warna menjadi merah',
        'Ketika diapit minimal oleh candle kiri dan kanan dengan high lebih rendah serta membentuk pullback candle yang jelas',
        'Ketika harga bergerak menembus rata-rata bergerak (MA)',
        'Kapan saja trader ingin menandainya'
      ],
      correctAnswer: 1,
      explanation: 'Swing point objektif memerlukan aturan formasi candle pembatas (left & right bars) serta pullback lelang valid.'
    }
  ],
  'node-2-2': [
    {
      id: 'q-2-2-1',
      question: 'Apa perbedaan mendasar antara Break of Structure (BOS) dan Change of Character (CHoCH)?',
      options: [
        'BOS menandakan kelanjutan momentum searah tren, sedangkan CHoCH menandakan pergeseran karakter awal melawan struktur',
        'BOS hanya terjadi di pasar saham, CHoCH di forex',
        'Keduanya merupakan istilah yang persis sama',
        'CHoCH tidak memerlukan penutupan body candle'
      ],
      correctAnswer: 0,
      explanation: 'BOS mengonfirmasi kelanjutan tren (Higher High baru atau Lower Low baru), sedangkan CHoCH adalah penembusan pivot pelindung yang memberi peringatan dini pergeseran kontrol.'
    }
  ],
  'node-2-3': [
    {
      id: 'q-2-3-1',
      question: 'Mengapa Strong (Protected) High/Low menjadi tempat ideal meletakkan Stop Loss?',
      options: [
        'Karena level tersebut bertanggung jawab atas terjadinya BOS baru dan cenderung dilindungi institusi',
        'Karena posisinya acak di tengah chart',
        'Agar Stop Loss berjarak tepat 10 pips',
        'Karena mudah ditembus oleh market maker'
      ],
      correctAnswer: 0,
      explanation: 'Protected extremes adalah asal mula pergerakan kuat yang memecahkan struktur; jika level ini ditembus, tesis analisa terbukti salah.'
    }
  ],
  'node-3-1': [
    {
      id: 'q-3-1-1',
      question: 'Mengapa zona Demand yang "Fresh" memiliki probabilitas pantulan lebih tinggi daripada zona "Mitigated"?',
      options: [
        'Karena zona fresh belum pernah disentuh sehingga sisa resting limit order institusi masih utuh belum terserap',
        'Karena zona fresh selalu berwarna hijau di chart',
        'Karena zona mitigated memiliki lebih banyak pembeli',
        'Tidak ada perbedaan antara fresh dan mitigated'
      ],
      correctAnswer: 0,
      explanation: 'Setiap pengujian zona menyerap sebagian pesanan institusi. Zona yang sudah berkali-kali disentuh akan kehilangan daya tahan beli/jual.'
    }
  ],
  'node-3-2': [
    {
      id: 'q-3-2-1',
      question: 'Di area mana trader institusional mencari posisi BUY sesuai prinsip lelang grosir (Auction Equilibrium)?',
      options: [
        'Di area Premium (> 50% range harga)',
        'Di puncak tertinggi swing high',
        'Di area Discount (< 50% range harga di bawah equilibrium)',
        'Hanya saat indikator RSI di atas 80'
      ],
      correctAnswer: 2,
      explanation: 'Institusi membeli di harga grosir diskon (di bawah 50% rentang lelang aktif) dan menjual di harga premium mahal.'
    }
  ],
  'node-4-1': [
    {
      id: 'q-4-1-1',
      question: 'Apa isi sebenarnya dari kumpulan Buy-Side Liquidity (BSL) di atas area Double Top?',
      options: [
        'Kumpulan order Stop Loss dari para seller dan Buy Stop dari para breakout trader retail',
        'Volume transaksi investor ritel kecil yang tidak penting',
        'Hanya garis resisten imajiner',
        'Area di mana institusi memasang stop loss mereka'
      ],
      correctAnswer: 0,
      explanation: 'BSL di atas level puncak berisi tumpukan pesanan beli paksa (stop loss dari short seller dan breakout buyers) yang menjadi bahan bakar institusi melepas posisi.'
    }
  ],
  'node-4-2': [
    {
      id: 'q-4-2-1',
      question: 'Apa tanda paling nyata bahwa sebuah penembusan resistance adalah Liquidity Sweep dan bukan Breakout asli?',
      options: [
        'Volume transaksi tiba-tiba menjadi nol',
        'Harga menembus pucuk dengan sumbu (wick), candle menutup kembali di bawah resistance, dan langsung diiringi displacement agresif ke bawah',
        'Tiga candle berturut-turut ditutup tebal di atas resistance',
        'Indikator MACD bersilangan ke atas'
      ],
      correctAnswer: 1,
      explanation: 'Liquidity sweep ditandai dengan penolakan cepat (wick rejection) dan displacement tegas kembali ke dalam rentang range.'
    }
  ],
  'node-5-1': [
    {
      id: 'q-5-1-1',
      question: 'Apa fungsi utama protokol konfirmasi Lower Timeframe (LTF) shift sebelum entry?',
      options: [
        'Untuk memprediksi masa depan dengan kepastian 100%',
        'Untuk mempersempit jarak Stop Loss secara drastis dan mengonfirmasi bahwa momentum mikro sudah berbalik searah bias makro',
        'Agar bisa membuka puluhan posisi scalping dalam 1 menit',
        'Menghindari penggunaan stop loss'
      ],
      correctAnswer: 1,
      explanation: 'LTF shift memberikan konfirmasi bahwa pembeli/penjual telah mengambil alih kontrol, memungkinkan rasio Risk/Reward jauh lebih asimetris.'
    }
  ],
  'node-5-2': [
    {
      id: 'q-5-2-1',
      question: 'Berapa batas risiko maksimal per transaksi yang direkomendasikan secara institusional untuk menjaga kelangsungan akun?',
      options: [
        '10% - 15% dari total ekuitas',
        '1% hingga maksimal 2% dari total ekuitas',
        '50% jika setup terlihat sangat bagus',
        'Bebas tergantung keyakinan emosional trader'
      ],
      correctAnswer: 1,
      explanation: 'Risiko 1% menjaga probabilitas Risk of Ruin mendekati nol dan memungkinkan akun bertahan melewati rentetan kekalahan wajar.'
    }
  ],
  'node-5-3': [
    {
      id: 'q-5-3-1',
      question: 'Mengapa jurnal trading pasca-eksekusi merupakan pembeda utama antara trader profesional dan penjudi?',
      options: [
        'Karena jurnal memberikan audit objektif atas kepatuhan SOP, statistik win rate, dan loop evaluasi psikologi eksekusi',
        'Karena jurnal hanya formalitas untuk dipamerkan di media sosial',
        'Agar bisa mengingat berapa banyak keuntungan yang didapat hari ini',
        'Tidak ada gunanya jika kita sudah berpengalaman'
      ],
      correctAnswer: 0,
      explanation: 'Tanpa data statistik dan audit jurnal yang jujur, seorang trader tidak dapat memisahkan antara keahlian eksekusi vs keberuntungan sesaat.'
    }
  ],

  // Smart Money Concepts (SMC) Quizzes
  'smc-1-1': [
    {
      id: 'q-smc-1-1-1',
      question: 'Apa peran Inducement (IDM) dalam arsitektur lelang IPDA institusional?',
      options: [
        'Titik swing minor yang sengaja diciptakan untuk memancing likuiditas counter-party retail sebelum pergerakan asli dimulai',
        'Sinyal konfirmasi entry buy langsung',
        'Indikator pembalikan tren jangka panjang',
        'Zona resistensi kuat yang tidak akan pernah ditembus'
      ],
      correctAnswer: 0,
      explanation: 'Inducement adalah rekayasa likuiditas untuk mengorbankan stop loss retail guna mengisi pesanan skala masif institusi.'
    }
  ],
  'smc-1-2': [
    {
      id: 'q-smc-1-2-1',
      question: 'Bagaimana Fair Value Gap (FVG) diukur secara objektif pada grafik candlestick?',
      options: [
        'Celah antara High Candle 1 dan Low Candle 3 pada formasi 3 candlestick berurutan',
        'Jarak antara Open dan Close candle Doji',
        'Celah gap mingguan antara pasar tutup Jumat dan buka Senin',
        'Perbedaan harga antara bid dan ask broker'
      ],
      correctAnswer: 0,
      explanation: 'FVG diukur dari celah ketidaktertumpukan (no overlap) antara sumbu candle 1 dan sumbu candle 3 yang mengapit candle impulsif.'
    }
  ],
  'smc-2-1': [
    {
      id: 'q-smc-2-1-1',
      question: 'Apa yang dimaksud dengan Mean Threshold (MT) pada Order Block?',
      options: [
        'Titik puncak tertinggi sumbu candle',
        'Level tengah 50% dari body candle Order Block',
        'Rata-rata volume 10 hari terakhir',
        'Garis Moving Average 20'
      ],
      correctAnswer: 1,
      explanation: 'Mean Threshold adalah titik tengah 50% dari candle body Order Block; jika candle berikutnya menutup melewati level ini, OB dianggap batal.'
    }
  ],
  'smc-2-2': [
    {
      id: 'q-smc-2-2-1',
      question: 'Kapan sebuah Order Block berubah status menjadi Breaker Block?',
      options: [
        'Ketika OB tersebut gagal menahan harga setelah sebelumnya memicu sweep likuiditas dan kemudian ditembus dengan displacement kuat',
        'Ketika OB tersebut sudah diuji lebih dari 5 kali',
        'Ketika hari berganti ke sesi berikutnya',
        'Hanya di pasar kripto pada hari libur'
      ],
      correctAnswer: 0,
      explanation: 'Breaker Block adalah order block yang tersapu setelah memicu sweep likuiditas; institusi yang terjebak akan memitigasi posisi saat harga menguji kembali level ini.'
    }
  ],
  'smc-2-3': [
    {
      id: 'q-smc-2-3-1',
      question: 'Apa perbedaan antara Volume Imbalance (VI) dan Fair Value Gap (FVG)?',
      options: [
        'Volume Imbalance memiliki sumbu (wick) yang saling bertumpukan namun ada celah pada body candle, sedangkan FVG memiliki celah total antara sumbu',
        'Volume Imbalance hanya terjadi di timeframe Monthly',
        'Volume Imbalance tidak pernah dikunjungi kembali oleh algoritma',
        'Keduanya persis sama tanpa perbedaan teknis'
      ],
      correctAnswer: 0,
      explanation: 'Volume Imbalance adalah celah body-to-body di mana ekor lilin bertumpukan namun ketiadaan volume body meninggalkan celah lelang mikro.'
    }
  ],
  'smc-3-1': [
    {
      id: 'q-smc-3-1-1',
      question: 'Apa tujuan dari pergerakan Judas Swing saat pembukaan sesi London?',
      options: [
        'Mendorong harga menembus Asian High/Low untuk menjebak breakout trader dan mengambil stop loss sebelum berbalik arah ke tren harian sesungguhnya',
        'Mengikuti arah pergerakan sesi Tokyo secara linier',
        'Menciptakan konsolidasi sepanjang hari tanpa volatilitas',
        'Memfasilitasi penutupan pasar New York'
      ],
      correctAnswer: 0,
      explanation: 'Judas Swing adalah gerakan manipulasi tipuan klasik pembukaan London yang memburu likuiditas sesi Asia sebelum memulai ekspansi tren sejati.'
    }
  ],
  'smc-3-2': [
    {
      id: 'q-smc-3-2-1',
      question: 'Kapan jendela waktu New York Killzone paling bervolume berlangsung (waktu EST)?',
      options: [
        '07:00 AM - 10:00 AM EST',
        '12:00 PM - 02:00 PM EST',
        '05:00 PM - 08:00 PM EST',
        '00:00 AM - 03:00 AM EST'
      ],
      correctAnswer: 0,
      explanation: '07:00 - 10:00 AM EST adalah New York Killzone utama di mana rilis berita ekonomi berdampak tinggi dan pembukaan saham AS memicu ekspansi terbesar.'
    }
  ],
  'smc-3-3': [
    {
      id: 'q-smc-3-3-1',
      question: 'Dalam siklus Power of Three (AMD), apa tahapan yang menciptakan ekor (wick) manipulasi pada candle harian?',
      options: [
        'Fase Accumulation',
        'Fase Manipulation (harga bergerak berlawanan dengan arah ekspansi sejati)',
        'Fase Distribution',
        'Fase Invalidation'
      ],
      correctAnswer: 1,
      explanation: 'Fase Manipulasi adalah dorongan palsu di dekat harga Open yang menciptakan sumbu harian sebelum ekspansi sejati mengambil alih.'
    }
  ],
  'smc-4-1': [
    {
      id: 'q-smc-4-1-1',
      question: 'Jika EUR/USD mencetak Higher High baru, namun GBP/USD gagal mencetak Higher High dan membentuk Lower High, divergensi apa yang terjadi?',
      options: [
        'Bearish SMT Divergence, mengindikasikan pelemahan institusi pada pasangan mata uang GBP/USD',
        'Bullish Continuation tanpa hambatan',
        'Tidak ada korelasi antar kedua aset',
        'Divergensi MACD lagging'
      ],
      correctAnswer: 0,
      explanation: 'Bearish SMT Divergence pada aset berkorelasi positif membuktikan institusi tidak mensponsori kenaikan harga secara serempak.'
    }
  ],
  'smc-4-2': [
    {
      id: 'q-smc-4-2-1',
      question: 'Di dalam matriks PD Array, di mana letak zona eksekusi BUY yang memiliki probabilitas tertinggi?',
      options: [
        'Di area Premium di atas level 50% dealing range',
        'Di area Discount di bawah level 50% dealing range pada FVG atau Bullish Order Block',
        'Di puncak swing high tertinggi',
        'Tepat di level 100% Fibonacci'
      ],
      correctAnswer: 1,
      explanation: 'SOP institusional mewajibkan posisi Buy hanya dieksekusi di area Discount (< 50% Equilibrium) pada PD Array yang valid.'
    }
  ],
  'smc-5-1': [
    {
      id: 'q-smc-5-1-1',
      question: 'Kapan jendela waktu eksekusi ICT Silver Bullet New York sesi pagi berlangsung?',
      options: [
        '10:00 AM - 11:00 AM EST',
        '08:00 AM - 09:00 AM EST',
        '01:00 PM - 02:00 PM EST',
        '06:00 AM - 07:00 AM EST'
      ],
      correctAnswer: 0,
      explanation: 'Jendela waktu New York AM Silver Bullet berlangsung tepat pukul 10:00 hingga 11:00 AM EST berbasis setup FVG pasca sweep likuiditas.'
    }
  ],
  'smc-5-2': [
    {
      id: 'q-smc-5-2-1',
      question: 'Kapan Stop Loss boleh dipindahkan ke Breakeven (BE) sesuai protokol manajemen institusional?',
      options: [
        'Segera setelah posisi floating profit 2 pips',
        'Hanya setelah harga berhasil membentuk Break of Structure (BOS) baru yang meninggalkan Order Block pendukung',
        'Tepat 1 menit setelah order tereksekusi',
        'Tidak boleh pernah dipindahkan'
      ],
      correctAnswer: 1,
      explanation: 'Memindahkan SL terlalu dini sering memicu penutupan posisi prematur oleh sumbu mitigasi; tunggu struktur baru terkonfirmasi.'
    }
  ],

  // Wyckoff Method Quizzes
  'wyk-1-1': [
    {
      id: 'q-wyk-1-1-1',
      question: 'Menurut Hukum Usaha vs Hasil (Effort vs Result) Wyckoff, jika sebuah candle memiliki volume ultra-tinggi tetapi spread harganya sangat sempit, apa yang sedang terjadi?',
      options: [
        'Terjadi ketidaksesuaian (divergensi); ada pihak besar yang menyerap seluruh usaha transaksi sehingga potensi pembalikan arah tinggi',
        'Pasar sedang kekurangan likuiditas',
        'Harga pasti akan meledak searah candle tersebut',
        'Indikator volume sedang rusak'
      ],
      correctAnswer: 0,
      explanation: 'Usaha masif (volume tinggi) tanpa hasil progres harga membuktikan adanya absorption oleh Smart Money.'
    }
  ],
  'wyk-1-2': [
    {
      id: 'q-wyk-1-2-1',
      question: 'Apa yang menjadi ciri khas dari sinyal "Stopping Volume" dalam Volume Spread Analysis (VSA)?',
      options: [
        'Volume sangat tinggi pada candle bearish berrentang lebar di akhir tren turun, di mana bar berikutnya langsung ditutup positif mengonfirmasi penyerapan penjualan',
        'Volume nol saat pasar libur',
        'Candle doji dengan volume sangat rendah di tengah tren naik',
        'Spread sempit tanpa ada transaksi'
      ],
      correctAnswer: 0,
      explanation: 'Stopping volume terjadi ketika institusi menyerap seluruh kepanikan penjualan publik pada volume kolosal, menghentikan tren turun.'
    }
  ],
  'wyk-2-1': [
    {
      id: 'q-wyk-2-1-1',
      question: 'Level apa yang mendefinisikan batas atas (Resistance) dari sebuah Trading Range Akumulasi Wyckoff?',
      options: [
        'Titik tertinggi dari Automatic Rally (AR)',
        'Garis moving average 200',
        'Titik terendah Selling Climax',
        'High sesi Asia'
      ],
      correctAnswer: 0,
      explanation: 'Puncak pantulan teknis Automatic Rally (AR) di Fase A mendefinisikan batas atas resistance resmi dari rentang akumulasi.'
    }
  ],
  'wyk-2-2': [
    {
      id: 'q-wyk-2-2-1',
      question: 'Apa karakteristik utama dari Spring Tipe 3 (High-Probability Spring) dalam Fase C Wyckoff?',
      options: [
        'Penetrasi semu ke bawah support Trading Range yang terjadi dengan volume transaksi sangat rendah (No Supply), menandakan habisnya tekanan penjual',
        'Penembusan support dengan volume kolosal yang langsung anjlok bebas',
        'Konsolidasi berbulan-bulan tanpa pergerakan',
        'Breakout ke atas resistance'
      ],
      correctAnswer: 0,
      explanation: 'Spring Tipe 3 membuktikan bahwa saat support ditembus, tidak ada lagi pihak yang menjual; jalur kenaikan harga terbuka lebar.'
    }
  ],
  'wyk-2-3': [
    {
      id: 'q-wyk-2-3-1',
      question: 'Di titik mana posisi BUY paling berisiko rendah (Low-Risk Entry) dieksekusi pada Fase D/E Akumulasi?',
      options: [
        'Pada Last Point of Support (LPS) setelah terjadinya Sign of Strength (SOS)',
        'Di awal Selling Climax saat pasar sedang panik',
        'Di puncak tertinggi setelah harga naik 50%',
        'Sebelum Trading Range terbentuk'
      ],
      correctAnswer: 0,
      explanation: 'LPS adalah pullback korektif bervolume tipis pasca konfirmasi SOS yang menawarkan rasio R:R terbaik.'
    }
  ],
  'wyk-3-1': [
    {
      id: 'q-wyk-3-1-1',
      question: 'Peristiwa apa yang menandai pelepasan inventaris institusi secara masif kepada publik yang sedang euforia di puncak pasar?',
      options: [
        'Buying Climax (BC) pada volume raksasa di Fase A Distribusi',
        'Selling Climax di dasar pasar',
        'The Spring di bawah support',
        'Preliminary Support'
      ],
      correctAnswer: 0,
      explanation: 'Buying Climax adalah momen ketika Smart Money menjual jutaan lot kepemilikan mereka kepada retail trader yang sedang FOMO.'
    }
  ],
  'wyk-3-2': [
    {
      id: 'q-wyk-3-2-1',
      question: 'Apa singkatan dari UTAD dalam fase distribusi Wyckoff?',
      options: [
        'Upthrust After Distribution',
        'Universal Trend Analysis Data',
        'Underpriced Trading Asset Division',
        'Ultimate Target Area Distribution'
      ],
      correctAnswer: 0,
      explanation: 'UTAD (Upthrust After Distribution) adalah gerakan jebakan menembus pucuk resisten sebelum penurunan harga dahsyat (Markdown).'
    }
  ],
  'wyk-4-1': [
    {
      id: 'q-wyk-4-1-1',
      question: 'Berdasarkan Hukum Sebab & Akibat, bagaimana grafik Point & Figure (P&F) digunakan dalam metode Wyckoff?',
      options: [
        'Menghitung jumlah kolom horisontal akumulasi untuk memproyeksikan target jarak harga markup secara matematis',
        'Menentukan warna candlestick harian',
        'Mengukur waktu rilis berita ekonomi',
        'Menghitung suku bunga bank sentral'
      ],
      correctAnswer: 0,
      explanation: 'P&F horizontal count mengukur besaran "sebab" (durasi akumulasi) untuk mengestimasi besaran "akibat" (target harga).'
    }
  ],
  'wyk-4-2': [
    {
      id: 'q-wyk-4-2-1',
      question: 'Bagaimana cara membedakan struktur Reakumulasi dari Redistribusi saat harga berkonsolidasi di tengah tren naik?',
      options: [
        'Pada Reakumulasi, volume saat harga terkoreksi ke bawah menyusut drastis dan terbentuk higher lows struktural',
        'Pada Reakumulasi, harga selalu anjlok drastis ke bawah nol',
        'Tidak ada cara untuk membedakannya',
        'Cukup menggunakan indikator RSI'
      ],
      correctAnswer: 0,
      explanation: 'Reakumulasi ditandai dengan keringnya volume jual saat pengujian batas bawah rentang konsolidasi.'
    }
  ],
  'wyk-5-1': [
    {
      id: 'q-wyk-5-1-1',
      question: 'Apa yang dimaksud dengan metafora Jump Across the Creek (JAC)?',
      options: [
        'Lonjakan harga bervolume besar yang menyeberangi garis resistensi berliku Trading Range akumulasi',
        'Harga menembus support ke level terendah baru',
        'Trader melompat keluar dari pasar tanpa alasan',
        'Koreksi sideways di sesi Asia'
      ],
      correctAnswer: 0,
      explanation: 'JAC adalah lompatan momentum bervolume tinggi yang melompati garis resisten lelang sebelum pullback konfirmasi di BUEC.'
    }
  ],
  'wyk-5-2': [
    {
      id: 'q-wyk-5-2-1',
      question: 'Apa konfirmasi yang diberikan oleh bar "No Demand Test" di dekat area resistensi?',
      options: [
        'Spread lilin sempit dengan volume sangat kering membuktikan ketiadaan minat buyer profesional untuk mendorong harga lebih tinggi',
        'Konfirmasi untuk langsung membuka posisi buy full margin',
        'Pasar akan langsung melesat naik 100 pips',
        'Tanda bahwa tren bullish baru saja dimulai'
      ],
      correctAnswer: 0,
      explanation: 'No Demand bar membuktikan ketiadaan komitmen pembeli institusi, memberikan sinyal waspada bagi pembeli.'
    }
  ],

  // Risk Management & Psychology Quizzes
  'risk-1-1': [
    {
      id: 'q-risk-1-1-1',
      question: 'Jika akun Anda mengalami kerugian (drawdown) sebesar -50%, berapa persentase keuntungan yang dibutuhkan hanya untuk kembali ke titik impas (breakeven)?',
      options: [
        '+100.0%',
        '+50.0%',
        '+75.0%',
        '+25.0%'
      ],
      correctAnswer: 0,
      explanation: 'Jika modal $10,000 turun 50% menjadi $5,000, Anda harus menghasilkan keuntungan 100% dari $5,000 agar kembali menjadi $10,000.'
    }
  ],
  'risk-1-2': [
    {
      id: 'q-risk-1-2-1',
      question: 'Dalam model Fixed Fractional Position Sizing, apa yang terjadi pada ukuran lot jika jarak Stop Loss Anda menjadi 2 kali lebih lebar?',
      options: [
        'Ukuran lot dipotong setengahnya (dibagi 2) agar nilai risiko uang tunai tetap identik',
        'Ukuran lot digandakan 2 kali lipat',
        'Ukuran lot tetap sama persis',
        'Stop loss dihapus dari terminal'
      ],
      correctAnswer: 0,
      explanation: 'Posisi lot disesuaikan secara terbalik dengan jarak pips SL agar kerugian moneter akun selalu berada pada persentase yang konstan.'
    }
  ],
  'risk-2-1': [
    {
      id: 'q-risk-2-1-1',
      question: 'Berapa nilai Expected Value (EV) per trade dari sistem dengan Win Rate 40%, rata-rata menang 3R, dan rata-rata kalah 1R?',
      options: [
        '+0.60R per trade',
        '-0.20R per trade',
        '+1.20R per trade',
        '0.00R (Impas)'
      ],
      correctAnswer: 0,
      explanation: 'EV = (0.40 × 3R) - (0.60 × 1R) = 1.20R - 0.60R = +0.60R positif!'
    }
  ],
  'risk-2-2': [
    {
      id: 'q-risk-2-2-1',
      question: 'Mengapa sistem dengan Win Rate 40% (R:R 1:3) bisa jauh lebih menguntungkan daripada sistem Win Rate 85% dengan R:R terbalik?',
      options: [
        'Karena asimetri imbal hasil membuat kerugian kecil mudah ditutupi oleh satu kemenangan besar, sedangkan sistem win rate tinggi dengan risiko negatif bisa hancur oleh sedikit kesalahan',
        'Karena win rate 40% terdengar lebih keren',
        'Karena broker menyukai trader yang sering kalah',
        'Tidak ada hubungannya dengan matematika'
      ],
      correctAnswer: 0,
      explanation: 'Asymmetric Risk/Reward melindungi akun dari malapetaka kegagalan beruntun yang tidak dapat dihindari.'
    }
  ],
  'risk-3-1': [
    {
      id: 'q-risk-3-1-1',
      question: 'Jika Anda membuka posisi Buy EURUSD, Buy GBPUSD, dan Buy Gold secara simultan, apa risiko portofolio tersembunyi yang Anda hadapi?',
      options: [
        'Seluruh posisi tersebut memiliki korelasi positif tinggi terhadap kelemahan US Dollar; jika USD menguat mendadak, ketiga posisi akan terkena Stop Loss bersamaan',
        'Anda telah melakukan diversifikasi sempurna tanpa risiko',
        'Keuntungan pasti berlipat tiga kali',
        'Tidak ada risiko korelasi'
      ],
      correctAnswer: 0,
      explanation: 'Ketiga instrumen memiliki basis eksposur yang sama terhadap DXY. Kerugian akan terakumulasi sekaligus saat dolar bergerak melawan posisi.'
    }
  ],
  'risk-3-2': [
    {
      id: 'q-risk-3-2-1',
      question: 'Apa tindakan wajib yang harus dilakukan seorang trader jika menyentuh batas kerugian harian maksimal (Max Daily Loss)?',
      options: [
        'Mengunci platform trading, mematikan terminal, dan berhenti trading untuk sisa hari tersebut guna mencegah tilt dan revenge trading',
        'Menambah deposit modal dan menggandakan ukuran lot untuk membalas dendam',
        'Membuka posisi scalping di instrumen yang belum pernah dipelajari',
        'Mengubah settingan indikator'
      ],
      correctAnswer: 0,
      explanation: 'Hard Circuit Breaker dirancang untuk melindungi modal dari kehancuran emosional saat kondisi psikologis atau pasar tidak sinkron.'
    }
  ],
  'risk-4-1': [
    {
      id: 'q-risk-4-1-1',
      question: 'Apa yang dimaksud dengan bias psikologis "Disposition Effect" dalam trading?',
      options: [
        'Kecenderungan menjual posisi menang terlalu cepat dan membiarkan posisi floating loss mengambang berhari-hari dengan harapan harga akan balik',
        'Keinginan untuk selalu membaca berita ekonomi',
        'Kebiasaan mencatat jurnal setiap malam',
        'Menolak membuka akun trading'
      ],
      correctAnswer: 0,
      explanation: 'Disposition Effect adalah manifestasi dari rasa takut kehilangan keuntungan dan keengganan mengakui kesalahan posisi yang rugi.'
    }
  ],
  'risk-4-2': [
    {
      id: 'q-risk-4-2-1',
      question: 'Secara neurobiologis, apa yang terjadi ketika seorang trader mengalami "Amygdala Hijack"?',
      options: [
        'Otak mendeteksi kerugian uang sebagai ancaman fisik, memicu hormon stres, dan melumpuhkan fungsi logika rasional korteks prefrontal',
        'Otak menjadi lebih pintar dan mampu berhitung lebih cepat',
        'Trader merasa mengantuk dan tenang',
        'Tidak ada efek fisik apa pun'
      ],
      correctAnswer: 0,
      explanation: 'Korteks prefrontal yang mengatur disiplin dan matematika lumpuh saat amigdala membajak kesadaran dalam mode amarah atau ketakutan.'
    }
  ],
  'risk-5-1': [
    {
      id: 'q-risk-5-1-1',
      question: 'Menurut Mark Douglas, apa definisi sejati dari sebuah "Edge" di pasar finansial?',
      options: [
        'Tidak lebih dari sebuah indikasi statistik bahwa satu kemungkinan kejadian lebih besar probabilitasnya terjadi dibandingkan kemungkinan lainnya',
        'Jaminan 100% keuntungan pasti',
        'Rahasia insider institusi yang tidak diketahui orang lain',
        'Pengaturan indikator rahasia berbayar'
      ],
      correctAnswer: 0,
      explanation: 'Edge hanyalah keunggulan probabilitas pada sampel transaksi dalam jumlah besar, bukan kepastian pada satu trade individual.'
    }
  ],
  'risk-5-2': [
    {
      id: 'q-risk-5-2-1',
      question: 'Apa perbedaan antara "Trade yang Baik" vs "Trade yang Buruk" menurut standar trader profesional?',
      options: [
        'Trade yang baik adalah trade yang mematuhi SOP Trading Plan 100% terlepas dari hasil menang atau kalah, sedangkan trade yang buruk adalah trade yang melanggar aturan',
        'Trade yang baik adalah yang menghasilkan uang, trade yang buruk adalah yang rugi',
        'Semua trade yang terkena Stop Loss adalah trade yang buruk',
        'Tergantung opini analis berita di televisi'
      ],
      correctAnswer: 0,
      explanation: 'Profesional berfokus pada kualitas eksekusi proses (discipline), bukan bias hasil sesaat (outcome bias).'
    }
  ],

  // Quantitative & Algorithmic Trading Quizzes
  'quant-1-1': [
    {
      id: 'q-quant-1-1-1',
      question: 'Mengapa deret harga finansial mentah harus diubah menjadi Log Returns sebelum dianalisis oleh model statistik kuantitatif?',
      options: [
        'Karena harga mentah bersifat non-stasioner, sedangkan log returns bersifat aditif dan mendekati distribusi stasioner yang memenuhi asumsi statistik',
        'Agar angka grafik terlihat lebih kecil',
        'Hanya tradisi pemrogram Python',
        'Supaya grafik candlestick berubah warna'
      ],
      correctAnswer: 0,
      explanation: 'Stasioneritas adalah syarat mutlak agar korelasi dan regresi statistik tidak menghasilkan estimasi palsu (spurious).'
    }
  ],
  'quant-1-2': [
    {
      id: 'q-quant-1-2-1',
      question: 'Mengapa operasi pergeseran indeks (.shift(1)) wajib diterapkan saat membuat kolom sinyal trading di Pandas?',
      options: [
        'Untuk mencegah Lookahead Bias, memastikan keputusan transaksi bar saat ini hanya menggunakan data yang sudah tertutup di bar sebelumnya',
        'Agar kode berjalan lebih lambat',
        'Hanya untuk merapikan tampilan tabel',
        'Menghindari error pembagian dengan nol'
      ],
      correctAnswer: 0,
      explanation: 'Tanpa shift(1), backtest akan melihat data masa depan sebelum harga resmi terjadi di dunia nyata.'
    }
  ],
  'quant-2-1': [
    {
      id: 'q-quant-2-1-1',
      question: 'Apa perbedaan mendasar antara Time-Series Momentum dan Cross-Sectional Momentum?',
      options: [
        'Time-Series membandingkan return aset terhadap riwayatnya sendiri di masa lalu, sedangkan Cross-Sectional meranking return aset relatif terhadap aset lain di dalam semestanya',
        'Time-Series hanya untuk saham, Cross-Sectional hanya untuk kripto',
        'Keduanya persis sama tanpa perbedaan',
        'Cross-Sectional tidak memerlukan data historis'
      ],
      correctAnswer: 0,
      explanation: 'Time-series momentum mengukur tren absolut, sedangkan cross-sectional momentum mengukur kekuatan relatif lintas portofolio.'
    }
  ],
  'quant-2-2': [
    {
      id: 'q-quant-2-2-1',
      question: 'Dalam strategi Mean-Reversion Ornstein-Uhlenbeck, apa arti dari metrik "Half-Life"?',
      options: [
        'Waktu paruh yang dibutuhkan oleh deviasi harga untuk kembali setengah jalan menuju nilai rata-rata ekuilibriumnya',
        'Waktu sebelum server algoritma harus dimatikan',
        'Usia baterai komputer kuantitatif',
        'Waktu kedaluwarsa kontrak opsi'
      ],
      correctAnswer: 0,
      explanation: 'Half-life mengukur kecepatan rata-rata proses mean-reverting; semakin pendek half-life, semakin cepat modal berputar.'
    }
  ],
  'quant-2-3': [
    {
      id: 'q-quant-2-3-1',
      question: 'Apa yang diindikasikan oleh nilai Order Book Imbalance (OBI) yang bernilai positif tinggi (> +0.40)?',
      options: [
        'Terdapat dominasi volume limit order pembeli (Bid Depth) yang jauh lebih tebal dibanding penjual (Ask Depth), memprediksi tekanan harga naik mikro',
        'Pasar sedang mengalami krisis likuiditas total',
        'Seluruh order di bursa dibatalkan',
        'Sinyal untuk langsung melakukan short sell'
      ],
      correctAnswer: 0,
      explanation: 'OBI mengukur asimetri resting orders di Level 2 book, memberikan sinyal tekanan lelang jangka pendek.'
    }
  ],
  'quant-3-1': [
    {
      id: 'q-quant-3-1-1',
      question: 'Apa keunggulan utama Event-Driven Backtesting dibanding Vectorized Backtesting?',
      options: [
        'Mensimulasikan eksekusi realistik bar demi bar termasuk antrean order di bursa, latensi jaringan, slippage dinamis, dan fill parsial',
        'Lebih cepat 1000 kali dibanding vektorisasi',
        'Hanya membutuhkan 1 baris kode pemrograman',
        'Menjamin 100% tidak ada kerugian di masa depan'
      ],
      correctAnswer: 0,
      explanation: 'Event-driven engines mensimulasikan mekanisme pencocokan order bursa nyata, menghindari hasil simulasi palsu.'
    }
  ],
  'quant-3-2': [
    {
      id: 'q-quant-3-2-1',
      question: 'Mengapa fenomena Overfitting (Curve Fitting) sangat berbahaya bagi sistem trading kuantitatif?',
      options: [
        'Model hanya menghafal derau (noise) masa lalu sehingga tampak sempurna di data in-sample, namun langsung kolaps dan rugi besar di data riil masa depan',
        'Karena membuat file kode menjadi terlalu panjang',
        'Karena dilarang oleh bursa efek',
        'Hanya berdampak pada komisi broker'
      ],
      correctAnswer: 0,
      explanation: 'Overfitted model kehilangan kemampuan generalisasi statistik pada kondisi pasar masa depan yang dinamis.'
    }
  ],
  'quant-3-3': [
    {
      id: 'q-quant-3-3-1',
      question: 'Apa tujuan dari menjalankan 10,000 iterasi simulasi Monte Carlo Resampling pada riwayat trade?',
      options: [
        'Mengacak urutan transaksi untuk mengukur distribusi probabilitas worst-case drawdown dan risiko kehancuran modal di berbagai skenario jalur acak',
        'Mencari kombinasi warna chart terbaik',
        'Menghapus trade yang mengalami kekalahan',
        'Menggandakan saldo akun secara instan'
      ],
      correctAnswer: 0,
      explanation: 'Monte Carlo membuktikan apakah performa historis adalah kebetulan urutan kemenangan atau benar-benar memiliki edge statistik yang kokoh.'
    }
  ],
  'quant-4-1': [
    {
      id: 'q-quant-4-1-1',
      question: 'Apa keunggulan Sortino Ratio dibandingkan Sharpe Ratio?',
      options: [
        'Sortino Ratio hanya menghukum volatilitas negatif (Downside Deviation), tidak menghukum lonjakan keuntungan ke atas seperti Sharpe Ratio',
        'Sortino Ratio tidak menggunakan matematika',
        'Sharpe Ratio hanya bisa dihitung di Excel',
        'Sortino Ratio selalu bernilai di atas 10'
      ],
      correctAnswer: 0,
      explanation: 'Sharpe ratio menganggap lonjakan keuntungan ke atas yang tinggi sebagai risiko (volatilitas); Sortino hanya mengukur risiko penurunan.'
    }
  ],
  'quant-4-2': [
    {
      id: 'q-quant-4-2-1',
      question: 'Mengapa Conditional Value at Risk (CVaR) dianggap lebih superior daripada Value at Risk (VaR) konvensional?',
      options: [
        'Karena CVaR menghitung rata-rata besaran kerugian ekstrem ketika batas ambang VaR terlampaui (mengukur keparahan krisis ekor tebal / Fat Tails)',
        'Karena CVaR selalu bernilai nol',
        'Karena VaR tidak diakui oleh akademisi',
        'Hanya karena rumus CVaR lebih baru'
      ],
      correctAnswer: 0,
      explanation: 'CVaR memperhitungkan skenario Black Swan di luar persentil 99%, aspek terpenting bagi manajemen risiko institusi.'
    }
  ],
  'quant-5-1': [
    {
      id: 'q-quant-5-1-1',
      question: 'Dalam Pine Script v5, bagaimana cara mutlak mencegah terjadinya "Repainting" pada sinyal strategi?',
      options: [
        'Mengevaluasi kondisi sinyal hanya ketika candle telah resmi ditutup menggunakan variabel barstate.isconfirmed',
        'Menggunakan timeframe 1 detik',
        'Memasang indikator RSI ganda',
        'Mengaktifkan fitur calc_on_every_tick=true'
      ],
      correctAnswer: 0,
      explanation: 'barstate.isconfirmed menjamin bahwa candle historis tidak akan mengubah nilai High/Low/Close setelah sinyal ditembakkan.'
    }
  ],
  'quant-5-2': [
    {
      id: 'q-quant-5-2-1',
      question: 'Mengapa koneksi WebSocket lebih dipilih daripada polling HTTP REST API untuk streaming data order book real-time?',
      options: [
        'Karena WebSocket adalah koneksi dua arah persisten berlatensi sangat rendah tanpa overhead handshake HTTP berulang-ulang',
        'Karena REST API tidak bisa mengirim angka desimal',
        'Karena WebSocket gratis sedangkan REST berbayar',
        'Tidak ada perbedaan performa antara keduanya'
      ],
      correctAnswer: 0,
      explanation: 'WebSocket menghilangkan overhead TCP handshake berulang dan latensi HTTP headers, krusial untuk eksekusi algoritma.'
    }
  ]
};
