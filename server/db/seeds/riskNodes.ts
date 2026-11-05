import { NodeSeedData } from '../seedData.ts';

export const riskNodes: NodeSeedData[] = [
  {
    id: 'risk-1-1',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: null,
    level: 1,
    title: 'Risk of Ruin & Matematika Drawdown Geometris',
    slug: 'risk-ruin-geometric-drawdown',
    summary: 'Mengapa kerugian 50% membutuhkan keuntungan 100% untuk impas, dan bagaimana probabilitas kebangkrutan melonjak jika risiko > 2%.',
    content: `### Matematika Kejam Kerugian Modal
Dalam pasar finansial, matematika pemulihan kerugian bersifat asimetris geometris (non-linear):
| Kerugian Modal (% Drawdown) | Keuntungan Diperlukan Untuk Impas (Breakeven) |
| :--- | :--- |
| **-10%** | **+11.1%** |
| **-20%** | **+25.0%** |
| **-30%** | **+42.8%** |
| **-50%** | **+100.0%** |
| **-75%** | **+300.0%** |
| **-90%** | **+900.0%** |

- **Risk of Ruin**: Probabilitas akun seorang trader menyentuh angka nol atau titik tidak bisa dipulihkan. Jika Anda mengambil risiko 10% per transaksi, maka 5 kekalahan beruntun akan memangkas modal Anda lebih dari 40%, membuat peluang bertahan hidup secara statistik mendekati 0%.
- **Aturan Emas Bertahan Hidup**: Jangan pernah mengambil risiko lebih dari **1% hingga maksimal 2%** dari total ekuitas akun pada satu posisi trading apa pun setup-nya.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 400,
    coordinates_y: 80,
    order_index: 1,
    checklists: [
      'Menghafal tabel asimetri pemulihan drawdown modal',
      'Membatasi risiko maksimal 1% per posisi trading',
      'Memahami konsep Risk of Ruin dan kurva kebangkrutan statistik'
    ],
    resources: [
      { title: 'The Mathematics of Money Management: Risk Analysis Techniques for Traders', author: 'Ralph Vince', url: '#', type: 'Book' },
      { title: 'Portfolio Management Formulas', author: 'Ralph Vince', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-1-2',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-1-1',
    level: 1,
    title: 'Fixed Fractional Sizing & Formula Kelly Criterion',
    slug: 'risk-fixed-fractional-sizing',
    summary: 'Menghitung ukuran lot secara dinamis berdasarkan jarak invalidasi struktural (Stop Loss) sehingga kerugian moneter selalu konstan.',
    content: `### Berhenti Menentukan Ukuran Lot Berdasarkan Firasat
Banyak pemula menggunakan ukuran lot yang sama (misal 1.0 lot) di setiap transaksi tanpa memedulikan jarak stop loss. Ini adalah kesalahan fatal!
- **Formula Fixed Fractional Position Sizing**:
  $$\\text{Position Size} = \\frac{\\text{Account Equity} \\times \\text{Risk \\%}}{\\text{Stop Loss Distance (Pips/Ticks)} \\times \\text{Pip Value}}$$
- *Contoh Nyata*: Akun $10,000 dengan risiko 1% ($100).
  - Jika SL 20 pips: Ukuran posisi = $100 / (20 × $10) = 0.50 lot.
  - Jika SL 50 pips: Ukuran posisi = $100 / (50 × $10) = 0.20 lot.
  - Pada kedua skenario, jika SL tersentuh, kerugian moneter Anda **tetap persis $100**.
- **Kelly Criterion**: Formula matematika untuk menentukan fraksi optimal alokasi modal berdasarkan edge statistik:
  $$K\\% = W - \\frac{1 - W}{R}$$
  (di mana $W$ adalah win rate dan $R$ adalah rasio win/loss). Di dunia trading nyata, trader profesional hanya menggunakan *Half-Kelly* atau *Quarter-Kelly* untuk meredam volatilitas akun.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 400,
    coordinates_y: 200,
    order_index: 2,
    checklists: [
      'Menggunakan kalkulator ukuran lot sebelum setiap kali menekan tombol buy/sell',
      'Menyesuaikan ukuran lot dengan jarak pips stop loss struktural',
      'Memahami batas bahaya penggunaan Full-Kelly pada pasar volatil'
    ],
    resources: [
      { title: 'Fortune\'s Formula: The Untold Story of the Scientific Bettiing System', author: 'William Poundstone', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-2-1',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-1-2',
    level: 2,
    title: 'Ekspektansi Positif (EV): Menghitung Edge Statistik',
    slug: 'risk-mathematical-expectancy',
    summary: 'Rumus Expected Value: EV = (Win Rate × Avg Win) - (Loss Rate × Avg Loss). Mengapa trading adalah bisnis statistik angka besar.',
    content: `### Apakah Sistem Anda Memiliki Keunggulan Statistik?
Tanpa ekspektansi matematika yang positif (+EV), aktivitas trading Anda hanyalah bentuk donasi modal sukarela kepada pasar:
- **Rumus Expected Value (EV per Trade)**:
  $$EV = (P_{\\text{win}} \\times W) - (P_{\\text{loss}} \\times L)$$
  - $P_{\\text{win}}$: Probabilitas menang (Win Rate).
  - $W$: Rata-rata keuntungan saat menang (dalam R-Multiple atau Dollar).
  - $P_{\\text{loss}}$: Probabilitas kalah ($1 - P_{\\text{win}}$).
  - $L$: Rata-rata kerugian saat kalah (biasanya 1R).
- *Contoh Simulasi*:
  - Win Rate = 40% (0.40)
  - Avg Win = 3R (misal $300)
  - Loss Rate = 60% (0.60)
  - Avg Loss = 1R (misal $100)
  - $$EV = (0.40 \\times 3R) - (0.60 \\times 1R) = 1.2R - 0.6R = +0.6R \\text{ per trade!}$$
  - Artinya, dalam setiap 100 trade, sistem ini menghasilkan laba bersih rata-rata **+60R** terlepas dari fakta bahwa Anda salah 60 kali!`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 230,
    coordinates_y: 330,
    order_index: 3,
    checklists: [
      'Menghitung nilai Expected Value (EV) dari 50 trade terakhir di jurnal',
      'Memastikan nilai EV sistem bernilai positif sebelum menggunakan dana riil',
      'Memahami bahwa hasil trade individual bersifat independen dan acak'
    ],
    resources: [
      { title: 'Trade Your Way to Financial Freedom', author: 'Van K. Tharp', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-2-2',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-2-1',
    level: 2,
    title: 'Asimetri Payoff: Mengapa Win Rate 40% Bisa Mengalahkan 80%',
    slug: 'risk-asymmetric-rr-winrate',
    summary: 'Bukti matematis bahwa rasio Risk:Reward 1:3 dengan win rate 40% mengalahkan sistem win rate 85% dengan rasio risiko negatif.',
    content: `### Jebakan Ilusi 'Win Rate Tinggi'
Banyak penjual kursus menjanjikan sistem dengan win rate 90%. Namun di balik itu tersimpan bahaya kehancuran akun:
- **Perbandingan Dua Trader (100 Transaksi)**:
  - *Trader A (Sistem Win Rate 85%)*: 
    - Menang 85 kali @ $20 = +$1,700.
    - Tapi rasio R:R terbalik (risiko $200 untuk untung $20).
    - Kalah 15 kali @ $200 = -$3,000.
    - **Hasil Akhir**: **Rugi Bersih -$1,300!** (Satu kesalahan menghapus puluhan kemenangan).
  - *Trader B (Sistem Win Rate 40%)*:
    - Menang 40 kali @ 3R ($300) = +$12,000.
    - Kalah 60 kali @ 1R ($100) = -$6,000.
    - **Hasil Akhir**: **Laba Bersih +$6,000!**
- Trader profesional mengejar *Asymmetric Risk/Reward*, bukan ego ingin selalu benar.`,
    visual_type: 'risk_reward_calc',
    coordinates_x: 570,
    coordinates_y: 330,
    order_index: 4,
    checklists: [
      'Menolak membuka posisi yang memiliki potensi R:R di bawah 1:2',
      'Menerima kekalahan sebagai biaya operasional bisnis (cost of doing business)',
      'Tidak merasa rendah diri saat win rate berada di angka 40-50%'
    ],
    resources: [
      { title: 'Fooled by Randomness: The Hidden Role of Chance in Life and in the Markets', author: 'Nassim Nicholas Taleb', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-3-1',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-2-2',
    level: 3,
    title: 'Risiko Korelasi Multi-Aset & Batas Heat Portofolio',
    slug: 'risk-correlation-exposure-heatsinks',
    summary: 'Menghindari ilusi diversifikasi: membuka buy di EURUSD, GBPUSD, dan AUDUSD hakikatnya adalah 1 posisi 3x risiko terhadap USD.',
    content: `### Ilusi Diversifikasi yang Mematikan
Banyak trader pemula mengira mereka telah melakukan diversifikasi risiko karena membuka posisi di beberapa pasangan mata uang sekaligus:
- **Korelasi Tersembunyi (Hidden Correlation)**:
  - Posisi Buy EUR/USD (risiko 1%)
  - Posisi Buy GBP/USD (risiko 1%)
  - Posisi Sell USD/CHF (risiko 1%)
  - Posisi Buy Gold / XAU/USD (risiko 1%)
  - **Fakta Hakiki**: Keempat posisi ini memiliki korelasi positif > 0.85 terhadap pelemahan mata uang US Dollar! Jika data CPI Amerika keluar lebih tinggi dari ekspektasi dan DXY menguat tajam, keempat posisi ini akan **tersentuh Stop Loss secara bersamaan**. Anda tidak mengambil risiko 1%, melainkan **4% risiko terkonsentrasi**!
- **Portfolio Heat Limit**: Batas total risiko terbuka seluruh instrumen tidak boleh melebihi **3% hingga 5%** dari total modal pada satu waktu.`,
    visual_type: 'multi_timeframe',
    coordinates_x: 230,
    coordinates_y: 470,
    order_index: 5,
    checklists: [
      'Memeriksa matriks korelasi mata uang sebelum menambah posisi baru',
      'Membatasi total Portfolio Heat maksimal 3-4% secara simultan',
      'Menghindari menumpuk arah taruhan pada mata uang induk yang sama'
    ],
    resources: [
      { title: 'Portfolio Protection & Cross-Asset Correlation Dynamics', author: 'TLP Risk Management Desk', url: '#', type: 'Guide' }
    ]
  },
  {
    id: 'risk-3-2',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-3-1',
    level: 3,
    title: 'Batas Kerugian Harian & Hard Circuit Breaker Otomatis',
    slug: 'risk-daily-drawdown-circuit-breakers',
    summary: 'Menerapkan batas kerugian harian maksimal (Max Daily Loss 3%) yang mematikan eksekusi trading secara paksa.',
    content: `### Mekanisme Pengaman Otomatis
Bursa saham dunia (seperti NYSE) memiliki *Market-Wide Circuit Breakers* untuk menghentikan perdagangan saat terjadi kepanikan. Sebagai trader profesional, Anda wajib memiliki circuit breaker pribadi:
- **Max Daily Loss Limit**: Tetapkan batas kerugian harian maksimal, misalnya **-3R atau -3% dari modal**.
- **Protokol Hard Circuit Breaker**:
  1. Jika dalam satu hari Anda mengalami 3 kekalahan beruntun (menyentuh batas -3R), **tutup seluruh terminal trading segera**.
  2. Matikan laptop/komputer dan tinggalkan meja trading minimal hingga sesi berikutnya atau hari esok.
  3. Dilarang keras mencoba melakukan "satu trade lagi untuk impas" (*Revenge Trading Trap*).
- Disiplin ini melindungi Anda dari kehancuran modal di hari-hari di mana kondisi pasar sedang tidak sinkron dengan sistem trading Anda.`,
    visual_type: 'entry_protocol',
    coordinates_x: 570,
    coordinates_y: 470,
    order_index: 6,
    checklists: [
      'Menetapkan angka Max Daily Loss pasti dalam SOP trading plan',
      'Mengaktifkan fitur Max Drawdown Lockout pada software broker / prop firm',
      'Berhenti trading secara sukarela begitu batas kerugian harian tersentuh'
    ],
    resources: [
      { title: 'The Mental Game of Trading', author: 'Jared Tendler', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-4-1',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-3-2',
    level: 4,
    title: 'Bias Kognitif Mematikan: Disposition Effect & Gambler\'s Fallacy',
    slug: 'psych-cognitive-biases-trading',
    summary: 'Mengatasi kecenderungan menjual pemenang terlalu cepat dan membiarkan posisi rugi membengkak serta ilusi giliran menang.',
    content: `### Anatomi Sabotase Diri Bawah Sadar
Otak manusia berevolusi untuk bertahan hidup di alam liar, bukan untuk bertransaksi dalam lingkungan probabilitas finansial:
- **Disposition Effect**: Kecenderungan psikologis untuk buru-buru menutup posisi profit kecil karena takut keuntungannya hilang, namun membiarkan posisi floating loss mengambang berhari-hari dengan harapan harga akan balik (*Loss Aversion / Prospect Theory Kahneman*).
- **Gambler\'s Fallacy**: Keyakinan keliru bahwa setelah kalah 5 kali berturut-turut, peluang kemenangan pada trade ke-6 pasti lebih besar. Faktanya, setiap lemparan koin di pasar bersifat independen.
- **Sunk Cost Fallacy**: Terus menambah posisi pada aset yang merugi (*averaging down*) hanya karena sudah menginvestasikan banyak uang dan waktu pada analisa tersebut.`,
    visual_type: 'candlestick_anatomy',
    coordinates_x: 230,
    coordinates_y: 610,
    order_index: 7,
    checklists: [
      'Mengidentifikasi dorongan emosi untuk menutup posisi sebelum target TP',
      'Tidak pernah melakukan averaging down pada posisi yang sedang merugi',
      'Menghapus anggapan bahwa pasar "berutang" kemenangan kepada Anda'
    ],
    resources: [
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', url: '#', type: 'Book' },
      { title: 'Predictably Irrational', author: 'Dan Ariely', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-4-2',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-4-1',
    level: 4,
    title: 'Neurobiologi Tilt, Amigdala Hijack, & Manajemen Emosi',
    slug: 'psych-neuroscience-tilt-fomo',
    summary: 'Memahami bagaimana korteks prefrontal lumpuh saat mengalami kekalahan beruntun dan protokol fisik menghentikan tilt.',
    content: `### Apa yang Terjadi di Otak Anda Saat Mengalami Loss?
Ketika Anda mengalami kekalahan yang menyakitkan atau mengalami FOMO (*Fear of Missing Out*), sistem syaraf biologis mengambil alih:
- **Amygdala Hijack**: Bagian amigdala di otak mendeteksi kerugian finansial sebagai ancaman fisik terhadap eksistensi diri. Tubuh memompa hormon kortisol dan adrenalin.
- **Kelumpuhan Prefrontal Cortex**: Aliran darah menuju korteks prefrontal (pusat logika rasional, kalkulasi matematika, dan eksekusi SOP) menurun drastis. Trader kehilangan kemampuan berpikir jernih dan bertindak dalam mode binatang buas (*Fight, Flight, or Freeze*).
- **Protokol Reset Fisiologis 5 Menit**:
  1. Lepaskan tangan dari mouse dan keyboard.
  2. Lakukan pernapasan *Physiological Sigh* (dua hirupan cepat lewat hidung, satu hembusan panjang lewat mulut) sebanyak 5 siklus.
  3. Berdiri dan cuci muka dengan air dingin untuk merangsang *Mammalian Dive Reflex* guna menurunkan denyut jantung.`,
    visual_type: 'entry_protocol',
    coordinates_x: 570,
    coordinates_y: 610,
    order_index: 8,
    checklists: [
      'Mengenali gejala fisik tilt: detak jantung meningkat, otot rahang menegang, napas pendek',
      'Menerapkan pernapasan physiological sigh saat merasakan amarah pasca-loss',
      'Menjauh dari layar monitor selama 15 menit sebelum mengevaluasi chart kembali'
    ],
    resources: [
      { title: 'The Daily Trading Coach: 101 Lessons for Becoming Your Own Psychologist', author: 'Brett N. Steenbarger', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-5-1',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-4-2',
    level: 5,
    title: 'Pola Pikir Probabilistik: Think in Bets (Mark Douglas Framework)',
    slug: 'psych-probabilistic-mindset',
    summary: 'Menghilangkan beban ekspektasi pada setiap trade individual dan memandang trading sebagai 20 sampel distribusi acak.',
    content: `### 5 Kebenaran Fundamental Pasar (Mark Douglas)
Dalam maha karya *Trading in the Zone*, Mark Douglas merumuskan 5 pondasi mental seorang trader legendaris:
1. **Apapun bisa terjadi setiap saat di pasar.**
2. **Anda tidak perlu tahu apa yang akan terjadi selanjutnya untuk menghasilkan uang.**
3. **Ada distribusi acak antara menang dan kalah untuk kumpulan variabel apa pun yang mendefinisikan sebuah edge.**
4. **Sebuah edge tidak lebih dari indikasi bahwa satu kemungkinan lebih besar terjadi daripada kemungkinan lainnya.**
5. **Setiap momen di pasar bersifat unik dan berdiri sendiri.**
- *Thinking in Bets*: Jangan pernah menilai kualitas sebuah keputusan trading semata-mata dari hasilnya (*Outcome Bias*). Trade yang merugi tetapi mematuhi SOP 100% adalah **trade yang baik**. Trade yang untung tetapi melanggar SOP adalah **jebakan beracun**.`,
    visual_type: 'trade_journaling',
    coordinates_x: 310,
    coordinates_y: 750,
    order_index: 9,
    checklists: [
      'Membaca 5 kebenaran fundamental Mark Douglas sebelum sesi trading dimulai',
      'Mengevaluasi performa dalam blok minimal 20 atau 50 trade, bukan per trade',
      'Memisahkan proses eksekusi disiplin dari hasil akhir moneter jangka pendek'
    ],
    resources: [
      { title: 'Trading in the Zone', author: 'Mark Douglas', url: '#', type: 'Book' },
      { title: 'Thinking in Bets: Making Smarter Decisions When You Don\'t Have All the Facts', author: 'Annie Duke', url: '#', type: 'Book' }
    ]
  },
  {
    id: 'risk-5-2',
    roadmap_id: 'rm-risk-psychology',
    parent_node_id: 'risk-5-1',
    level: 5,
    title: 'Protokol Trading Plan Institusional & Checklist Kesiapan Harian',
    slug: 'risk-trading-plan-operational-readiness',
    summary: 'Menyusun standard operating procedure (SOP) pra-pasar, protokol eksekusi tanpa kompromi, dan audit jurnal metrik mingguan.',
    content: `### Standard Operating Procedure (SOP) Trader Profesional
Trading tanpa rencana tertulis adalah bunuh diri finansial. Trading Plan wajib memuat:
1. **Pra-Pasar (Pre-Market Readiness)**:
   - Cek kalender berita makroekonomi (hindari trading 15 menit sebelum CPI/FOMC).
   - Penilaian kondisi fisik & mental (jika sedang sakit atau tertekan masalah pribadi: dilarang trading).
2. **Kriteria Validasi Setup (If-Then Logic)**:
   - "JIKA harga menyapu likuiditas sesi Asia DAN membentuk CHoCH di M5 di area Discount, MAKA saya pasang limit order di FVG."
3. **Manajemen Posisi & Risiko**:
   - Risiko pasti: 1% ($X). Target Take Profit: 2.5R ($Y).
   - Aturan Breakeven: Hanya setelah penembusan struktur minor baru.
4. **Pasca-Pasar (Post-Market Review)**:
   - Simpan screenshot entry & exit ke jurnal digital.
   - Berikan nilai disiplin (Skala 1 - 10) terhadap kepatuhan aturan plan.`,
    visual_type: 'trade_journaling',
    coordinates_x: 490,
    coordinates_y: 750,
    order_index: 10,
    checklists: [
      'Memiliki dokumen Trading Plan tertulis yang dicetak atau ditempel di meja kerja',
      'Mengisi checklist kesiapan pra-pasar sebelum membuka aplikasi chart',
      'Melakukan review jurnal mingguan setiap akhir pekan tanpa terlewat'
    ],
    resources: [
      { title: 'One Good Trade: Inside the Highly Competitive World of Proprietary Trading', author: 'Mike Bellafiore', url: '#', type: 'Book' }
    ]
  }
];
