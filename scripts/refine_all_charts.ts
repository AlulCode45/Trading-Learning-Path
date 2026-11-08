import fs from 'fs';
import path from 'path';
import { Database } from 'bun:sqlite';

const seedPath = path.resolve('server/db/seeds/curriculum_seed.json');
const dbPath = path.resolve('data/trading_learning_path.db');

const seedRaw = fs.readFileSync(seedPath, 'utf8');
const seedData = JSON.parse(seedRaw);

// Concise dictionary for known verbose badges
const badgeReplacements: Record<string, string> = {
  'Conviction Body > 85%': 'Body > 85%',
  'Iceberg Orders Absorbed (65% Wick)': 'Absorbed (65% Wick)',
  'Bearish Expansion Confirmed': 'Bearish Expansion',
  'BOS (Body Close Confirmed)': 'BOS Confirmed',
  'First Touch (Prime Reaction)': 'First Touch Bounce',
  'Sentuhan ke-2 (Orders Menipis)': 'Touch 2 (Thinning)',
  'Zone Broken (Liquidity Exhausted)': 'Zone Broken',
  'Impulsive Breakout (High Vol)': 'Breakout (High Vol)',
  'Wick Rejection at New Support': 'Wick Rejection',
  'Inducement: Rapi Mengundang BSL': 'Inducement',
  'LIQUIDITY SWEEP (Turtle Soup)': 'Turtle Soup Sweep',
  'Displacement Down (Close Inside)': 'Displacement Down',
  'Inducement Trap: Retail Buy Stop Bertumpuk': 'Inducement Trap',
  'SWEEP ONLY: Body Closed Inside (< $115)': 'Sweep Only (<$115)',
  'Turtle Soup Short Confirmation': 'Turtle Soup Entry',
  'Area Kosong Lelang ($108 - $122)': 'Imbalance Gap',
  '50% CE Rebalanced & Protected': '50% CE Retest',
  'Target Expansion Reached': 'Target Reached',
  'Last Bearish Candle (OB Origin)': 'OB Origin',
  'Pinpoint 50% MT Mitigation': '50% MT Retest',
  'Target High Liquidated (+32 pts)': 'Target (+32 pts)',
  'BOS: Full Body Close Di Atas $106': 'BOS (Close >$106)',
  'CHoCH: HL Terakhir $111 Dijebol': 'CHoCH (Break $111)',
  'Sell Entry pada Retest Breaker': 'Breaker Sell Entry',
  '50% EQ: $120.00 (Batas Diskon)': '50% EQ ($120)',
  'OTE Entry Fill @ 70.5% ($111.00)': 'OTE Entry ($111)',
  'Take Profit Hit (+45 pts / +4.4R)': 'TP Hit (+4.4R)',
  'Spring: Vol Mengering (No Supply)': 'Spring (No Supply)',
  'Sign of Strength (SOS Breakout)': 'SOS Breakout',
  'Last Point of Support (LPS)': 'LPS Retest',
  'Automatic Reaction (AR)': 'AR Reaction',
  'UTAD (Bull Trap Pucuk)': 'UTAD (Bull Trap)',
  'Strong Low (Pelindung Akumulasi)': 'Strong Low',
  'Wick Sweep (Bukan BOS)': 'Sweep (Not BOS)',
  'Body Close Valid > $3.400 (BOS)': 'Valid BOS (>3.4k)',
  'Liquidity Sweep Pucuk ($68.400)': 'Sweep ($68.400)',
  'Body Close Menembus Strong HL (CHoCH)': 'CHoCH Break',
  'Retest FVG Mitigasi (High-Prob Sell)': 'FVG Sell Entry',
  'Liquidity Swept di $61.600': 'Swept ($61.600)',
  'BOS: OB Terkonfirmasi Valid': 'OB Validated',
  'Mitigasi Tepat di 50% MT ($61.850)': '50% MT Retest',
  'Displacement C2: Celah FVG Terbuka': 'FVG Open',
  'Wick Mengisi 50% CE ($2.575)': '50% CE Filled',
  'Langkah 1: Sweep EQL ($63.750)': 'Step 1: Sweep',
  'Langkah 2: CHoCH Valid Body Close': 'Step 2: CHoCH',
  'Langkah 3: Limit Order Terisi ($64.150)': 'Step 3: Entry',
  'Langkah 4: TP2 Panen di $66.550 (R:R 1:6)': 'Step 4: TP Hit',
  'Rejection Hammer di Rp9.500 + Volume Surge': 'Hammer (Vol Surge)',
  'Beli Rp9.800 (Risiko Rp350)': 'Entry Rp9.800',
  'TP Hit: Rp10.500 (+Rp700)': 'TP Hit: Rp10.500',
  'Breakout Akumulasi: Vol Masif 165k': 'Breakout (165k Vol)',
  'Puncak Euforia Rp6.000: Berita Heboh di Medsos': 'Puncak Euforia',
  'Distribusi Nyata: Volume 245k Guyuran Smart Money': 'Distribusi (245k)',
  'Jarum Penolakan Terendah: $2.260 (Institutional Buying)': 'Hammer ($2.260)',
  'Entry Konfirmasi: $2.290': 'Entry ($2.290)',
  'TP Hit: $2.354 (+64 Pts)': 'TP Hit ($2.354)',
  'Jarum Menembus $116 Lalu Rontok (Bull Trap)': 'Bull Trap ($116)',
  'Jarum Anjlok ke $88 Lalu Diserap Institusi (Bear Trap)': 'Bear Trap ($88)',
  'Short Squeeze Reli: Ritel Cut Loss Terbakar': 'Short Squeeze',
  'Channel Breakout: Ledakan Euforia Vol 9.8k': 'Channel Breakout',
  'Blow-Off Top: Klimaks Beli Ritel Sebelum Runtuh': 'Blow-Off Top',
  'Touch 1: Vol Surge 115k (Order Beli Kolektif)': 'Touch 1 (115k Vol)',
  'Touch 2: Konfirmasi Konsensus Vol 128k': 'Touch 2 (128k Vol)',
  'Self-Fulfilling Prophecy Terwujud Sempurna!': 'Pantulan Sukses',
  'Beli 1: Rp1.000 (100 Lot - Modal Rp10 Jt)': 'Beli 1: Rp1.000',
  'Averaging Down 1: Rp800 (200 Lot - Tambah Rp16 Jt, Avg Rp866)': 'Avg Down 1: Rp800',
  'Averaging Down 2: Rp600 (400 Lot - Tambah Rp24 Jt, Avg Rp714)': 'Avg Down 2: Rp600',
  'Harga Rp200: Nilai Portofolio Ludes Rp36 Jt (-72%)!': 'Rugi Fatal (-72%)',
  'Skala Log: Pantulan Presisi di Atas Trendline Support': 'Pantulan Skala Log',
  'Skala Linier: Terdistorsi Tembus -> Panic Sell Palsu': 'Distorsi Linier',
  'ATH Target Rp5.000 (10x Bagger Tercapai)': 'ATH Target (10x)',
  'Funding Rate +0.08% (Greed Ekstrem)': '+0.08% Funding',
  'Stop Hunt $61.500 (Long Flushout)': 'Stop Hunt $61.500',
  'Institutional Re-Absorption': 'Re-Absorption',
  'BSL Liquidity Run Terpenuhi': 'BSL Target Hit'
};

