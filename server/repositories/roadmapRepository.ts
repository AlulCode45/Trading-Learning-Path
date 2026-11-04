import { db } from '../db/database.ts';

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  is_official: number;
  estimated_hours: number;
  nodes_count: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface RoadmapNode {
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
  status?: string;
  checklists?: Array<{ id: string; text: string; is_completed: boolean }>;
  resources?: Array<{ id: string; title: string; url: string; type: string; author: string | null }>;
  quizzes?: QuizQuestion[];
}

export interface CommunityRoadmap {
  id: string;
  slug: string;
  title: string;
  creator_name: string;
  description: string;
  category: string;
  nodes_json: string;
  upvotes: number;
  created_at: string;
}

const nodeQuizzes: Record<string, QuizQuestion[]> = {
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
      question: 'Mengapa zona Demand yang "Fresh" memiliki probabilitas reaksi lebih tinggi dibandingkan zona "Mitigated"?',
      options: [
        'Karena zona Fresh belum pernah diuji dan masih menyimpan sisa antrean order beli institusi dalam jumlah besar',
        'Karena zona Mitigated selalu pasti tembus',
        'Karena zona Fresh memiliki warna berbeda di TradingView',
        'Tidak ada perbedaan antara keduanya'
      ],
      correctAnswer: 0,
      explanation: 'Setiap pengujian zona menyerap sisa resting orders. Zona yang sudah diuji 3-4 kali kehilangan likuiditas penahan dan rentan jebol.'
    }
  ],
  'node-3-2': [
    {
      id: 'q-3-2-1',
      question: 'Dalam Auction Market Theory, di area mana institusi mencari posisi Buy berprobabilitas tinggi?',
      options: [
        'Di ujung atas zona Premium (> 50% range lelang)',
        'Di zona Discount (< 50% range lelang) karena harga berada di bawah nilai wajar (wholesale price)',
        'Tepat di level harga tertinggi 52 minggu',
        'Di mana saja asalkan indikator RSI oversold'
      ],
      correctAnswer: 1,
      explanation: 'Smart money membeli di harga grosir (Discount) dan mendistribusikan penjualan di harga eceran mahal (Premium).'
    }
  ],
  'node-4-1': [
    {
      id: 'q-4-1-1',
      question: 'Di mana letak utama kumpulan Buy-Side Liquidity (BSL) pada chart?',
      options: [
        'Di bawah support terendah mingguan',
        'Di atas swing highs dan equal tops yang menjadi tumpukan stop loss para seller dan breakout buyer',
        'Di dalam zona konsolidasi flat',
        'Pada harga pembukaan sesi Asia'
      ],
      correctAnswer: 1,
      explanation: 'BSL berakumulasi di atas titik pucuk struktural di mana para trader ritel meletakkan Stop Loss posisi short mereka.'
    }
  ],
  'node-4-2': [
    {
      id: 'q-4-2-1',
      question: 'Apa ciri khas utama dari sebuah Liquidity Sweep yang terkonfirmasi?',
      options: [
        'Harga menembus level kunci dengan sumbu (wick), likuiditas terserap, lalu terjadi displacement agresif menutup kembali ke dalam range',
        'Harga terus bergerak searah tanpa ada perlawanan',
        'Tidak terbentuk sumbu candle sama sekali',
        'Volume transaksi turun menjadi nol'
      ],
      correctAnswer: 0,
      explanation: 'Sweep dicirikan oleh tusukan cepat melahap order di balik level kunci yang langsung dibalas pembalikan agresif (displacement).'
    }
  ],
  'node-5-1': [
    {
      id: 'q-5-1-1',
      question: 'Mengapa kita tidak dianjurkan memasang blind limit order di zona HTF tanpa konfirmasi LTF?',
      options: [
        'Karena tanpa konfirmasi shift di LTF, kita tidak memiliki bukti bahwa pembeli/penjual telah mengambil alih kontrol mempertahankan zona tersebut',
        'Karena timeframe kecil selalu salah',
        'Karena spread broker selalu melebar',
        'Karena dilarang oleh bursa'
      ],
      correctAnswer: 0,
      explanation: 'Konfirmasi LTF (seperti CHoCH pada M15/M5) memberikan konfirmasi objektif bahwa zona HTF direspons sebelum mempertaruhkan modal.'
    }
  ],
  'node-5-2': [
    {
      id: 'q-5-2-1',
      question: 'Dengan target rasio Risk-to-Reward 1:3, berapa win rate minimal yang Anda butuhkan untuk mencapai titik impas (breakeven)?',
      options: [
        '50%',
        '33.3%',
        '25%',
        '66.7%'
      ],
      correctAnswer: 2,
      explanation: 'Formula breakeven: 1 / (1 + 3) = 1/4 = 25%. Dengan R:R 1:3, Anda hanya butuh 25% posisi benar untuk impas.'
    }
  ],
  'node-5-3': [
    {
      id: 'q-5-3-1',
      question: 'Kapan sebuah eksekusi trading dinyatakan sukses secara profesional?',
      options: [
        'Hanya jika menghasilkan keuntungan uang',
        'Ketika aturan trading plan dan batasan risiko ditaati 100%, terlepas dari apakah hasil akhirnya win atau loss',
        'Jika tidak pernah menyentuh stop loss',
        'Jika menggunakan ukuran lot maksimal'
      ],
      correctAnswer: 1,
      explanation: 'Trader profesional mengevaluasi kedisiplinan proses eksekusi, karena hasil satu transaksi bersifat probabilistik acak.'
    }
  ]
};

