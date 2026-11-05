import { EducationalArticle } from '../../types';

export const RISK_ARTICLES: Record<string, EducationalArticle> = {
  // Master Guide Risk & Psychology
  'risk-management-psychology-mastery': {
    id: 'art-risk-mastery',
    slug: 'risk-management-psychology-mastery',
    title: 'Manajemen Risiko & Psikologi Trading: Matematika Bertahan Hidup Finansial & Penguasaan Emosi',
    category: 'Core Foundation',
    level: 1,
    readingTimeMinutes: 20,
    difficulty: 'Beginner',
    summary: 'Fondasi paling mutlak seorang trader: matematika asimetri drawdown, model posisi Fixed Fractional, ekspektansi positif (EV), mitigasi tilt dan FOMO, serta pola pikir probabilistik Mark Douglas.',
    prerequisites: ['what-is-trading-fundamentals'],
    tableOfContents: [
      { id: 'matematika-drawdown', title: '1. Matematika Drawdown & Risk of Ruin' },
      { id: 'position-sizing', title: '2. Dynamic Fixed Fractional Position Sizing' },
      { id: 'ekspektansi-positif', title: '3. Ekspektansi Matematika (EV) & Asimetri R:R' },
      { id: 'korelasi-heat', title: '4. Batas Risiko Portofolio & Circuit Breakers' },
      { id: 'neurobiologi-tilt', title: '5. Neurobiologi Emosi: Amygdala Hijack & FOMO' },
      { id: 'probabilistic-mindset', title: '6. Berpikir Dalam Probabilitas: "Think in Bets"' }
    ],
    sections: [
      {
        id: 'matematika-drawdown',
        title: '1. Matematika Drawdown & Risk of Ruin',
        content: `### Mengapa 90% Trader Gagal Akibat Matematika Dasar?
Banyak trader pemula terobsesi mencari indikator dengan sinyal 100% akurat. Faktanya, alasan utama trader bangkrut adalah ketidaktahuan atas sifat **asimetri pemulihan modal non-linear**:

| Penurunan Modal (Drawdown) | Laba Diperlukan Untuk Impas (Breakeven) | Dampak Psikologis |
| :--- | :--- | :--- |
| **-10%** | **+11.1%** | Tenang, proses pemulihan wajar |
| **-20%** | **+25.0%** | Sedikit cemas, masih terkendali |
| **-30%** | **+42.8%** | Tekanan mental mulai tinggi |
| **-50%** | **+100.0%** | Putus asa; modal harus berlipat ganda 2x |
| **-75%** | **+300.0%** | Modal hancur; butuh profit 300% |
| **-90%** | **+900.0%** | Secara statistik tidak mungkin pulih |

- **Risk of Ruin (Risiko Kebangkrutan)**: Probabilitas seorang trader kehilangan modal hingga titik tidak dapat kembali. Jika Anda mengambil risiko 10% per posisi, rentetan 5 kekalahan beruntun (hal yang lumrah di pasar) akan memangkas modal Anda sebesar 41%!
- **Aturan Mutlak**: Batasi risiko maksimal per posisi hanya **1.0% (maksimal 2.0%)** dari total ekuitas akun.`
      },
      {
        id: 'position-sizing',
        title: '2. Dynamic Fixed Fractional Position Sizing',
        content: `### Berhenti Menentukan Ukuran Lot Berdasarkan Firasat
Formula Fixed Fractional Position Sizing menjamin bahwa nilai kerugian moneter ($) Anda selalu konstan terlepas dari apakah Stop Loss Anda berjarak 10 pips atau 60 pips:

$$\\text{Position Size} = \\frac{\\text{Account Equity} \\times \\text{Risk \\%}}{\\text{Stop Loss Distance} \\times \\text{Pip Value}}$$

- *Simulasi Akun $10,000 (Risiko 1% = $100)*:
  - Setup Scalping (SL 15 pips): Ukuran posisi = $100 / (15 × $10) = 0.66 lot.
  - Setup Swing (SL 50 pips): Ukuran posisi = $100 / (50 × $10) = 0.20 lot.
  - Pada kedua posisi, jika Stop Loss tersentuh, Anda **hanya kehilangan tepat $100**!`
      },
      {
        id: 'ekspektansi-positif',
        title: '3. Ekspektansi Matematika (EV) & Asimetri R:R',
        content: `### Rumus Expected Value (EV):
$$EV = (\\text{Win Rate} \\times \\text{Avg Win}) - (\\text{Loss Rate} \\times \\text{Avg Loss})$$

| Model Trader | Win Rate | Rasio R:R | Perhitungan EV per Trade | Hasil Akhir 100 Trade ($100 risk) |
| :--- | :--- | :--- | :--- | :--- |
| **Trader A (Pencari Win Rate)** | **80%** | 0.25:1 (Risiko $400 untung $100) | $(0.80 \\times $100) - (0.20 \\times $400) = $80 - $80 = **$0** | **Rugi komisi & impas** |
| **Trader B (Asymmetric R:R)** | **40%** | 3.0:1 (Risiko $100 untung $300) | $(0.40 \\times $300) - (0.60 \\times $100) = $120 - $60 = **+$60** | **Profit Bersih +$6,000!** |

> Profesional mengejar *Asymmetric Payoff*, bukan memuaskan ego ingin selalu benar.`
      },
      {
        id: 'korelasi-heat',
        title: '4. Batas Risiko Portofolio & Circuit Breakers',
        content: `### Bahaya Korelasi Tersembunyi (Hidden Heat)
Membuka Buy EUR/USD, Buy GBP/USD, dan Buy Gold secara simultan bukanlah diversifikasi, melainkan **1 taruhan 3x lipat terhadap kelemahan US Dollar**.
- **Portfolio Heat Limit**: Total risiko terbuka seluruh instrumen tidak boleh melebihi **3% hingga 5%** dari total ekuitas.
- **Hard Circuit Breaker Harian**: Jika dalam 1 hari Anda mengalami 3 kekalahan beruntun (rugi -3R), **tutup terminal dan berhenti trading segera**. Jangan mencoba balas dendam (*revenge trading*)!`
      },
      {
        id: 'neurobiologi-tilt',
        title: '5. Neurobiologi Emosi: Amygdala Hijack & FOMO',
        content: `### Apa yang Terjadi di Otak Saat Mengalami Loss?
Ketika mengalami kerugian beruntun, bagian amigdala mendeteksi kehilangan uang sebagai ancaman fisik. Aliran darah ke **Prefrontal Cortex** (pusat logika rasional dan SOP) menurun drastis. Trader masuk ke mode hewani (*Fight, Flight, Freeze*).
- **Protokol Reset Fisiologis 5 Menit**:
  1. Lepaskan tangan dari keyboard dan mouse.
  2. Lakukan pernapasan *Physiological Sigh* (2 hirupan cepat hidung, 1 hembusan panjang mulut) sebanyak 5 siklus.
  3. Basuh muka dengan air dingin untuk merangsang denyut jantung melambat.`
      },
      {
        id: 'probabilistic-mindset',
        title: '6. Berpikir Dalam Probabilitas: "Think in Bets"',
        content: `### 5 Pilar Mental Mark Douglas (Trading in the Zone):
1. Apapun bisa terjadi di pasar setiap saat.
2. Anda tidak perlu tahu apa yang akan terjadi selanjutnya untuk menghasilkan uang.
3. Ada distribusi acak antara menang dan kalah pada kumpulan variabel edge.
4. Sebuah edge hanyalah indikasi probabilitas satu kejadian lebih besar dari yang lain.
5. Setiap momen di pasar bersifat unik dan berdiri sendiri.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menggeser Stop Loss menjauh saat harga mendekati titik invalidasi.',
        correction: 'Stop Loss adalah pintu keluar logis yang menjaga kelangsungan akun; jangan pernah menyentuh SL saat floating loss.'
      },
      {
        mistake: 'Menggandakan ukuran lot (Martingale) setelah mengalami kekalahan.',
        correction: 'Martingale adalah jalur tercepat menuju kehancuran akun secara matematis.'
      }
    ],
    keyTakeaways: [
      'Manajemen risiko mendikte apakah Anda bertahan hidup di pasar.',
      'Sistem dengan win rate 40% dan R:R 1:3 menghasilkan profitabilitas luar biasa.',
      'Kepatuhan proses eksekusi jauh lebih penting daripada hasil satu transaksi individual.'
    ],
    relatedTopics: [
      { slug: 'risk-ruin-geometric-drawdown', title: 'Risk of Ruin', category: 'Risk' },
      { slug: 'risk-fixed-fractional-sizing', title: 'Fixed Fractional Sizing', category: 'Risk' }
    ],
    references: [
      { title: 'Trading in the Zone', author: 'Mark Douglas', year: '2000' },
      { title: 'The Mathematics of Money Management', author: 'Ralph Vince', year: '1992' }
    ]
  },

  // Node articles Risk & Psychology
  'risk-ruin-geometric-drawdown': {
    id: 'art-risk-ruin',
    nodeId: 'risk-1-1',
    slug: 'risk-ruin-geometric-drawdown',
    title: 'Risk of Ruin & Matematika Drawdown Geometris',
    category: 'Core Foundation',
    level: 1,
    readingTimeMinutes: 12,
    difficulty: 'Beginner',
    summary: 'Mengapa kerugian 50% membutuhkan keuntungan 100% untuk impas, dan bagaimana probabilitas kebangkrutan melonjak saat risiko > 2%.',
    prerequisites: ['what-is-trading-fundamentals'],
    tableOfContents: [
      { id: 'tabel-drawdown', title: '1. Tabel Pemulihan Asimetris' },
      { id: 'kurva-ruin', title: '2. Kurva Probabilitas Kebangkrutan' },
      { id: 'aturan-1-persen', title: '3. Mengapa Aturan 1% Menyelamatkan Anda' }
    ],
    sections: [
      {
        id: 'tabel-drawdown',
        title: '1. Tabel Pemulihan Asimetris',
        content: `Penurunan modal 10% butuh 11% untung. Penurunan 50% butuh 100% untung. Penurunan 75% butuh 300% untung. Hindari drawdown besar dengan segala cara.`
      },
      {
        id: 'kurva-ruin',
        title: '2. Kurva Probabilitas Kebangkrutan',
        content: `Ketika risiko per trade naik di atas 3%, kurva Risk of Ruin melonjak secara eksponensial menuju kepastian kebangkrutan.`
      },
      {
        id: 'aturan-1-persen',
        title: '3. Mengapa Aturan 1% Menyelamatkan Anda',
        content: `Dengan risiko 1%, Anda membutuhkan 100 kekalahan beruntun untuk bangkrut secara total, memberikan ruang napas yang cukup untuk belajar.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menganggap risiko 5% per trade adalah angka yang aman.',
        correction: 'Rentetan 7 kekalahan akan memangkas modal Anda lebih dari 30%.'
      }
    ],
    keyTakeaways: [
      'Pemulihan modal bersifat non-linear.',
      'Pertahankan risiko maksimal 1% per transaksi.'
    ],
    relatedTopics: [
      { slug: 'risk-fixed-fractional-sizing', title: 'Position Sizing', category: 'Risk' }
    ],
    references: [
      { title: 'Portfolio Management Formulas', author: 'Ralph Vince', year: '1990' }
    ]
  },

  'risk-fixed-fractional-sizing': {
    id: 'art-risk-sizing',
    nodeId: 'risk-1-2',
    slug: 'risk-fixed-fractional-sizing',
    title: 'Fixed Fractional Sizing & Formula Kelly Criterion',
    category: 'Core Foundation',
    level: 1,
    readingTimeMinutes: 13,
    difficulty: 'Beginner',
    summary: 'Menghitung ukuran lot secara dinamis berdasarkan jarak invalidasi struktural (Stop Loss) sehingga kerugian moneter selalu konstan.',
    prerequisites: ['risk-ruin-geometric-drawdown'],
    tableOfContents: [
      { id: 'formula-lot', title: '1. Formula Matematis Ukuran Posisi' },
      { id: 'kelly-criterion', title: '2. Konsep Kelly Criterion' },
      { id: 'half-kelly', title: '3. Penerapan Half-Kelly di Dunia Riil' }
    ],
    sections: [
      {
        id: 'formula-lot',
        title: '1. Formula Matematis Ukuran Posisi',
        content: `Ukuran lot = (Ekuitas Akun × Risiko %) / (Jarak SL pips × Nilai per pip). Kerugian dolar selalu identik.`
      },
      {
        id: 'kelly-criterion',
        title: '2. Konsep Kelly Criterion',
        content: `Formula alokasi modal optimal berdasarkan edge: K% = W - ((1 - W) / R).`
      },
      {
        id: 'half-kelly',
        title: '3. Penerapan Half-Kelly di Dunia Riil',
        content: `Full Kelly terlalu volatil untuk pasar finansial. Gunakan Half-Kelly (50% dari formula) untuk pertumbuhan optimal tanpa stres.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menggunakan ukuran lot tetap (misal 1 lot terus menerus).',
        correction: 'Sesuaikan lot dengan jarak pips Stop Loss setiap kali membuka posisi.'
      }
    ],
    keyTakeaways: [
      'Lot dinamis menjaga kerugian uang tunai selalu konstan.',
      'Gunakan kalkulator ukuran lot sebelum setiap eksekusi.'
    ],
    relatedTopics: [
      { slug: 'risk-mathematical-expectancy', title: 'Mathematical Expectancy', category: 'Risk' }
    ],
    references: [
      { title: 'Fortune\'s Formula', author: 'William Poundstone', year: '2005' }
    ]
  },

  'risk-mathematical-expectancy': {
    id: 'art-risk-ev',
    nodeId: 'risk-2-1',
    slug: 'risk-mathematical-expectancy',
    title: 'Ekspektansi Positif (EV): Menghitung Edge Statistik',
    category: 'Core Foundation',
    level: 2,
    readingTimeMinutes: 13,
    difficulty: 'Intermediate',
    summary: 'Rumus Expected Value: EV = (Win Rate × Avg Win) - (Loss Rate × Avg Loss). Mengapa trading adalah bisnis statistik angka besar.',
    prerequisites: ['risk-fixed-fractional-sizing'],
    tableOfContents: [
      { id: 'rumus-ev', title: '1. Rumus Expected Value' },
      { id: 'hukum-angka-besar', title: '2. Hukum Angka Besar (Law of Large Numbers)' },
      { id: 'audit-edge', title: '3. Audit Edge Sistem Anda' }
    ],
    sections: [
      {
        id: 'rumus-ev',
        title: '1. Rumus Expected Value',
        content: `EV = (P_win × W) - (P_loss × L). Sistem yang memiliki EV positif (+EV) akan menghasilkan keuntungan dalam jangka panjang.`
      },
      {
        id: 'hukum-angka-besar',
        title: '2. Hukum Angka Besar (Law of Large Numbers)',
        content: `Dalam 10 trade, hasil bisa acak. Dalam 100 atau 1,000 trade, ekspektansi matematika akan mendominasi dan mewujudkan edge Anda.`
      },
      {
        id: 'audit-edge',
        title: '3. Audit Edge Sistem Anda',
        content: `Hitung EV dari 50 trade terakhir di jurnal. Jika EV negatif, hentikan trading dan perbaiki SOP.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Menilai keandalan sistem trading hanya dari 5 trade pertama.',
        correction: 'Uji sistem dalam blok minimal 30-50 sampel transaksi.'
      }
    ],
    keyTakeaways: [
      'Trading adalah permainan probabilitas dan statistik angka besar.',
      '+EV adalah satu-satunya jaminan profitabilitas jangka panjang.'
    ],
    relatedTopics: [
      { slug: 'risk-asymmetric-rr-winrate', title: 'Asymmetric R:R', category: 'Risk' }
    ],
    references: [
      { title: 'Trade Your Way to Financial Freedom', author: 'Van K. Tharp', year: '1998' }
    ]
  },

  'risk-asymmetric-rr-winrate': {
    id: 'art-risk-asymmetric-rr',
    nodeId: 'risk-2-2',
    slug: 'risk-asymmetric-rr-winrate',
    title: 'Asimetri Payoff: Mengapa Win Rate 40% Bisa Mengalahkan 80%',
    category: 'Core Foundation',
    level: 2,
    readingTimeMinutes: 12,
    difficulty: 'Intermediate',
    summary: 'Bukti matematis bahwa rasio Risk:Reward 1:3 dengan win rate 40% mengalahkan sistem win rate 85% dengan rasio risiko negatif.',
    prerequisites: ['risk-mathematical-expectancy'],
    tableOfContents: [
      { id: 'ilusi-winrate', title: '1. Ilusi Win Rate Tinggi' },
      { id: 'matematika-asimetri', title: '2. Matematika Asimetri R:R 1:3' },
      { id: 'psikologi-kekalahan', title: '3. Menerima Sering Salah' }
    ],
    sections: [
      {
        id: 'ilusi-winrate',
        title: '1. Ilusi Win Rate Tinggi',
        content: `Win rate 90% dengan risiko $500 untuk untung $50 bisa hancur oleh 2 kekalahan beruntun.`
      },
      {
        id: 'matematika-asimetri',
        title: '2. Matematika Asimetri R:R 1:3',
        content: `Win rate 40% dengan R:R 1:3 menghasilkan profit bersih +60R setiap 100 transaksi.`
      },
      {
        id: 'psikologi-kekalahan',
        title: '3. Menerima Sering Salah',
        content: `Kekalahan adalah biaya operasional bisnis yang wajar, bukan cerminan kegagalan pribadi.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Merasa minder saat win rate hanya berada di angka 40-50%.',
        correction: 'Fokus pada rasio keuntungan rata-rata dibanding kerugian rata-rata.'
      }
    ],
    keyTakeaways: [
      'Asymmetric payoff melindungi akun dari kerugian fatal.',
      'Anda bisa salah 60% dari waktu dan tetap menjadi jutawan.'
    ],
    relatedTopics: [
      { slug: 'risk-correlation-exposure-heatsinks', title: 'Portfolio Risk', category: 'Risk' }
    ],
    references: [
      { title: 'Fooled by Randomness', author: 'Nassim Nicholas Taleb', year: '2001' }
    ]
  },

  'risk-correlation-exposure-heatsinks': {
    id: 'art-risk-correlation',
    nodeId: 'risk-3-1',
    slug: 'risk-correlation-exposure-heatsinks',
    title: 'Risiko Korelasi Multi-Aset & Batas Heat Portofolio',
    category: 'Core Foundation',
    level: 3,
    readingTimeMinutes: 13,
    difficulty: 'Intermediate',
    summary: 'Menghindari ilusi diversifikasi: membuka buy di EURUSD, GBPUSD, dan AUDUSD hakikatnya adalah 1 posisi 3x risiko terhadap USD.',
    prerequisites: ['risk-asymmetric-rr-winrate'],
    tableOfContents: [
      { id: 'ilusi-diversifikasi', title: '1. Ilusi Diversifikasi Semu' },
      { id: 'matriks-korelasi', title: '2. Membaca Matriks Korelasi' },
      { id: 'portfolio-heat', title: '3. Batas Portfolio Heat 3-5%' }
    ],
    sections: [
      {
        id: 'ilusi-diversifikasi',
        title: '1. Ilusi Diversifikasi Semu',
        content: `Membuka beberapa posisi yang berkorelasi tinggi terhadap satu mata uang induk sama saja dengan memperbesar ukuran lot taruhan.`
      },
      {
        id: 'matriks-korelasi',
        title: '2. Membaca Matriks Korelasi',
        content: `Gunakan koefisien korelasi Pearson: jika nilai korelasi > +0.70, batasi hanya membuka 1 instrumen terbaik.`
      },
      {
        id: 'portfolio-heat',
        title: '3. Batas Portfolio Heat 3-5%',
        content: `Maksimal total modal yang sedang dipertaruhkan di pasar tidak boleh lebih dari 3% - 5% secara serentak.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Membuka 5 posisi buy pada pasangan mata uang yang sama-sama melawan USD.',
        correction: 'Pilih hanya 1 pasangan yang memiliki setup struktur paling bersih.'
      }
    ],
    keyTakeaways: [
      'Korelasi tersembunyi melipatgandakan risiko kerugian.',
      'Jaga total Portfolio Heat di bawah 4%.'
    ],
    relatedTopics: [
      { slug: 'risk-daily-drawdown-circuit-breakers', title: 'Circuit Breakers', category: 'Risk' }
    ],
    references: [
      { title: 'Portfolio Protection Dynamics', author: 'TLP Risk Desk', year: '2024' }
    ]
  },

  'risk-daily-drawdown-circuit-breakers': {
    id: 'art-risk-circuit-breaker',
    nodeId: 'risk-3-2',
    slug: 'risk-daily-drawdown-circuit-breakers',
    title: 'Batas Kerugian Harian & Hard Circuit Breaker Otomatis',
    category: 'Core Foundation',
    level: 3,
    readingTimeMinutes: 12,
    difficulty: 'Intermediate',
    summary: 'Menerapkan batas kerugian harian maksimal (Max Daily Loss 3%) yang mematikan eksekusi trading secara paksa.',
    prerequisites: ['risk-correlation-exposure-heatsinks'],
    tableOfContents: [
      { id: 'max-daily-loss', title: '1. Aturan Max Daily Loss (-3R)' },
      { id: 'circuit-breaker-protokol', title: '2. Protokol Hard Circuit Breaker' },
      { id: 'pencegahan-revenge', title: '3. Menghentikan Siklus Balas Dendam' }
    ],
    sections: [
      {
        id: 'max-daily-loss',
        title: '1. Aturan Max Daily Loss (-3R)',
        content: `Batas kerugian maksimal dalam 1 hari kalender: -3R (3% dari modal). Jika tersentuh, hari perdagangan resmi berakhir.`
      },
      {
        id: 'circuit-breaker-protokol',
        title: '2. Protokol Hard Circuit Breaker',
        content: `Tutup seluruh chart, kunci platform trading, dan tinggalkan meja kerja hingga sesi hari berikutnya.`
      },
      {
        id: 'pencegahan-revenge',
        title: '3. Menghentikan Siklus Balas Dendam',
        content: `Revenge trading selalu terjadi saat emosi tidak stabil; circuit breaker adalah pengaman fisik modal Anda.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mencoba "satu trade lagi" setelah mengalami 3 loss beruntun.',
        correction: 'Patuhi circuit breaker 100% tanpa pengecualian.'
      }
    ],
    keyTakeaways: [
      'Circuit breaker melindungi trader dari kehancuran di hari terburuknya.',
      'Besok pasar masih akan tetap buka; modal Anda yang belum tentu.'
    ],
    relatedTopics: [
      { slug: 'psych-cognitive-biases-trading', title: 'Cognitive Biases', category: 'Risk' }
    ],
    references: [
      { title: 'The Mental Game of Trading', author: 'Jared Tendler', year: '2021' }
    ]
  },

  'psych-cognitive-biases-trading': {
    id: 'art-psych-biases',
    nodeId: 'risk-4-1',
    slug: 'psych-cognitive-biases-trading',
    title: 'Bias Kognitif Mematikan: Disposition Effect & Gambler\'s Fallacy',
    category: 'Core Foundation',
    level: 4,
    readingTimeMinutes: 14,
    difficulty: 'Intermediate',
    summary: 'Mengatasi kecenderungan menjual pemenang terlalu cepat dan membiarkan posisi rugi membengkak serta ilusi giliran menang.',
    prerequisites: ['risk-daily-drawdown-circuit-breakers'],
    tableOfContents: [
      { id: 'disposition-effect', title: '1. Disposition Effect (Kahneman Prospect Theory)' },
      { id: 'gamblers-fallacy', title: '2. Gambler\'s Fallacy di Pasar Finansial' },
      { id: 'sunk-cost', title: '3. Sunk Cost Fallacy & Averaging Down' }
    ],
    sections: [
      {
        id: 'disposition-effect',
        title: '1. Disposition Effect (Kahneman Prospect Theory)',
        content: `Kecenderungan psikologis menutup posisi profit kecil karena takut keuntungannya hilang, namun menahan posisi rugi berhari-hari karena takut mengakui kekalahan.`
      },
      {
        id: 'gamblers-fallacy',
        title: '2. Gambler\'s Fallacy di Pasar Finansial',
        content: `Keyakinan keliru bahwa setelah kalah 4 kali, trade ke-5 "pasti menang". Setiap trade adalah peristiwa probabilitas independen.`
      },
      {
        id: 'sunk-cost',
        title: '3. Sunk Cost Fallacy & Averaging Down',
        content: `Menambah posisi pada aset yang merugi karena merasa sudah menginvestasikan banyak uang adalah jebakan fatal.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Melakukan averaging down pada posisi floating loss.',
        correction: 'Biarkan Stop Loss memotong kerugian pada titik invalidasi logis.'
      }
    ],
    keyTakeaways: [
      'Otak manusia tidak dirancang secara alami untuk trading finansial.',
      'SOP mekanis adalah obat penawar bias kognitif.'
    ],
    relatedTopics: [
      { slug: 'psych-neuroscience-tilt-fomo', title: 'Neuroscience of Tilt', category: 'Risk' }
    ],
    references: [
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011' }
    ]
  },

  'psych-neuroscience-tilt-fomo': {
    id: 'art-psych-neuroscience',
    nodeId: 'risk-4-2',
    slug: 'psych-neuroscience-tilt-fomo',
    title: 'Neurobiologi Tilt, Amigdala Hijack, & Manajemen Emosi',
    category: 'Core Foundation',
    level: 4,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Memahami bagaimana korteks prefrontal lumpuh saat mengalami kekalahan beruntun dan protokol fisik menghentikan tilt.',
    prerequisites: ['psych-cognitive-biases-trading'],
    tableOfContents: [
      { id: 'amigdala-hijack', title: '1. Mekanisme Amygdala Hijack' },
      { id: 'gejala-tilt', title: '2. Mengenali Gejala Fisik Tilt' },
      { id: 'protokol-sigh', title: '3. Protokol Physiological Sigh' }
    ],
    sections: [
      {
        id: 'amigdala-hijack',
        title: '1. Mekanisme Amygdala Hijack',
        content: `Amigdala mendeteksi kerugian finansial sebagai ancaman hidup fisik, melepaskan hormon kortisol, dan melumpuhkan logika korteks prefrontal.`
      },
      {
        id: 'gejala-tilt',
        title: '2. Mengenali Gejala Fisik Tilt',
        content: `Detak jantung meningkat, otot rahang mengencang, nafas menjadi dangkal, dan keinginan kuat membuka posisi tanpa analisa.`
      },
      {
        id: 'protokol-sigh',
        title: '3. Protokol Physiological Sigh',
        content: `Dua hirupan cepat lewat hidung diikuti satu hembusan panjang lewat mulut. Ulangi 5 kali untuk menurunkan denyut jantung secara instan.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Tetap berada di depan layar monitor saat sedang merasakan amarah.',
        correction: 'Berdiri dan menjauh dari perangkat komputer minimal 15 menit.'
      }
    ],
    keyTakeaways: [
      'Tilt adalah reaksi biologis sistem syaraf, bukan kegagalan moral.',
      'Gunakan protokol pernapasan fisiologis untuk meredam respons stres.'
    ],
    relatedTopics: [
      { slug: 'psych-probabilistic-mindset', title: 'Probabilistic Mindset', category: 'Risk' }
    ],
    references: [
      { title: 'The Daily Trading Coach', author: 'Brett N. Steenbarger', year: '2009' }
    ]
  },

  'psych-probabilistic-mindset': {
    id: 'art-psych-probabilistic',
    nodeId: 'risk-5-1',
    slug: 'psych-probabilistic-mindset',
    title: 'Pola Pikir Probabilistik: Think in Bets (Mark Douglas Framework)',
    category: 'Core Foundation',
    level: 5,
    readingTimeMinutes: 15,
    difficulty: 'Advanced',
    summary: 'Menghilangkan beban ekspektasi pada setiap trade individual dan memandang trading sebagai 20 sampel distribusi acak.',
    prerequisites: ['psych-neuroscience-tilt-fomo'],
    tableOfContents: [
      { id: 'lima-kebenaran', title: '1. 5 Kebenaran Fundamental Pasar' },
      { id: 'thinking-in-bets', title: '2. Konsep Thinking in Bets' },
      { id: 'distribusi-sampel', title: '3. Evaluasi Performa Blok 20-Trade' }
    ],
    sections: [
      {
        id: 'lima-kebenaran',
        title: '1. 5 Kebenaran Fundamental Pasar',
        content: `1. Apapun bisa terjadi setiap saat. 2. Tidak perlu tahu masa depan untuk untung. 3. Distribusi menang/kalah acak. 4. Edge hanyalah probabilitas. 5. Setiap momen unik.`
      },
      {
        id: 'thinking-in-bets',
        title: '2. Konsep Thinking in Bets',
        content: `Pisahkan keputusan yang baik dari hasil akhir moneter jangka pendek. Trade yang mematuhi SOP adalah trade yang baik terlepas dari menang atau kalah.`
      },
      {
        id: 'distribusi-sampel',
        title: '3. Evaluasi Performa Blok 20-Trade',
        content: `Nilai kinerja trading Anda dalam blok minimal 20 atau 50 trade, bukan trade per trade.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mengubah strategi setelah mengalami 2 kekalahan berturut-turut.',
        correction: 'Dua kekalahan adalah varians normal dari distribusi acak.'
      }
    ],
    keyTakeaways: [
      'Pola pikir probabilistik membebaskan trader dari stres emosional.',
      'Fokus pada kepatuhan eksekusi proses, bukan hasil sesaat.'
    ],
    relatedTopics: [
      { slug: 'risk-trading-plan-operational-readiness', title: 'Trading Plan SOP', category: 'Risk' }
    ],
    references: [
      { title: 'Trading in the Zone', author: 'Mark Douglas', year: '2000' },
      { title: 'Thinking in Bets', author: 'Annie Duke', year: '2018' }
    ]
  },

  'risk-trading-plan-operational-readiness': {
    id: 'art-risk-plan-sop',
    nodeId: 'risk-5-2',
    slug: 'risk-trading-plan-operational-readiness',
    title: 'Protokol Trading Plan Institusional & Checklist Kesiapan Harian',
    category: 'Core Foundation',
    level: 5,
    readingTimeMinutes: 14,
    difficulty: 'Advanced',
    summary: 'Menyusun standard operating procedure (SOP) pra-pasar, protokol eksekusi tanpa kompromi, dan audit jurnal metrik mingguan.',
    prerequisites: ['psych-probabilistic-mindset'],
    tableOfContents: [
      { id: 'struktur-trading-plan', title: '1. Struktur Wajib Trading Plan' },
      { id: 'checklist-pra-pasar', title: '2. Checklist Kesiapan Pra-Pasar' },
      { id: 'audit-mingguan', title: '3. Audit Metrik Jurnal Mingguan' }
    ],
    sections: [
      {
        id: 'struktur-trading-plan',
        title: '1. Struktur Wajib Trading Plan',
        content: `Kriteria setup If-Then, manajemen ukuran lot, aturan Stop Loss objektif, target Take Profit, dan batasan Max Daily Loss tertulis.`
      },
      {
        id: 'checklist-pra-pasar',
        title: '2. Checklist Kesiapan Pra-Pasar',
        content: `Cek kalender berita makroekonomi, verifikasi kondisi fisik dan emosi, serta tandai level kunci HTF sebelum sesi aktif.`
      },
      {
        id: 'audit-mingguan',
        title: '3. Audit Metrik Jurnal Mingguan',
        content: `Evaluasi rasio R:R aktual, tingkat kepatuhan SOP, slippage broker, dan identifikasi kesalahan berulang.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trading tanpa rencana tertulis.',
        correction: 'Jika tidak tertulis dalam plan, maka dilarang dieksekusi di chart.'
      }
    ],
    keyTakeaways: [
      'Trading plan adalah konstitusi hukum bagi seorang trader profesional.',
      'Konsistensi eksekusi melahirkan konsistensi hasil finansial.'
    ],
    relatedTopics: [
      { slug: 'risk-management-psychology-mastery', title: 'Risk Mastery', category: 'Risk' }
    ],
    references: [
      { title: 'One Good Trade', author: 'Mike Bellafiore', year: '2010' }
    ]
  }
};
