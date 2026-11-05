import path from 'path';
import fs from 'fs';
import { ALL_ROADMAPS_METADATA, ALL_SEEDED_NODES } from './seeds/index.ts';

const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'trading_learning_path.db');

let dbInstance: any;
if (typeof (globalThis as any).Bun !== 'undefined') {
  const { Database } = await import('bun:sqlite');
  dbInstance = new Database(dbPath);
  dbInstance.exec('PRAGMA journal_mode = WAL;');
  dbInstance.exec('PRAGMA foreign_keys = ON;');
} else {
  const BetterSqlite3 = (await import('better-sqlite3')).default;
  dbInstance = new BetterSqlite3(dbPath);
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.pragma('foreign_keys = ON');
}

export const db = dbInstance;

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS roadmaps (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      is_official INTEGER DEFAULT 1,
      estimated_hours INTEGER DEFAULT 40,
      nodes_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS roadmap_nodes (
      id TEXT PRIMARY KEY,
      roadmap_id TEXT NOT NULL,
      parent_node_id TEXT,
      level INTEGER NOT NULL,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      visual_type TEXT DEFAULT 'candlestick',
      coordinates_x INTEGER NOT NULL,
      coordinates_y INTEGER NOT NULL,
      order_index INTEGER NOT NULL,
      FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE,
      FOREIGN KEY (parent_node_id) REFERENCES roadmap_nodes(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS node_checklists (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL,
      text TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      FOREIGN KEY (node_id) REFERENCES roadmap_nodes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS node_resources (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      type TEXT NOT NULL,
      author TEXT,
      FOREIGN KEY (node_id) REFERENCES roadmap_nodes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_node_progress (
      node_id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'available', -- 'locked', 'available', 'in_progress', 'completed'
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (node_id) REFERENCES roadmap_nodes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_checklist_progress (
      checklist_id TEXT PRIMARY KEY,
      is_completed INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (checklist_id) REFERENCES node_checklists(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS community_roadmaps (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      creator_name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      nodes_json TEXT NOT NULL,
      upvotes INTEGER DEFAULT 0,
      forked_from_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS community_articles (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      roadmap_id TEXT,
      node_id TEXT,
      title TEXT NOT NULL,
      content_markdown TEXT NOT NULL,
      illustration_mode TEXT DEFAULT 'preset',
      illustration_payload TEXT,
      author_name TEXT DEFAULT 'Community Trader',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_roadmaps_slug ON roadmaps(slug);
    CREATE INDEX IF NOT EXISTS idx_community_roadmaps_slug ON community_roadmaps(slug);
    CREATE INDEX IF NOT EXISTS idx_community_articles_slug ON community_articles(slug);
    CREATE INDEX IF NOT EXISTS idx_roadmap_nodes_parent ON roadmap_nodes(roadmap_id, parent_node_id, order_index);
    CREATE INDEX IF NOT EXISTS idx_node_checklists_node ON node_checklists(node_id, order_index);
    CREATE INDEX IF NOT EXISTS idx_node_resources_node ON node_resources(node_id);
  `);

  try {
    db.exec('ALTER TABLE community_roadmaps ADD COLUMN forked_from_id TEXT;');
  } catch (_e) {
    // Column already exists
  }

  seedInitialData();
}

function seedInitialData() {
  // Upsert/Insert official roadmaps metadata
  const upsertRoadmap = db.prepare(`
    INSERT INTO roadmaps (id, slug, title, description, category, difficulty, is_official, estimated_hours, nodes_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      slug = excluded.slug,
      title = excluded.title,
      description = excluded.description,
      category = excluded.category,
      difficulty = excluded.difficulty,
      is_official = excluded.is_official,
      estimated_hours = excluded.estimated_hours,
      nodes_count = excluded.nodes_count
  `);

  ALL_ROADMAPS_METADATA.forEach(rm => {
    upsertRoadmap.run(
      rm.id,
      rm.slug,
      rm.title,
      rm.description,
      rm.category,
      rm.difficulty,
      rm.is_official,
      rm.estimated_hours,
      rm.nodes_count
    );
  });

  const nodeCountResult = db.prepare('SELECT COUNT(*) as count FROM roadmap_nodes').get() as { count: number };
  if (nodeCountResult.count < ALL_SEEDED_NODES.length) {
    // Reseed nodes
    db.exec(`
      DELETE FROM node_checklists;
      DELETE FROM node_resources;
      DELETE FROM roadmap_nodes;
    `);

    const insertNode = db.prepare(`
      INSERT INTO roadmap_nodes (id, roadmap_id, parent_node_id, level, title, slug, summary, content, visual_type, coordinates_x, coordinates_y, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertChecklist = db.prepare(`
      INSERT INTO node_checklists (id, node_id, text, order_index)
      VALUES (?, ?, ?, ?)
    `);

    const insertResource = db.prepare(`
      INSERT INTO node_resources (id, node_id, title, url, type, author)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertProgress = db.prepare(`
      INSERT OR IGNORE INTO user_node_progress (node_id, status)
      VALUES (?, ?)
    `);

    ALL_SEEDED_NODES.forEach((n) => {
      insertNode.run(
        n.id,
        n.roadmap_id,
        n.parent_node_id,
        n.level,
        n.title,
        n.slug,
        n.summary,
        n.content,
        n.visual_type,
        n.coordinates_x,
        n.coordinates_y,
        n.order_index
      );

      // Level 1 root nodes are available by default; deeper nodes locked
      const initialStatus = n.parent_node_id === null ? 'available' : 'locked';
      insertProgress.run(n.id, initialStatus);

      n.checklists.forEach((c, cIdx) => {
        insertChecklist.run(`chk-${n.id}-${cIdx}`, n.id, c, cIdx + 1);
      });

      n.resources.forEach((r, rIdx) => {
        insertResource.run(`res-${n.id}-${rIdx}`, n.id, r.title, r.url, r.type, r.author);
      });
    });
  }

  // Seed community roadmaps if empty
  const commExisting = db.prepare('SELECT COUNT(*) as count FROM community_roadmaps').get() as { count: number };
  if (commExisting.count === 0) {
    const insertCommunity = db.prepare(`
      INSERT INTO community_roadmaps (id, slug, title, creator_name, description, category, nodes_json, upvotes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertCommunity.run(
      'comm-gold-scalp',
      'xauusd-london-ny-scalping',
      'XAU/USD London & NY Session Scalping Path',
      'Raka Putra (FX Pro Trader)',
      'Jalur khusus scalping komoditas emas (Gold) di sesi overlap London dan New York menggunakan sweep likuiditas M1-M5 dan news filter.',
      'Scalping & Commodity',
      JSON.stringify([
        { 
          id: 'gold-1',
          title: 'Karakteristik Volatilitas Gold & Sesi Trading', 
          level: 1, 
          duration: '2 jam',
          diagram_type: 'asian_range_judas_diagram',
          content_markdown: '### Karakteristik Volatilitas Gold (XAU/USD)\nEmas bergerak sangat agresif saat sesi overlap London dan New York. Pahami waktu pembukaan sesi untuk menghindari false breakout.'
        },
        { 
          id: 'gold-2',
          title: 'Asian Range Liquidity Trap', 
          level: 2, 
          duration: '3 jam',
          diagram_type: 'liquidity_sweep',
          content_markdown: '### Asian Range Liquidity Trap\nIdentifikasi manipulasi Judas Swing yang mengambil likuiditas Asian High/Low sebelum ekspansi searah tren utama harian.'
        },
        { 
          id: 'gold-3',
          title: 'High-Impact Red Folder News Invalidation Rule', 
          level: 3, 
          duration: '2 jam',
          diagram_type: 'strong_weak_levels',
          content_markdown: '### Filter Berita Fundamental (CPI, NFP, FOMC)\nAturan strict invalidasi posisi dan perlindungan modal saat rilis data ekonomi berdampak tinggi.'
        },
        { 
          id: 'gold-4',
          title: 'M1 Order Flow & Fair Value Gap Refinement', 
          level: 4, 
          duration: '4 jam',
          diagram_type: 'fvg_bpr_diagram',
          content_markdown: '### Eksekusi Presisi M1 / M5\nRefinement entri pada ketidakseimbangan Fair Value Gap dengan konfirmasi Change of Character (CHoCH).'
        }
      ]),
      142
    );

    insertCommunity.run(
      'comm-crypto-swing',
      'crypto-market-cycles-altcoin-rotation',
      'Crypto Market Cycles & Altcoin Rotation',
      'Devin Wicaksono',
      'Peta jalan swing trading aset kripto: Bitcoin Halving cycle, BTC Dominance, ETH/BTC ratio, dan timing rotasi sektor L1/DeFi/AI.',
      'Crypto & Momentum',
      JSON.stringify([
        { 
          id: 'crypto-1',
          title: 'Siklus 4 Tahunan Bitcoin & On-Chain Metrics', 
          level: 1, 
          duration: '3 jam',
          diagram_type: 'wyckoff_accumulation_schematic',
          content_markdown: '### Siklus Halving & Akumulasi Wyckoff\nMemahami fase Re-Akumulasi institusional pada siklus 4 tahunan Bitcoin sebelum fase Mark-Up.'
        },
        { 
          id: 'crypto-2',
          title: 'Bitcoin Dominance (BTC.D) & Altseason Index', 
          level: 2, 
          duration: '2 jam',
          diagram_type: 'multi_timeframe',
          content_markdown: '### Rotasi Modal: BTC.D ➔ ETH ➔ Large Caps ➔ Mid/Low Caps\nAnalisis multi-timeframe pergeseran likuiditas antar sektor aset kripto.'
        },
        { 
          id: 'crypto-3',
          title: 'Spot Orderbook Depth & Funding Rates', 
          level: 3, 
          duration: '4 jam',
          diagram_type: 'orderbook_depth_l2',
          content_markdown: '### Microstructure Pasar Kripto\nMenganalisis dinding likuiditas orderbook level 2 dan indikator perpetual futures funding rate.'
        },
        { 
          id: 'crypto-4',
          title: 'DCA vs Structural Invalidation Swing Exit', 
          level: 4, 
          duration: '2 jam',
          diagram_type: 'risk_reward_calc',
          content_markdown: '### Manajemen Risiko & Exit Portfolio\nKombinasi Dollar Cost Averaging dengan stop loss struktural yang ketat.'
        }
      ]),
      98
    );
  }
}