export class RoadmapRepository {
  getAllRoadmaps(): Roadmap[] {
    return db.prepare('SELECT * FROM roadmaps ORDER BY is_official DESC, created_at ASC').all() as Roadmap[];
  }

  getRoadmapBySlug(slug: string): Roadmap | undefined {
    return db.prepare('SELECT * FROM roadmaps WHERE slug = ?').get(slug) as Roadmap | undefined;
  }

  getNodesForRoadmap(roadmapId: string): RoadmapNode[] {
    const nodes = db.prepare(`
      SELECT n.*, COALESCE(p.status, 'locked') as status
      FROM roadmap_nodes n
      LEFT JOIN user_node_progress p ON n.id = p.node_id
      WHERE n.roadmap_id = ?
      ORDER BY n.level ASC, n.order_index ASC
    `).all(roadmapId) as RoadmapNode[];

    const checklists = db.prepare(`
      SELECT c.*, COALESCE(cp.is_completed, 0) as is_completed
      FROM node_checklists c
      LEFT JOIN user_checklist_progress cp ON c.id = cp.checklist_id
      ORDER BY c.order_index ASC
    `).all() as Array<{ id: string; node_id: string; text: string; is_completed: number }>;

    const resources = db.prepare('SELECT * FROM node_resources').all() as Array<{
      id: string;
      node_id: string;
      title: string;
      url: string;
      type: string;
      author: string | null;
    }>;

    return nodes.map(node => ({
      ...node,
      checklists: checklists
        .filter(c => c.node_id === node.id)
        .map(c => ({ id: c.id, text: c.text, is_completed: Boolean(c.is_completed) })),
      resources: resources
        .filter(r => r.node_id === node.id)
        .map(r => ({ id: r.id, title: r.title, url: r.url, type: r.type, author: r.author })),
      quizzes: nodeQuizzes[node.id] || []
    }));
  }

  setNodeStatus(nodeId: string, status: string): void {
    db.prepare(`
      INSERT INTO user_node_progress (node_id, status, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(node_id) DO UPDATE SET
        status = excluded.status,
        updated_at = CURRENT_TIMESTAMP
    `).run(nodeId, status);
  }

  toggleChecklist(checklistId: string, isCompleted: boolean): void {
    db.prepare(`
      INSERT INTO user_checklist_progress (checklist_id, is_completed, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(checklist_id) DO UPDATE SET
        is_completed = excluded.is_completed,
        updated_at = CURRENT_TIMESTAMP
    `).run(checklistId, isCompleted ? 1 : 0);
  }

  getCommunityRoadmaps(): CommunityRoadmap[] {
    return db.prepare('SELECT * FROM community_roadmaps ORDER BY upvotes DESC, created_at DESC').all() as CommunityRoadmap[];
  }

  createCommunityRoadmap(roadmap: {
    id: string;
    slug: string;
    title: string;
    creator_name: string;
    description: string;
    category: string;
    nodes_json: string;
  }): void {
    db.prepare(`
      INSERT INTO community_roadmaps (id, slug, title, creator_name, description, category, nodes_json, upvotes)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).run(
      roadmap.id,
      roadmap.slug,
      roadmap.title,
      roadmap.creator_name,
      roadmap.description,
      roadmap.category,
      roadmap.nodes_json
    );
  }

  upvoteCommunityRoadmap(id: string): void {
    db.prepare('UPDATE community_roadmaps SET upvotes = upvotes + 1 WHERE id = ?').run(id);
  }
}
