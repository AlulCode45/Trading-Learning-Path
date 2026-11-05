import { EducationalArticle } from '../../types';

export const RISK_ARTICLES: Record<string, EducationalArticle> = {
  // Master Guide Risk & Psychology
  'risk-management-psychology-mastery': {
    id: 'art-risk-mastery',
    slug: 'risk-management-psychology-mastery',
    title: 'Manajemen Risiko & Psikologi Trading: Matematika Bertahan Hidup Finansial & Penguasaan Emosi',
    category: 'Core Foundation',
    level: 1,
    readingTimeMinutes: 24,
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
        visualType: 'drawdown_recovery_curve',
        callout: {
          type: 'warning',
          title: 'Asimetri Pemulihan Modal',
          text: 'Kerugian 50% membutuhkan keuntungan 100% untuk kembali ke modal awal. Kerugian 90% membutuhkan keuntungan 900%!'
        },
        financialExample: {
          scenario: 'Trader A merisikokan 10% per posisi pada akun $10,000. Mengalami 5 kekalahan beruntun karena pasar sedang choppy.',
          analysis: 'Modal berkurang menjadi: $10,000 × (0.90)^5 = $5,904 (Drawdown -41%). Untuk kembali ke $10,000, dia membutuhkan gain +69.3%.',
          outcome: 'Trader panik, melakukan balas dendam (revenge trading), menaikkan lot, dan menghabiskan sisa akun dalam 48 jam.'
        },
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
        visualType: 'risk_position_sizing_calc',
        callout: {
          type: 'tip',
          title: 'Konsistensi Nilai Dolar',
          text: 'Ukuran lot harus dihitung dinamis. Jangan pernah menggunakan ukuran lot statis untuk jarak Stop Loss yang berbeda-beda.'
        },
        financialExample: {
          scenario: 'Akun $10,000 dengan toleransi risiko 1% ($100). Setup 1: SL 20 pips pada EUR/USD. Setup 2: SL 50 pips pada GBP/JPY.',
          analysis: 'Setup 1: Lot = $100 / (20 × $10) = 0.50 lot. Setup 2: Lot = $100 / (50 × $6.80) = 0.29 lot.',
          outcome: 'Kedua trade memiliki risiko moneter yang persis sama ($100). Portofolio terlindungi secara matematis.'
        },
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
        visualType: 'risk_reward_calc',
        callout: {
          type: 'note',
          title: 'Asimetri Adalah Kunci',
          text: 'Sistem dengan win rate 40% dan rasio R:R 1:3 menghasilkan profit bersih yang jauh lebih besar daripada sistem win rate 80% dengan R:R 0.25:1.'
        },
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
        visualType: 'trade_journaling',
        callout: {
          type: 'warning',
          title: 'Korelasi Tersembunyi',
          text: 'Membuka buy EUR/USD, buy GBP/USD, dan buy XAU/USD sekaligus bukanlah diversifikasi, melainkan 1 posisi 3x lipat melawan US Dollar.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'drawdown_recovery_curve',
        callout: {
          type: 'warning',
          title: 'Efek Eksponensial Drawdown',
          text: 'Kerugian 10% membutuhkan pemulihan 11.1%. Kerugian 50% butuh 100%. Kerugian 75% butuh 300%. Jangan biarkan kerugian melampaui 10%.'
        },
        content: `Penurunan modal 10% butuh 11% untung. Penurunan 50% butuh 100% untung. Penurunan 75% butuh 300% untung. Hindari drawdown besar dengan segala cara.`
      },
      {
        id: 'kurva-ruin',
        title: '2. Kurva Probabilitas Kebangkrutan',
        callout: {
          type: 'tip',
          title: 'Ambang Batas Kritis',
          text: 'Pada risiko di atas 2.5% per trade, kurva kebangkrutan melonjak vertikal dari 0.1% menjadi lebih dari 45%.'
        },
        content: `Ketika risiko per trade naik di atas 3%, kurva Risk of Ruin melonjak secara eksponensial menuju kepastian kebangkrutan.`
      },
      {
        id: 'aturan-1-persen',
        title: '3. Mengapa Aturan 1% Menyelamatkan Anda',
        financialExample: {
          scenario: 'Trader mengalami bad run (rentetan kekalahan terburuk dalam 3 tahun backtest: 12 kekalahan beruntun).',
          analysis: 'Dengan risiko 1% per posisi: Sisa modal = $10,000 × (0.99)^12 = $8,863 (Drawdown hanya -11.3%). Jika merisikokan 5%: Sisa modal = $5,403 (-46%).',
          outcome: 'Trader dengan risiko 1% tetap tenang, tidak terpengaruh emosi, dan dengan mudah memulihkan modal dalam 3 pekan berikutnya.'
        },
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
    readingTimeMinutes: 15,
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
        visualType: 'risk_position_sizing_calc',
        callout: {
          type: 'note',
          title: 'Formula Sakral Sizing',
          text: 'Ukuran Lot = (Ekuitas Akun × Risiko %) / (Jarak SL pips × Nilai per pip)'
        },
        content: `Ukuran lot = (Ekuitas Akun × Risiko %) / (Jarak SL pips × Nilai per pip). Kerugian dolar selalu identik.`
      },
      {
        id: 'kelly-criterion',
        title: '2. Konsep Kelly Criterion',
        callout: {
          type: 'tip',
          title: 'Formula Kelly',
          text: 'K% = W - ((1 - W) / R), di mana W = Win Rate dan R = Rasio Win/Loss.'
        },
        content: `Formula alokasi modal optimal berdasarkan edge: K% = W - ((1 - W) / R).`
      },
      {
        id: 'half-kelly',
        title: '3. Penerapan Half-Kelly di Dunia Riil',
        financialExample: {
          scenario: 'Sistem trading memiliki Win Rate 50% dan Rasio R:R 2.0. Formula Kelly penuh menyarankan risiko 25% modal per posisi.',
          analysis: 'Risiko 25% terlalu agresif dan menyebabkan volatilitas ekuitas yang menghancurkan mental.',
          outcome: 'Menerapkan Half-Kelly atau Fractional Kelly (1% - 2%) menghasilkan kurva ekuitas mulus dengan pertumbuhan modal konsisten tanpa risiko kebangkrutan.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'risk_reward_calc',
        callout: {
          type: 'note',
          title: 'Definisi Nilai Harapan (EV)',
          text: 'EV mengukur nilai rata-rata yang Anda hasilkan dari setiap dolar yang Anda pertaruhkan di pasar dalam jangka panjang.'
        },
        content: `EV = (P_win × W) - (P_loss × L). Sistem yang memiliki EV positif (+EV) akan menghasilkan keuntungan dalam jangka panjang.`
      },
      {
        id: 'hukum-angka-besar',
        title: '2. Hukum Angka Besar (Law of Large Numbers)',
        callout: {
          type: 'tip',
          title: 'Statistik Angka Besar',
          text: 'Jangan ubah strategi hanya karena 3 kekalahan. Evaluasi performa sistem dalam blok minimal 30 transaksi.'
        },
        content: `Dalam 10 trade, hasil bisa acak. Dalam 100 atau 1,000 trade, ekspektansi matematika akan mendominasi dan mewujudkan edge Anda.`
      },
      {
        id: 'audit-edge',
        title: '3. Audit Edge Sistem Anda',
        financialExample: {
          scenario: 'Trader mencatat 60 trade di jurnal: 24 menang (rata-rata gain +$280), 36 kalah (rata-rata loss -$100).',
          analysis: 'EV = (0.40 × $280) - (0.60 × $100) = $112 - $60 = +$52 per trade.',
          outcome: 'Dari 60 trade, total profit bersih adalah 60 × $52 = +$3,120 meskipun trader kalah 36 kali (win rate hanya 40%).'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'risk_reward_calc',
        callout: {
          type: 'warning',
          title: 'Jebakan Martingale & Scalping Negatif',
          text: 'Sistem yang merisikokan $500 untuk memburu $50 memiliki win rate tinggi semu (90%), namun satu bad trade menghapus profit 10 trade sebelumnya.'
        },
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
        financialExample: {
          scenario: 'Trader profesional mengeksekusi 10 trade dengan R:R 1:3. Menang 4 kali (+12R), kalah 6 kali (-6R).',
          analysis: 'Tingkat akurasi hanya 40%, namun hasil bersih adalah +6R (+6% dari total ekuitas akun).',
          outcome: 'Trader merasa santai saat kalah karena tahu kerugian adalah ongkos operasional bisnis untuk menangkap keuntungan asimetris.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'smt_divergence_diagram',
        callout: {
          type: 'warning',
          title: 'Taruhan Bertumpuk',
          text: 'Membuka 3 posisi pada aset dengan korelasi > 0.85 melipatgandakan risiko kerugian menjadi 3% dalam satu arah pergerakan pasar.'
        },
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
        financialExample: {
          scenario: 'Trader ingin mengambil setup Buy EUR/USD (1% risk), Buy GBP/USD (1% risk), dan Buy Gold (1% risk).',
          analysis: 'Ketiga instrumen memiliki korelasi negatif > 0.80 terhadap indeks dolar AS (DXY). Jika DXY menguat mendadak karena rilis CPI, ketiga posisi akan terkena SL secara serentak.',
          outcome: 'Penerapan aturan Portfolio Heat: Trader hanya memilih 1 setup terbaik (GBP/USD) dengan konfirmasi SMT, sehingga risiko total portofolio tetap terkunci di 1%.'
        },
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
    readingTimeMinutes: 14,
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
        visualType: 'trade_journaling',
        callout: {
          type: 'warning',
          title: 'Batas Toleransi Harian: -3R',
          text: 'Tiga kekalahan dalam satu hari kalender berarti pasar sedang tidak bersahabat atau kondisi mental Anda sedang terganggu. Wajib berhenti!'
        },
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
        financialExample: {
          scenario: 'Trader mengalami 3 kekalahan berturut-turut pada sesi London (-$300 pada akun $10,000).',
          analysis: 'Dorongan kuat muncul untuk "membalas" kekalahan di sesi New York dengan menaikkan lot menjadi 2x lipat.',
          outcome: 'Circuit Breaker diaktifkan: Trader mematikan PC dan pergi berolahraga. Hari berikutnya pasar kembali normal dan trader meraih +4R, menutup drawdown dengan tenang.'
        },
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
    readingTimeMinutes: 15,
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
        callout: {
          type: 'warning',
          title: 'Memotong Bunga, Menyiram Benalu',
          text: 'Menutup trade profit terlalu cepat dan menahan posisi loss berhari-hari adalah penyebab nomor 1 kehancuran akun retail.'
        },
        content: `Kecenderungan psikologis menutup posisi profit kecil karena takut keuntungannya hilang, namun menahan posisi rugi berhari-hari karena takut mengakui kekalahan.`
      },
      {
        id: 'gamblers-fallacy',
        title: '2. Gambler\'s Fallacy di Pasar Finansial',
        callout: {
          type: 'tip',
          title: 'Setiap Lemparan Koin Bersifat Bebas',
          text: 'Koin tidak punya ingatan; pasar juga tidak punya ingatan. Trade ke-5 tidak memiliki kewajiban untuk menang hanya karena trade 1-4 kalah.'
        },
        content: `Keyakinan keliru bahwa setelah kalah 4 kali, trade ke-5 "pasti menang". Setiap trade adalah peristiwa probabilitas independen.`
      },
      {
        id: 'sunk-cost',
        title: '3. Sunk Cost Fallacy & Averaging Down',
        financialExample: {
          scenario: 'Trader membeli saham di $100. Harga turun ke $90. Alih-alih cut loss, trader membeli lagi di $90 untuk "meratakan harga". Harga terus anjlok ke $60.',
          analysis: 'Perilaku averaging down pada posisi rugi memperbesar eksposur risiko pada aset yang terbukti sedang melemah.',
          outcome: 'Kerugian membengkak dari -$100 menjadi -$1,200, melumpuhkan portofolio selama berbulan-bulan.'
        },
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
    readingTimeMinutes: 15,
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
        callout: {
          type: 'note',
          title: 'Respon Bertahan Hidup Primitif',
          text: 'Amigdala tidak membedakan antara ancaman diserang predator liar dengan ancaman kehilangan $500 di pasar modal.'
        },
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
        financialExample: {
          scenario: 'Trader baru saja mengalami slippage buruk saat berita rilis dan kehilangan $200. Tangan mulai bergetar dan kursor diarahkan untuk klik Buy dengan lot ganda.',
          analysis: 'Gejala amigdala hijack aktif. Trader segera melepaskan mouse dan melakukan protokol Physiological Sigh selama 3 menit.',
          outcome: 'Detak jantung turun dari 115 bpm ke 72 bpm, korteks prefrontal kembali aktif, dan trader membatalkan rencana eksekusi impulsif.'
        },
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
    readingTimeMinutes: 16,
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
        visualType: 'trade_journaling',
        callout: {
          type: 'note',
          title: 'Filosofi Mark Douglas',
          text: 'Anda tidak perlu tahu apa yang akan terjadi selanjutnya di chart untuk menghasilkan keuntungan konsisten.'
        },
        content: `1. Apapun bisa terjadi setiap saat. 2. Tidak perlu tahu masa depan untuk untung. 3. Distribusi menang/kalah acak. 4. Edge hanyalah probabilitas. 5. Setiap momen unik.`
      },
      {
        id: 'thinking-in-bets',
        title: '2. Konsep Thinking in Bets',
        callout: {
          type: 'tip',
          title: 'Pisahkan Keputusan dari Hasil',
          text: 'Trade yang mematuhi SOP tetapi berakhir rugi adalah trade yang baik. Trade yang melanggar SOP tetapi untung adalah trade yang buruk.'
        },
        content: `Pisahkan keputusan yang baik dari hasil akhir moneter jangka pendek. Trade yang mematuhi SOP adalah trade yang baik terlepas dari menang atau kalah.`
      },
      {
        id: 'distribusi-sampel',
        title: '3. Evaluasi Performa Blok 20-Trade',
        financialExample: {
          scenario: 'Trader mengevaluasi 20 trade: 8 menang dan 12 kalah. Trader tidak merasa stres karena setiap trade diposisikan dengan R:R 1:3.',
          analysis: 'Hasil: (8 × 3R) - (12 × 1R) = 24R - 12R = +12R keuntungan bersih.',
          outcome: 'Pola pikir probabilistik menghasilkan eksekusi yang rileks, bebas dari rasa takut salah.'
        },
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
    readingTimeMinutes: 15,
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
        visualType: 'trade_journaling',
        callout: {
          type: 'note',
          title: 'Konstitusi Tertulis',
          text: 'Jika sebuah kondisi pasar tidak tertulis di dalam Trading Plan Anda, maka Anda dilarang keras menekan tombol Buy atau Sell.'
        },
        content: `Kriteria setup If-Then, manajemen ukuran lot, aturan Stop Loss objektif, target Take Profit, dan batasan Max Daily Loss tertulis.`
      },
      {
        id: 'checklist-pra-pasar',
        title: '2. Checklist Kesiapan Pra-Pasar',
        callout: {
          type: 'tip',
          title: '3 Pertanyaan Pra-Pasar',
          text: '1. Apakah ada berita High Impact hari ini? 2. Apakah saya cukup tidur dan fokus? 3. Di mana zona nilai HTF kunci saat ini?'
        },
        content: `Cek kalender berita makroekonomi, verifikasi kondisi fisik dan emosi, serta tandai level kunci HTF sebelum sesi aktif.`
      },
      {
        id: 'audit-mingguan',
        title: '3. Audit Metrik Jurnal Mingguan',
        financialExample: {
          scenario: 'Pada audit mingguan, trader menemukan bahwa 70% kerugian terjadi pada posisi yang dibuka di luar jam sesi Killzone.',
          analysis: 'Data jurnal mengungkapkan kebocoran modal bukan berasal dari strategi teknikal, melainkan ketidakdisiplinan waktu trading.',
          outcome: 'Trader memperbarui aturan SOP untuk hanya trading di London/NY Open, mengeliminasi 70% kerugian pada pekan berikutnya.'
        },
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
