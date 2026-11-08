export interface NodeSeedData {
  id: string;
  roadmap_id: string;
  parent_node_id: string | null;
  level: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  visual_type: string;
  coordinates_x: number;
  coordinates_y: number;
  order_index: number;
  checklists: string[];
  resources: Array<{ title: string; author: string; url: string; type: string }>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const ALL_ROADMAPS_METADATA = [
  {
    id: 'rm-price-action',
    slug: 'price-action-market-structure',
    title: 'Price Action & Market Structure',
    description: 'Fondasi utama membaca perilaku harga murni, struktur pasar fraktal, likuiditas, dan area nilai tanpa ketergantungan indikator lag.',
    category: 'Technical Analysis',
    difficulty: 'Semua Level',
    is_official: 1,
    estimated_hours: 45,
    nodes_count: 12
  },
  {
    id: 'rm-smc-ict',
    slug: 'smart-money-concepts-ict',
    title: 'Smart Money Concepts (SMC) & ICT',
    description: 'Memahami jejak institusi keuangan melalui Order Blocks, Fair Value Gaps (FVG), sesi Interbank Killzones, dan algoritma IPDA.',
    category: 'Institutional Trading',
    difficulty: 'Intermediate - Advanced',
    is_official: 1,
    estimated_hours: 60,
    nodes_count: 12
  },
  {
    id: 'rm-wyckoff',
    slug: 'wyckoff-method-vsa',
    title: 'Wyckoff Method & Volume Spread Analysis',
    description: 'Prinsip akumulasi, distribusi, spring, markup, dan analisis interaksi volume terhadap pergerakan rentang harga.',
    category: 'Classical Analysis',
    difficulty: 'Advanced',
    is_official: 1,
    estimated_hours: 50,
    nodes_count: 11
  },
  {
    id: 'rm-risk-psychology',
    slug: 'risk-management-psychology',
    title: 'Risk Management & Trading Psychology',
    description: 'Matematika bertahan hidup: fractional position sizing, asymmetric R:R, mitigasi tilt emosional, dan disiplin eksekusi trading plan.',
    category: 'Core Foundation',
    difficulty: 'Wajib untuk Semua',
    is_official: 1,
    estimated_hours: 30,
    nodes_count: 10
  },
  {
    id: 'rm-quant-algo',
    slug: 'quantitative-algo-trading',
    title: 'Quantitative & Algorithmic Trading',
    description: 'Pemrograman Python finansial, backtesting sistematis tanpa bias, Pine Script v5, serta manajemen portofolio kuantitatif.',
    category: 'Quantitative',
    difficulty: 'Advanced',
    is_official: 1,
    estimated_hours: 80,
    nodes_count: 12
  },
  {
    id: 'rm-edianto-ong',
    slug: 'technical-analysis-mega-profit',
    title: 'Technical Analysis for Mega Profit (Edianto Ong)',
    description: 'Kurikulum lengkap 29 Bab buku legendaris Edianto Ong: dari 3 Aksioma, Dow Theory, Geometri Tren & Fan Principle, Elliott Wave, Indikator, hingga Suicide Anomaly & Trading System.',
    category: 'Master Curriculum',
    difficulty: 'Semua Level (Dasar s/d Mahir)',
    is_official: 1,
    estimated_hours: 75,
    nodes_count: 29
  },
  {
    id: 'rm-crypto-smart-money',
    slug: 'crypto-smart-money-concept',
    title: 'Crypto Smart Money Concept (Akademi Crypto)',
    description: 'Kurikulum 12 Bab Akademi Crypto: Mengungkap jejak likuiditas Whales & Market Maker, Order Flow CEX/DEX, Liquidity Sweeps, Market Structure, CHoCH, Order Block, dan Manajemen Portofolio 70/30.',
    category: 'Crypto Institutional',
    difficulty: 'Semua Level (Pemula s/d Mahir)',
    is_official: 1,
    estimated_hours: 40,
    nodes_count: 12
  }
];