const trendlineLabelReplacements: Record<string, string> = {
  'Market Structure Shift (MSS Breakout)': 'MSS Breakout',
  'EQL Ritel Support ($64.600)': 'EQL Support',
  'Candle 1 High Wick ($108)': 'C1 High Wick',
  'Candle 3 Low Wick ($122)': 'C3 Low Wick'
};

const boxLabelReplacements: Record<string, string> = {
  'Bullish Order Block (OB Body Range)': 'Bullish OB',
  'Fair Value Gap (BISI: Imbalance Gap)': 'Bullish FVG (BISI)',
  'Zona Likuidasi Long Ritel ($800M+ Cluster)': 'Zona Likuidasi Long',
  'Whale Limit Absorption & Buyback Zone': 'Whale Absorption Zone',
  'Area Imbalance (FVG Acceleration)': 'FVG Imbalance',
  'Order Block (OB)': 'Order Block',
  'Supply Zone (Fresh)': 'Fresh Supply',
  'Demand Zone (Fresh)': 'Fresh Demand'
};

let modifiedCharts = 0;

seedData.charts.forEach((chartObj: any) => {
  const cfg = JSON.parse(chartObj.config_json);
  let changed = false;

  // 1. Candlestick spacing to wide or ultra-wide
  if (!cfg.candleSpacing || cfg.candleSpacing === 'normal') {
    cfg.candleSpacing = 'wide';
    changed = true;
  }

  // 2. InfoCards stage alignment & indexing
  if (cfg.infoCards && cfg.infoCards.length > 0) {
    cfg.infoCards.forEach((ic: any) => {
      // Ensure all cards are set to alignX left and positioned on the stage
      if (ic.candleIndex < cfg.candles.length - 1) {
        ic.candleIndex = cfg.candles.length + 1.2;
        changed = true;
      }
      if (ic.alignX !== 'left') {
        ic.alignX = 'left';
        changed = true;
      }
    });
  }

  // 3. Badges text shortening
  if (cfg.badges && cfg.badges.length > 0) {
    cfg.badges.forEach((b: any) => {
      if (b.text) {
        const trimmed = b.text.trim();
        if (badgeReplacements[trimmed]) {
          b.text = badgeReplacements[trimmed];
          changed = true;
        } else if (trimmed.length > 22) {
          b.text = trimmed.substring(0, 20).trim();
          changed = true;
        }
      }
    });
  }

  // 4. Trendline labels
  if (cfg.trendlines && cfg.trendlines.length > 0) {
    cfg.trendlines.forEach((tl: any) => {
      if (tl.label) {
        const trimmed = tl.label.trim();
        if (trendlineLabelReplacements[trimmed]) {
          tl.label = trendlineLabelReplacements[trimmed];
          changed = true;
        }
        if (tl.y1Price === tl.y2Price && (!tl.labelAlignment || tl.labelAlignment === 'center')) {
          tl.labelAlignment = 'start';
          changed = true;
        }
      }
    });
  }

  // 5. Box labels
  if (cfg.boxes && cfg.boxes.length > 0) {
    cfg.boxes.forEach((bx: any) => {
      if (bx.label) {
        const trimmed = bx.label.trim();
        if (boxLabelReplacements[trimmed]) {
          bx.label = boxLabelReplacements[trimmed];
          changed = true;
        }
        if (bx.labelPosition === 'center') {
          bx.labelPosition = 'top-left';
          changed = true;
        }
      }
    });
  }

  if (changed) {
    chartObj.config_json = JSON.stringify(cfg, null, 2);
    modifiedCharts++;
  }
});

console.log(`Updated ${modifiedCharts} charts in seed data.`);

// Save back to curriculum_seed.json
fs.writeFileSync(seedPath, JSON.stringify(seedData, null, 2), 'utf8');
console.log('Saved updated curriculum_seed.json.');

// Now sync directly to SQLite database
const db = new Database(dbPath);
const updateStmt = db.prepare(`
  UPDATE chart_presets
  SET config_json = ?, updated_at = CURRENT_TIMESTAMP
  WHERE id = ? OR slug = ?
`);

const syncTransaction = db.transaction(() => {
  seedData.charts.forEach((c: any) => {
    updateStmt.run(c.config_json, c.id, c.slug);
  });
});

syncTransaction();
console.log('Synchronized all 38 chart configs into SQLite database: data/trading_learning_path.db');
db.close();
