import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Roadmap, RoadmapNode } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Smartphone, 
  Monitor, 
  Search, 
  Navigation,
  ArrowRight,
  BookOpen,
  Info,
  GitBranch
} from 'lucide-react';
import { RoadmapGraphStudioModal } from './roadmap-builder/RoadmapGraphStudioModal';
import {
  RoadmapEdgeConnection,
  RoadmapStageBoxConfig,
  PortPosition,
  EdgeLineStyle,
  EdgeCurveType,
  getPortCoordinates,
  buildEdgeSvgPath,
  buildArrowPolygonPoints
} from '../types/roadmapStudioTypes';

interface RoadmapCanvasProps {
  roadmap: Roadmap;
  nodes: RoadmapNode[];
  onSelectNode: (node: RoadmapNode) => void;
  selectedNodeId: string | null;
}

interface PositionedNode extends RoadmapNode {
  posX: number;
  posY: number;
  width: number;
  height: number;
}

interface StageGroupBox {
  level: number;
  title: string;
  subtitle: string;
  tag: string;
  x: number;
  y: number;
  width: number;
  height: number;
  badgeBg: string;
  badgeText: string;
}

// Visual theme configurations inspired by roadmap.sh neo-brutalist color system
interface NodeTheme {
  name: string;
  colorHex: string;
  badgeName: string;
  bgClass: string;
  selectedBgClass: string;
  borderClass: string;
  shadowClass: string;
  tagClass: string;
  arrowColor: string;
}

const ROADMAP_THEMES: Record<number, NodeTheme> = {
  1: {
    name: 'Fondasi Utama',
    badgeName: 'Core Prerequisite',
    colorHex: '#FACC15', // Signature roadmap.sh Yellow
    bgClass: 'bg-[#FEF08A] hover:bg-[#FDE047] text-zinc-950',
    selectedBgClass: 'bg-[#FACC15] ring-4 ring-black/20 dark:ring-white/30',
    borderClass: 'border-2 border-black dark:border-black',
    shadowClass: 'shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FACC15]',
    tagClass: 'bg-black text-[#FEF08A] font-mono',
    arrowColor: '#CA8A04'
  },
  2: {
    name: 'Struktur Pasar',
    badgeName: 'Structure Analysis',
    colorHex: '#38BDF8', // Sky Blue
    bgClass: 'bg-[#BAE6FD] hover:bg-[#7DD3FC] text-zinc-950',
    selectedBgClass: 'bg-[#38BDF8] ring-4 ring-black/20 dark:ring-white/30',
    borderClass: 'border-2 border-black dark:border-black',
    shadowClass: 'shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#38BDF8]',
    tagClass: 'bg-black text-[#BAE6FD] font-mono',
    arrowColor: '#0284C7'
  },
  3: {
    name: 'Zona Nilai & FVG',
    badgeName: 'Institutional Value',
    colorHex: '#C084FC', // Purple / Violet
    bgClass: 'bg-[#E9D5FF] hover:bg-[#D8B4FE] text-zinc-950',
    selectedBgClass: 'bg-[#C084FC] ring-4 ring-black/20 dark:ring-white/30',
    borderClass: 'border-2 border-black dark:border-black',
    shadowClass: 'shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#C084FC]',
    tagClass: 'bg-black text-[#E9D5FF] font-mono',
    arrowColor: '#9333EA'
  },
  4: {
    name: 'Likuiditas & Sweeps',
    badgeName: 'Liquidity Mapping',
    colorHex: '#4ADE80', // Mint / Green
    bgClass: 'bg-[#BBF7D0] hover:bg-[#86EFAC] text-zinc-950',
    selectedBgClass: 'bg-[#4ADE80] ring-4 ring-black/20 dark:ring-white/30',
    borderClass: 'border-2 border-black dark:border-black',
    shadowClass: 'shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#4ADE80]',
    tagClass: 'bg-black text-[#BBF7D0] font-mono',
    arrowColor: '#16A34A'
  },
  5: {
    name: 'Eksekusi & Risiko',
    badgeName: 'Execution Protocol',
    colorHex: '#FB7185', // Rose / Coral
    bgClass: 'bg-[#FECDD3] hover:bg-[#FDA4AF] text-zinc-950',
    selectedBgClass: 'bg-[#FB7185] ring-4 ring-black/20 dark:ring-white/30',
    borderClass: 'border-2 border-black dark:border-black',
    shadowClass: 'shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FB7185]',
    tagClass: 'bg-black text-[#FECDD3] font-mono',
    arrowColor: '#E11D48'
  }
};

const getNodeTheme = (lvl: number): NodeTheme => {
  return ROADMAP_THEMES[lvl] || ROADMAP_THEMES[((lvl - 1) % 5) + 1] || ROADMAP_THEMES[1];
};

// Canvas geometry: roadmap.sh flowchart proportions
const CANVAS_WIDTH = 1000;
const NODE_WIDTH = 250;
const NODE_HEIGHT = 104;

// Lane X coordinates
const LANE_LEFT_X = 140;
const LANE_CENTER_X = 375;
const LANE_RIGHT_X = 610;

// Signature roadmap.sh Group Enclosure Containers by Roadmap Slug
const ROADMAP_STAGE_BOXES: Record<string, StageGroupBox[]> = {
  'price-action-market-structure': [
    { level: 1, title: '1. FONDASI LELANG & ANATOMI HARGA', subtitle: 'Anatomi candlestick, order flow lelang pembeli vs penjual, dan fraktalitas MTF', tag: 'Prasyarat Wajib', x: 40, y: 35, width: 920, height: 340, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'FASE 1' },
    { level: 2, title: '2. STRUKTUR PASAR & KONFIRMASI TREN', subtitle: 'Pemetaan swing highs/lows mekanis, validasi BOS vs CHoCH, dan order flow', tag: 'Arsitektur Tren', x: 40, y: 420, width: 920, height: 410, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'FASE 2' },
    { level: 3, title: '3. ZONA NILAI INSTITUSI & IMBALANCE', subtitle: 'Fair Value Gaps (FVG), mitigasi Supply & Demand, serta diskon equilibrium 50%', tag: 'Area Nilai', x: 40, y: 875, width: 920, height: 230, badgeBg: 'bg-black text-[#C084FC] dark:bg-white dark:text-black', badgeText: 'FASE 3' },
    { level: 4, title: '4. KOLAM LIKUIDITAS & JEBAKAN PASAR', subtitle: 'Pemetaan Buy-side & Sell-side Liquidity, Equal Highs, dan Liquidity Sweeps', tag: 'Smart Money Pool', x: 40, y: 1145, width: 920, height: 230, badgeBg: 'bg-black text-[#4ADE80] dark:bg-white dark:text-black', badgeText: 'FASE 4' },
    { level: 5, title: '5. PROTOKOL EKSEKUSI & MANAJEMEN RISIKO', subtitle: 'Trigger konfirmasi LTF, aturan risiko 1% modal, dan audit jurnal trading', tag: 'Final Capstone', x: 40, y: 1415, width: 920, height: 425, badgeBg: 'bg-black text-[#FB7185] dark:bg-white dark:text-black', badgeText: 'FASE 5' }
  ],
  'smart-money-concepts-ict': [
    { level: 1, title: '1. LIKUIDITAS INSTITUSI & INEFFICIENCY', subtitle: 'Inducement (IDM), Fair Value Gap (FVG), dan Balanced Price Range', tag: 'Arsitektur IPDA', x: 40, y: 35, width: 920, height: 340, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'FASE 1' },
    { level: 2, title: '2. ORDER BLOCKS & MITIGASI LANJUTAN', subtitle: 'Mean Threshold, Breaker Blocks, dan Volume Imbalance Voids', tag: 'Footprint Bank', x: 40, y: 420, width: 920, height: 410, badgeBg: 'bg-black text-[#C084FC] dark:bg-white dark:text-black', badgeText: 'FASE 2' },
    { level: 3, title: '3. WAKTU & HARGA: INTERBANK KILLZONES', subtitle: 'Asian Range Judas Swing, London/NY Killzones, dan Siklus AMD Harian', tag: 'Time & Price', x: 40, y: 875, width: 920, height: 410, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'FASE 3' },
    { level: 4, title: '4. SMT DIVERGENCE & PD ARRAY MATRIX', subtitle: 'Korelasi intermarket DXY vs Pasangan Mata Uang dan Dealing Ranges', tag: 'Konfirmasi Tingkat Tinggi', x: 40, y: 1330, width: 920, height: 230, badgeBg: 'bg-black text-[#4ADE80] dark:bg-white dark:text-black', badgeText: 'FASE 4' },
    { level: 5, title: '5. MODEL EKSEKUSI SILVER BULLET', subtitle: 'ICT Silver Bullet 60-menit, aturan Scale-Out, dan Invalidasi Institusi', tag: 'Protokol Eksekusi', x: 40, y: 1600, width: 920, height: 230, badgeBg: 'bg-black text-[#FB7185] dark:bg-white dark:text-black', badgeText: 'FASE 5' }
  ],
  'wyckoff-method-vsa': [
    { level: 1, title: '1. TIGA HUKUM FUNDAMENTAL & VSA', subtitle: 'Supply/Demand, Cause/Effect, Effort vs Result, dan Anatomi Volume Spread', tag: 'Hukum Abadi', x: 40, y: 35, width: 920, height: 340, badgeBg: 'bg-black text-[#C084FC] dark:bg-white dark:text-black', badgeText: 'FASE 1' },
    { level: 2, title: '2. SKEMATIK AKUMULASI (FASE A - E)', subtitle: 'Selling Climax, Automatic Rally, Spring Fase C, dan LPS Markup', tag: 'Akumulasi Institusi', x: 40, y: 420, width: 920, height: 410, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'FASE 2' },
    { level: 3, title: '3. SKEMATIK DISTRIBUSI & UTAD', subtitle: 'Buying Climax, Upthrust After Distribution (UTAD), dan Markdown', tag: 'Distribusi Institusi', x: 40, y: 875, width: 920, height: 230, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'FASE 3' },
    { level: 4, title: '4. PROYEKSI P&F & REAKUMULASI', subtitle: 'Hitungan Horisontal Point & Figure dan Struktur Reakumulasi Tren', tag: 'Kalkulasi Sebab-Akibat', x: 40, y: 1145, width: 920, height: 230, badgeBg: 'bg-black text-[#4ADE80] dark:bg-white dark:text-black', badgeText: 'FASE 4' },
    { level: 5, title: '5. PROTOKOL EKSEKUSI CREEK & TESTS', subtitle: 'Jump Across the Creek (JAC), BUEC, dan Ujian No Demand / No Supply', tag: 'Setup Klasik', x: 40, y: 1415, width: 920, height: 230, badgeBg: 'bg-black text-[#FB7185] dark:bg-white dark:text-black', badgeText: 'FASE 5' }
  ],
  'risk-management-psychology': [
    { level: 1, title: '1. MATEMATIKA BERTAHAN HIDUP MODAL', subtitle: 'Risk of Ruin, Drawdown Geometris, dan Model Fixed Fractional Sizing', tag: 'Survival Math', x: 40, y: 35, width: 920, height: 340, badgeBg: 'bg-black text-[#FB7185] dark:bg-white dark:text-black', badgeText: 'FASE 1' },
    { level: 2, title: '2. EKSPEKTANSI POSITIF & ASIMETRI R:R', subtitle: 'Expected Value (EV), Edge Statistik, dan Mengapa Win Rate 40% Menang', tag: 'Probabilistic Edge', x: 40, y: 420, width: 920, height: 230, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'FASE 2' },
    { level: 3, title: '3. RISIKO PORTOFOLIO & CIRCUIT BREAKERS', subtitle: 'Korelasi Tersembunyi, Portfolio Heat Limit, dan Max Daily Drawdown Lock', tag: 'Shield Proteksi', x: 40, y: 690, width: 920, height: 230, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'FASE 3' },
    { level: 4, title: '4. NEUROBIOLOGI TILT & BIAS KOGNITIF', subtitle: 'Disposition Effect, Amygdala Hijack, dan Protokol Reset Fisiologis', tag: 'Mind Mastery', x: 40, y: 960, width: 920, height: 230, badgeBg: 'bg-black text-[#C084FC] dark:bg-white dark:text-black', badgeText: 'FASE 4' },
    { level: 5, title: '5. THINK IN BETS & TRADING PLAN SOP', subtitle: 'Pola Pikir Probabilistik Mark Douglas dan Checklist Kesiapan Harian', tag: 'Master Operator', x: 40, y: 1230, width: 920, height: 230, badgeBg: 'bg-black text-[#4ADE80] dark:bg-white dark:text-black', badgeText: 'FASE 5' }
  ],
  'quantitative-algo-trading': [
    { level: 1, title: '1. DERET WAKTU FINANSIAL & PYTHON', subtitle: 'Stasioneritas, Uji ADF, Log Returns, dan Vektorisasi NumPy/Pandas', tag: 'Fondasi Kuantitatif', x: 40, y: 35, width: 920, height: 340, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'FASE 1' },
    { level: 2, title: '2. STRATEGI MOMENTUM & MIKROSTRUKTUR', subtitle: 'Time-Series Momentum, Mean-Reversion Z-Score, dan LOB Level 2/3 OBI', tag: 'Model Alfa', x: 40, y: 420, width: 920, height: 410, badgeBg: 'bg-black text-[#C084FC] dark:bg-white dark:text-black', badgeText: 'FASE 2' },
    { level: 3, title: '3. ENGINE BACKTESTING & ELIMINASI BIAS', subtitle: 'Event-Driven Simulation, Lookahead Bias, dan Walk-Forward Monte Carlo', tag: 'Validasi Rigor', x: 40, y: 875, width: 920, height: 410, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'FASE 3' },
    { level: 4, title: '4. METRIK KINERJA & RISIKO EKOR (VaR)', subtitle: 'Sharpe/Sortino/Calmar Ratio dan Conditional Value at Risk (CVaR)', tag: 'Risk Analytics', x: 40, y: 1330, width: 920, height: 230, badgeBg: 'bg-black text-[#4ADE80] dark:bg-white dark:text-black', badgeText: 'FASE 4' },
    { level: 5, title: '5. DEPLOYMENT PINE SCRIPT & LIVE API', subtitle: 'TradingView Pine Script v5 State Machine, Webhook JSON, dan WebSocket', tag: 'Automasi Produksi', x: 40, y: 1600, width: 920, height: 425, badgeBg: 'bg-black text-[#FB7185] dark:bg-white dark:text-black', badgeText: 'FASE 5' }
  ],
  'technical-analysis-mega-profit': [
    { level: 1, title: '1. FONDASI TEKNIKAL & ANATOMI GRAFIK', subtitle: '3 Aksioma Pokok, Sejarah Dojima/Dow, Line/Bar/Candles, dan Parameter Waktu (Bab 1-4)', tag: 'Dasar Filosofis', x: 40, y: 35, width: 920, height: 380, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'BAGIAN 1' },
    { level: 2, title: '2. TREN, S/R & VALIDASI BREAKOUT', subtitle: 'Trend Klasifikasi, Skala Arith vs Log, Support-Resistance, Angka Bulat, Toleransi & False Breakout (Bab 5-10)', tag: 'Level Kunci', x: 40, y: 445, width: 920, height: 430, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'BAGIAN 2' },
    { level: 3, title: '3. GEOMETRI TRENDLINE & CHANNEL', subtitle: 'Revisi Garis Tren, Channel Lines, Tren Internal, Fan Principle, serta Uptrend & Downtrend Charts (Bab 11-16)', tag: 'Geometri Pasar', x: 40, y: 905, width: 920, height: 430, badgeBg: 'bg-black text-[#C084FC] dark:bg-white dark:text-black', badgeText: 'BAGIAN 3' },
    { level: 4, title: '4. DOW THEORY, VOLUME, GAP & PATTERNS', subtitle: 'Konfrontasi Dow, Volume Precedes Price, Multi-Timeframe, Analisis Gap, dan Chart Patterns (Bab 17-21)', tag: 'Formasi Harga', x: 40, y: 1365, width: 920, height: 430, badgeBg: 'bg-black text-[#4ADE80] dark:bg-white dark:text-black', badgeText: 'BAGIAN 4' },
    { level: 5, title: '5. ELLIOTT WAVE, FIBO & INDIKATOR LENGKAP', subtitle: 'Elliott Wave 1-5 & ABC, Fibonacci Retracement, Candlestick Lengkap, dan 4 Pilar Indikator (Bab 22-25)', tag: 'Indikator & Gelombang', x: 40, y: 1825, width: 920, height: 430, badgeBg: 'bg-black text-[#FB7185] dark:bg-white dark:text-black', badgeText: 'BAGIAN 5' },
    { level: 6, title: '6. PARADOKS, SUICIDE ANOMALY & SISTEM TRADING', subtitle: 'Random Walk, Self-Fulfilling Prophecy, The Suicide Anomaly, dan Sintesis "So What?" (Bab 26-29)', tag: 'Mega Profit Capstone', x: 40, y: 2285, width: 920, height: 430, badgeBg: 'bg-black text-[#F43F5E] dark:bg-white dark:text-black', badgeText: 'BAGIAN 6' }
  ],
  'crypto-smart-money-concept': [
    { level: 1, title: '1. FONDASI PASAR KRIPTO & SIKLUS MAKRO', subtitle: 'Karakteristik 24/7, Halving Cycle, Rotasi Likuiditas Waterfall, dan Order Flow CEX/DEX (Bab 1-4)', tag: 'Makro Kripto', x: 40, y: 35, width: 920, height: 380, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'FASE 1' },
    { level: 2, title: '2. SMART MONEY & KOLAM LIKUIDITAS', subtitle: 'Siapa Whales & MM, Akumulasi Tersembunyi, EQH, EQL, Trendline Liquidity & Sweeps (Bab 5-6)', tag: 'Whale Footprint', x: 40, y: 445, width: 920, height: 300, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'FASE 2' },
    { level: 3, title: '3. STRUKTUR PASAR & KONFIRMASI CHoCH', subtitle: 'Pemetaan Swing High/Low, Break of Structure (BOS), dan Sinyal Reversal Dini CHoCH (Bab 7-8)', tag: 'Arsitektur Tren', x: 40, y: 775, width: 920, height: 300, badgeBg: 'bg-black text-[#C084FC] dark:bg-white dark:text-black', badgeText: 'FASE 3' },
    { level: 4, title: '4. ORDER BLOCK, FVG & SOP EKSEKUSI', subtitle: 'Validasi Unmitigated OB, Fair Value Gap (FVG), Algoritma Eksekusi 4-Langkah & Portofolio 70/30 (Bab 9-12)', tag: 'Eksekusi & Survival', x: 40, y: 1105, width: 920, height: 380, badgeBg: 'bg-black text-[#10B981] dark:bg-white dark:text-black', badgeText: 'FASE 4' }
  ],
  'macroeconomic-fundamental-news': [
    { level: 1, title: '1. KALENDER MAKRO & THE BIG THREE', subtitle: 'Klasifikasi Red Folder, Pre-News Drift, NFP, Inflasi CPI, dan Keputusan Suku Bunga FOMC', tag: 'Katalis Moneter', x: 40, y: 35, width: 920, height: 340, badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black', badgeText: 'FASE 1' },
    { level: 2, title: '2. MEKANIKA DEVIASI & ANALISIS INTERMARKET', subtitle: 'Fenomena Priced-in, Surprise Factor, Korelasi DXY, Imbal Hasil US10Y, Emas, dan Bitcoin', tag: 'Dinamika Likuiditas', x: 40, y: 420, width: 920, height: 230, badgeBg: 'bg-black text-[#38BDF8] dark:bg-white dark:text-black', badgeText: 'FASE 2' },
    { level: 3, title: '3. PROTOKOL EKSEKUSI & MANAJEMEN RISIKO', subtitle: 'The 15-Minute Rule, Antisipasi Spread Widening & Slippage, serta Clean Retest FVG Entry', tag: 'Protokol Eksekusi', x: 40, y: 690, width: 920, height: 230, badgeBg: 'bg-black text-[#10B981] dark:bg-white dark:text-black', badgeText: 'FASE 3' }
  ]
};

// Comprehensive presets for all 57 nodes across all 5 official roadmaps
const POSITION_PRESETS: Record<string, { posX: number; posY: number }> = {
  // --- Roadmap: Macroeconomic & Fundamental News Trading ---
  'node-macro-1': { posX: LANE_CENTER_X, posY: 80 },
  'node-macro-2': { posX: LANE_CENTER_X, posY: 235 },
  'node-macro-3': { posX: LANE_LEFT_X,   posY: 465 },
  'node-macro-4': { posX: LANE_RIGHT_X,  posY: 465 },
  'node-macro-5': { posX: LANE_CENTER_X, posY: 735 },
  // --- Roadmap 1: Price Action & Market Structure ---
  'node-1-1': { posX: LANE_CENTER_X, posY: 80 },
  'node-1-2': { posX: LANE_CENTER_X, posY: 235 },
  'node-2-1': { posX: LANE_CENTER_X, posY: 465 },
  'node-2-2': { posX: LANE_LEFT_X,   posY: 670 },
  'node-2-3': { posX: LANE_RIGHT_X,  posY: 670 },
  'node-3-1': { posX: LANE_LEFT_X,   posY: 935 },
  'node-3-2': { posX: LANE_RIGHT_X,  posY: 935 },
  'node-4-1': { posX: LANE_LEFT_X,   posY: 1205 },
  'node-4-2': { posX: LANE_RIGHT_X,  posY: 1205 },
  'node-5-1': { posX: LANE_LEFT_X,   posY: 1475 },
  'node-5-2': { posX: LANE_RIGHT_X,  posY: 1475 },
  'node-5-3': { posX: LANE_CENTER_X, posY: 1675 },

  // --- Roadmap 2: Smart Money Concepts (SMC) & ICT ---
  'smc-1-1': { posX: LANE_CENTER_X, posY: 80 },
  'smc-1-2': { posX: LANE_CENTER_X, posY: 235 },
  'smc-2-1': { posX: LANE_CENTER_X, posY: 465 },
  'smc-2-2': { posX: LANE_LEFT_X,   posY: 670 },
  'smc-2-3': { posX: LANE_RIGHT_X,  posY: 670 },
  'smc-3-1': { posX: LANE_LEFT_X,   posY: 935 },
  'smc-3-2': { posX: LANE_RIGHT_X,  posY: 935 },
  'smc-3-3': { posX: LANE_CENTER_X, posY: 1130 },
  'smc-4-1': { posX: LANE_LEFT_X,   posY: 1390 },
  'smc-4-2': { posX: LANE_RIGHT_X,  posY: 1390 },
  'smc-5-1': { posX: LANE_LEFT_X,   posY: 1660 },
  'smc-5-2': { posX: LANE_RIGHT_X,  posY: 1660 },

  // --- Roadmap 3: Wyckoff Method & VSA ---
  'wyk-1-1': { posX: LANE_CENTER_X, posY: 80 },
  'wyk-1-2': { posX: LANE_CENTER_X, posY: 235 },
  'wyk-2-1': { posX: LANE_LEFT_X,   posY: 465 },
  'wyk-2-2': { posX: LANE_RIGHT_X,  posY: 465 },
  'wyk-2-3': { posX: LANE_CENTER_X, posY: 670 },
  'wyk-3-1': { posX: LANE_LEFT_X,   posY: 935 },
  'wyk-3-2': { posX: LANE_RIGHT_X,  posY: 935 },
  'wyk-4-1': { posX: LANE_LEFT_X,   posY: 1205 },
  'wyk-4-2': { posX: LANE_RIGHT_X,  posY: 1205 },
  'wyk-5-1': { posX: LANE_LEFT_X,   posY: 1475 },
  'wyk-5-2': { posX: LANE_RIGHT_X,  posY: 1475 },

  // --- Roadmap 4: Risk Management & Trading Psychology ---
  'risk-1-1': { posX: LANE_CENTER_X, posY: 80 },
  'risk-1-2': { posX: LANE_CENTER_X, posY: 235 },
  'risk-2-1': { posX: LANE_LEFT_X,   posY: 475 },
  'risk-2-2': { posX: LANE_RIGHT_X,  posY: 475 },
  'risk-3-1': { posX: LANE_LEFT_X,   posY: 745 },
  'risk-3-2': { posX: LANE_RIGHT_X,  posY: 745 },
  'risk-4-1': { posX: LANE_LEFT_X,   posY: 1015 },
  'risk-4-2': { posX: LANE_RIGHT_X,  posY: 1015 },
  'risk-5-1': { posX: LANE_LEFT_X,   posY: 1285 },
  'risk-5-2': { posX: LANE_RIGHT_X,  posY: 1285 },

  // --- Roadmap 5: Quantitative & Algorithmic Trading ---
  'quant-1-1': { posX: LANE_CENTER_X, posY: 80 },
  'quant-1-2': { posX: LANE_CENTER_X, posY: 235 },
  'quant-2-1': { posX: LANE_LEFT_X,   posY: 465 },
  'quant-2-2': { posX: LANE_RIGHT_X,  posY: 465 },
  'quant-2-3': { posX: LANE_CENTER_X, posY: 670 },
  'quant-3-1': { posX: LANE_LEFT_X,   posY: 935 },
  'quant-3-2': { posX: LANE_RIGHT_X,  posY: 935 },
  'quant-3-3': { posX: LANE_CENTER_X, posY: 1130 },
  'quant-4-1': { posX: LANE_LEFT_X,   posY: 1390 },
  'quant-4-2': { posX: LANE_RIGHT_X,  posY: 1390 },
  'quant-5-1': { posX: LANE_LEFT_X,   posY: 1660 },
  'quant-5-2': { posX: LANE_RIGHT_X,  posY: 1660 }
};

export const RoadmapCanvas: React.FC<RoadmapCanvasProps> = ({
  roadmap,
  nodes,
  onSelectNode,
  selectedNodeId
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'canvas' | 'linear'>('canvas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'in_progress' | 'completed'>('all');
  const [isFlowStudioOpen, setIsFlowStudioOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Local custom layout override state (persisted in localStorage per roadmap slug)
  const [customLayoutOverride, setCustomLayoutOverride] = useState<{
    nodeOverrides: Record<string, { posX: number; posY: number; title?: string; level?: number; customColor?: string; customBadge?: string }>;
    connections?: RoadmapEdgeConnection[];
    stageBoxes?: RoadmapStageBoxConfig[];
  } | null>(null);

  useEffect(() => {
    if (!roadmap?.slug) return;
    try {
      const saved = localStorage.getItem(`roadmap-flow-studio-${roadmap.slug}`);
      if (saved) {
        setCustomLayoutOverride(JSON.parse(saved));
      } else {
        setCustomLayoutOverride(null);
      }
    } catch {
      setCustomLayoutOverride(null);
    }
  }, [roadmap?.slug]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.65));
  const handleResetZoom = () => setZoom(1);

  // Dynamic stage boxes matching the selected roadmap or custom stage boxes
  const stageBoxes: StageGroupBox[] = useMemo(() => {
    const customBoxes =
      customLayoutOverride?.stageBoxes ||
      roadmap?.customStageBoxes ||
      nodes.find(n => Array.isArray(n.customStageBoxes) && n.customStageBoxes.length > 0)?.customStageBoxes;

    if (customBoxes && customBoxes.length > 0) {
      return customBoxes.map(b => ({
        level: b.level,
        title: b.title,
        subtitle: b.subtitle || '',
        tag: b.tag || `Fase ${b.level}`,
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height,
        badgeBg: 'bg-black text-[#FACC15] dark:bg-white dark:text-black',
        badgeText: `FASE ${b.level}`
      }));
    }

    if (roadmap?.slug && ROADMAP_STAGE_BOXES[roadmap.slug]) {
      return ROADMAP_STAGE_BOXES[roadmap.slug];
    }
    if (roadmap?.is_official) {
      return ROADMAP_STAGE_BOXES['price-action-market-structure'];
    }
    return [];
  }, [roadmap?.slug, roadmap?.is_official, roadmap?.customStageBoxes, nodes, customLayoutOverride]);

  // Position nodes precisely using custom overrides, saved node posX/posY, presets, or dynamic fallback
  const positionedNodes: PositionedNode[] = useMemo(() => {
    return nodes.map((node, idx) => {
      const localOverride = customLayoutOverride?.nodeOverrides?.[node.id];
      if (localOverride) {
        return {
          ...node,
          title: localOverride.title || node.title,
          level: localOverride.level || node.level,
          customColor: localOverride.customColor ?? node.customColor,
          customBadge: localOverride.customBadge ?? node.customBadge,
          posX: localOverride.posX,
          posY: localOverride.posY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        };
      }

      if (typeof node.posX === 'number' && typeof node.posY === 'number') {
        return {
          ...node,
          posX: node.posX,
          posY: node.posY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        };
      }

      if (POSITION_PRESETS[node.id]) {
        return {
          ...node,
          posX: POSITION_PRESETS[node.id].posX,
          posY: POSITION_PRESETS[node.id].posY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        };
      }

      // Dynamic fallback for custom roadmaps
      const order = node.order_index || idx + 1;
      const isLeft = order % 2 === 0;
      const posX = order === 1 ? LANE_CENTER_X : isLeft ? LANE_LEFT_X : LANE_RIGHT_X;
      const posY = 80 + (order - 1) * 155;

      return {
        ...node,
        posX,
        posY,
        width: NODE_WIDTH,
        height: NODE_HEIGHT
      };
    });
  }, [nodes, customLayoutOverride]);

  const totalCanvasHeight = useMemo(() => {
    if (positionedNodes.length === 0) return 1880;
    const maxY = Math.max(...positionedNodes.map(n => n.posY));
    const maxStageY = stageBoxes.length > 0 ? Math.max(...stageBoxes.map(b => b.y + b.height)) : 0;
    return Math.max(maxY + 200, maxStageY + 120);
  }, [positionedNodes, stageBoxes]);

  const posMap = useMemo(() => {
    const map = new Map<string, PositionedNode>();
    positionedNodes.forEach(n => map.set(n.id, n));
    return map;
  }, [positionedNodes]);

  // Clean, high-contrast flowchart connectors with directional arrows & custom studio edges
  const connections = useMemo(() => {
    const customEdges =
      customLayoutOverride?.connections ||
      roadmap?.customConnections ||
      nodes.find(n => Array.isArray(n.customConnections) && n.customConnections.length > 0)?.customConnections;

    if (customEdges && customEdges.length > 0) {
      return customEdges
        .map(edge => {
          const parent = posMap.get(edge.fromNodeId);
          const child = posMap.get(edge.toNodeId);
          if (!parent || !child) return null;

          const fromPt = getPortCoordinates(parent, edge.fromPort || 'bottom');
          const toPt = getPortCoordinates(child, edge.toPort || 'top');
          const theme = getNodeTheme(parent.level);

          return {
            id: edge.id,
            fromNodeId: edge.fromNodeId,
            toNodeId: edge.toNodeId,
            fromX: fromPt.x,
            fromY: fromPt.y,
            toX: toPt.x,
            toY: toPt.y,
            fromPort: (edge.fromPort || 'bottom') as PortPosition,
            toPort: (edge.toPort || 'top') as PortPosition,
            curveType: (edge.curveType || 'bezier') as EdgeCurveType,
            lineStyle: (edge.lineStyle || 'solid') as EdgeLineStyle,
            label: edge.label,
            isActive: parent.status === 'completed',
            isCompleted: parent.status === 'completed' && child.status === 'completed',
            color: edge.color || theme.arrowColor
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);
    }

    const list: Array<{
      id: string;
      fromNodeId: string;
      toNodeId: string;
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      fromPort: PortPosition;
      toPort: PortPosition;
      curveType: EdgeCurveType;
      lineStyle: EdgeLineStyle;
      label?: string;
      isActive: boolean;
      isCompleted: boolean;
      color: string;
    }> = [];

    positionedNodes.forEach(child => {
      if (child.parent_node_id && posMap.has(child.parent_node_id)) {
        const parent = posMap.get(child.parent_node_id)!;
        const isParentCompleted = parent.status === 'completed';
        const isChildCompleted = child.status === 'completed';
        const theme = getNodeTheme(parent.level);

        list.push({
          id: `${parent.id}->${child.id}`,
          fromNodeId: parent.id,
          toNodeId: child.id,
          fromX: parent.posX + NODE_WIDTH / 2,
          fromY: parent.posY + NODE_HEIGHT,
          toX: child.posX + NODE_WIDTH / 2,
          toY: child.posY,
          fromPort: 'bottom',
          toPort: 'top',
          curveType: 'bezier',
          lineStyle: 'solid',
          isActive: isParentCompleted,
          isCompleted: isParentCompleted && isChildCompleted,
          color: theme.arrowColor
        });
      }
    });

    // Convergence curve from node-5-2 to node-5-3
    const node52 = posMap.get('node-5-2');
    const node53 = posMap.get('node-5-3');
    if (node52 && node53) {
      list.push({
        id: 'node-5-2->node-5-3',
        fromNodeId: 'node-5-2',
        toNodeId: 'node-5-3',
        fromX: node52.posX + NODE_WIDTH / 2,
        fromY: node52.posY + NODE_HEIGHT,
        toX: node53.posX + NODE_WIDTH / 2,
        toY: node53.posY,
        fromPort: 'bottom',
        toPort: 'top',
        curveType: 'bezier',
        lineStyle: 'solid',
        isActive: node52.status === 'completed',
        isCompleted: node52.status === 'completed' && node53.status === 'completed',
        color: '#E11D48'
      });
    }

    // Branching curve from node-macro-2 to node-macro-4 (since node-macro-2 branches to both 3 and 4)
    const nodeMacro2 = posMap.get('node-macro-2');
    const nodeMacro4 = posMap.get('node-macro-4');
    if (nodeMacro2 && nodeMacro4) {
      list.push({
        id: 'node-macro-2->node-macro-4',
        fromNodeId: 'node-macro-2',
        toNodeId: 'node-macro-4',
        fromX: nodeMacro2.posX + NODE_WIDTH / 2,
        fromY: nodeMacro2.posY + NODE_HEIGHT,
        toX: nodeMacro4.posX + NODE_WIDTH / 2,
        toY: nodeMacro4.posY,
        fromPort: 'bottom',
        toPort: 'top',
        curveType: 'bezier',
        lineStyle: 'solid',
        isActive: nodeMacro2.status === 'completed',
        isCompleted: nodeMacro2.status === 'completed' && nodeMacro4.status === 'completed',
        color: '#0284C7'
      });
    }

    // Convergence curve from node-macro-4 to node-macro-5
    const nodeMacro5 = posMap.get('node-macro-5');
    if (nodeMacro4 && nodeMacro5) {
      list.push({
        id: 'node-macro-4->node-macro-5',
        fromNodeId: 'node-macro-4',
        toNodeId: 'node-macro-5',
        fromX: nodeMacro4.posX + NODE_WIDTH / 2,
        fromY: nodeMacro4.posY + NODE_HEIGHT,
        toX: nodeMacro5.posX + NODE_WIDTH / 2,
        toY: nodeMacro5.posY,
        fromPort: 'bottom',
        toPort: 'top',
        curveType: 'bezier',
        lineStyle: 'solid',
        isActive: nodeMacro4.status === 'completed',
        isCompleted: nodeMacro4.status === 'completed' && nodeMacro5.status === 'completed',
        color: '#059669'
      });
    }

    return list;
  }, [positionedNodes, posMap, customLayoutOverride, roadmap?.customConnections, nodes]);

  const filteredNodes = useMemo(() => {
    return positionedNodes.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (n.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || n.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [positionedNodes, searchTerm, statusFilter]);

  const handleJumpToActive = () => {
    const active = nodes.find(n => n.status === 'in_progress') || nodes.find(n => n.status === 'available');
    if (active) onSelectNode(active);
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors">
      {/* Roadmap.sh Navigation & Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-3.5 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#111625] gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="px-2 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold uppercase tracking-wider">
              Roadmap
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-zinc-950 dark:text-white tracking-tight">{roadmap.title}</h1>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hidden lg:inline">
              • {nodes.length} Modul Terstruktur
            </span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 max-w-2xl">{roadmap.description}</p>
        </div>

        {/* Action Buttons & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari topik..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 focus:border-black dark:focus:border-white rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-950 dark:text-white placeholder-zinc-400 outline-none w-36 sm:w-44 transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-md px-2.5 py-1.5 text-xs font-mono text-zinc-800 dark:text-zinc-200 outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="available">Tersedia</option>
            <option value="in_progress">Sedang Dipelajari</option>
            <option value="completed">Mastered ✓</option>
          </select>

          {/* Interactive Flow & Position Studio Button */}
          <button
            type="button"
            onClick={() => setIsFlowStudioOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-400 hover:bg-sky-300 text-black font-semibold border-2 border-black rounded-md text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            title="Kustomisasi Posisi Kartu & Tarik Garis Alur"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Studio Posisi &amp; Garis</span>
          </button>

          {/* Jump to Active Button */}
          <button
            onClick={handleJumpToActive}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#FACC15] hover:bg-[#EAB308] text-black font-semibold border-2 border-black rounded-md text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            title="Lompat ke Modul Aktif"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modul Aktif</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-zinc-900 p-0.5 rounded-md border border-slate-300 dark:border-zinc-700">
            <button
              onClick={() => setViewMode('canvas')}
              title="Diagram Flowchart"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'canvas' ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('linear')}
              title="Daftar Teks"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'linear' ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Controls */}
          {viewMode === 'canvas' && (
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-zinc-900 p-0.5 rounded-md border border-slate-300 dark:border-zinc-700">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 rounded transition-colors"
                title="Perkecil (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1 font-bold text-zinc-700 dark:text-zinc-300">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 rounded transition-colors"
                title="Perbesar (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 rounded transition-colors"
                title="Reset Zoom (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Signature Roadmap.sh Color Legend Bar */}
      <div className="flex flex-wrap items-center gap-4 px-6 py-2.5 bg-slate-100/90 dark:bg-[#0D121F] border-b border-slate-200 dark:border-zinc-800 text-xs font-mono select-none">
        <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[11px] flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          <span>Panduan Warna:</span>
        </span>

        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#FEF08A] border-2 border-black shadow-[1px_1px_0px_#000]"></span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">Fondasi Lelang (Core)</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#BAE6FD] border-2 border-black shadow-[1px_1px_0px_#000]"></span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">Struktur Pasar</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#E9D5FF] border-2 border-black shadow-[1px_1px_0px_#000]"></span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">Zona Nilai &amp; FVG</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#BBF7D0] border-2 border-black shadow-[1px_1px_0px_#000]"></span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">Kolam Likuiditas</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#FECDD3] border-2 border-black shadow-[1px_1px_0px_#000]"></span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">Eksekusi &amp; Risiko</span>
        </div>

        {customLayoutOverride && (
          <button
            type="button"
            onClick={() => {
              if (roadmap?.slug) {
                localStorage.removeItem(`roadmap-flow-studio-${roadmap.slug}`);
              }
              setCustomLayoutOverride(null);
            }}
            className="px-2 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-[10px] font-bold"
          >
            ↺ Reset Layout ke Default
          </button>
        )}

        <span className="ml-auto text-[11px] text-zinc-500 dark:text-zinc-400 hidden xl:inline">
          💡 Klik node kartu untuk materi atau klik &ldquo;Studio Posisi &amp; Garis&rdquo; untuk geser posisi &amp; tarik garis
        </span>
      </div>

      {/* Main Flowchart Canvas Area */}
      {viewMode === 'canvas' ? (
        <div 
          ref={containerRef}
          className="relative w-full h-[880px] overflow-auto bg-grid-tactical bg-[#F8FAFC] dark:bg-[#0B0F19] p-8 flex justify-center transition-colors"
        >
          <div
            className="relative transition-transform duration-200 origin-top"
            style={{
              width: `${CANVAS_WIDTH}px`,
              height: `${totalCanvasHeight}px`,
              transform: `scale(${zoom})`
            }}
          >
            {/* Stage Group Enclosure Containers (roadmap.sh Section Boxes) */}
            {stageBoxes.map((box, idx) => (
              <div
                key={`${box.level}-${idx}`}
                style={{
                  position: 'absolute',
                  left: `${box.x}px`,
                  top: `${box.y}px`,
                  width: `${box.width}px`,
                  height: `${box.height}px`
                }}
                className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-700/80 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-2xs pointer-events-none transition-colors"
              >
                {/* Enclosure Header Pill at Top-Left */}
                <div className="absolute -top-3.5 left-6 flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-extrabold uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${box.badgeBg}`}>
                    {box.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-slate-300 dark:border-zinc-700">
                    {box.tag}
                  </span>
                </div>
              </div>
            ))}

            {/* SVG Vector Connections (High-Contrast Bold Flowchart Lines) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ width: `${CANVAS_WIDTH}px`, height: `${totalCanvasHeight}px` }}
            >
              {connections.map(conn => {
                const pathD = buildEdgeSvgPath(
                  conn.fromX,
                  conn.fromY,
                  conn.toX,
                  conn.toY,
                  conn.fromPort || 'bottom',
                  conn.toPort || 'top',
                  conn.curveType || 'bezier'
                );
                const arrowPoints = buildArrowPolygonPoints(conn.toX, conn.toY, conn.toPort || 'top');
                const midX = (conn.fromX + conn.toX) / 2;
                const midY = (conn.fromY + conn.toY) / 2;

                return (
                  <g key={conn.id}>
                    {/* High-contrast halo background stroke */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="currentColor"
                      className="text-white dark:text-[#0B0F19]"
                      strokeWidth={7}
                      strokeLinecap="round"
                    />

                    {/* Primary High-Contrast Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={conn.color || 'currentColor'}
                      className={conn.color ? '' : 'text-zinc-900 dark:text-zinc-200'}
                      strokeWidth={2.75}
                      strokeLinecap="round"
                      strokeDasharray={
                        conn.lineStyle === 'dashed'
                          ? '8 6'
                          : conn.lineStyle === 'animated'
                          ? '6 6'
                          : undefined
                      }
                    />

                    {/* Source Node Exit Port Pin */}
                    <circle
                      cx={conn.fromX}
                      cy={conn.fromY}
                      r={4}
                      fill={conn.color || 'currentColor'}
                      className="text-zinc-900 dark:text-zinc-200"
                      stroke="#000"
                      strokeWidth={1.5}
                    />

                    {/* Midpoint Label Badge or Pulse Dot */}
                    {conn.label ? (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x={-Math.max(34, conn.label.length * 3.8)}
                          y={-10}
                          width={Math.max(68, conn.label.length * 7.6)}
                          height={20}
                          rx={5}
                          fill="#0F172A"
                          stroke="#000000"
                          strokeWidth={1.5}
                        />
                        <text
                          x={0}
                          y={3.5}
                          textAnchor="middle"
                          fill="#FACC15"
                          className="text-[10px] font-mono font-bold"
                        >
                          {conn.label}
                        </text>
                      </g>
                    ) : (
                      <circle
                        cx={midX}
                        cy={midY}
                        r={3.5}
                        fill={conn.color}
                        stroke="currentColor"
                        className="text-zinc-900 dark:text-zinc-200"
                        strokeWidth={1.5}
                      />
                    )}

                    {/* Crisp Directional Arrowhead pointing into Child Card */}
                    <polygon
                      points={arrowPoints}
                      fill={conn.color || 'currentColor'}
                      className={conn.color ? '' : 'text-zinc-900 dark:text-zinc-200'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Neo-Brutalist Node Cards (roadmap.sh Aesthetic) */}
            {filteredNodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isCompleted = node.status === 'completed';
              const isInProgress = node.status === 'in_progress';
              const theme = getNodeTheme(node.level);

              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.posX}px`,
                    top: `${node.posY}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                    ...(node.customColor ? { backgroundColor: node.customColor } : {})
                  }}
                  className={`group cursor-pointer rounded-lg p-3 transition-all duration-150 select-none flex flex-col justify-between ${theme.borderClass} ${
                    isSelected
                      ? `${node.customColor ? 'ring-4 ring-black/20 dark:ring-white/30' : theme.selectedBgClass} -translate-x-1 -translate-y-1 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#fff] z-30`
                      : `${node.customColor ? 'text-zinc-950' : theme.bgClass} ${theme.shadowClass} hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] z-20`
                  }`}
                >
                  {/* Top Metadata Row: Order Tag & Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${theme.tagClass}`}>
                      #{node.order_index} {node.customBadge || theme.name}
                    </span>

                    <div className="flex items-center space-x-1">
                      {isCompleted ? (
                        <span className="flex items-center space-x-0.5 text-[9.5px] font-mono font-extrabold bg-black text-[#4ADE80] px-1.5 py-0.2 rounded border border-black">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>DONE</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="flex items-center space-x-0.5 text-[9.5px] font-mono font-extrabold bg-black text-[#FACC15] px-1.5 py-0.2 rounded border border-black animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>AKTIF</span>
                        </span>
                      ) : (
                        <span className="text-[9.5px] font-mono text-zinc-600 font-semibold">
                          OPEN
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Main Title */}
                  <h3 className="text-xs font-bold leading-snug line-clamp-2 text-zinc-950 font-sans tracking-tight my-1">
                    {node.title}
                  </h3>

                  {/* Card Bottom Meta */}
                  <div className="pt-1.5 border-t border-black/15 flex items-center justify-between text-[10px] font-mono text-zinc-700">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-zinc-800" />
                      <span>{node.checklists?.length || 0} Verifikasi</span>
                    </span>

                    <span className="font-extrabold text-black group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5">
                      <span>Buka</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mobile-First Linear Order View (roadmap.sh Textual View) */
        <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4 w-full">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Urutan Kurikulum Linier ({filteredNodes.length} Modul)</span>
            <span className="text-[10px] font-bold text-black dark:text-white bg-[#FACC15] px-2 py-0.5 rounded border border-black">
              roadmap.sh Style
            </span>
          </div>

          {filteredNodes.map((node) => {
            const theme = getNodeTheme(node.level);
            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node)}
                className={`p-4 rounded-xl border-2 border-black transition-all cursor-pointer flex items-start space-x-4 ${theme.bgClass} ${theme.shadowClass} hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                  selectedNodeId === node.id ? 'ring-4 ring-black/20' : ''
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-black text-white flex items-center justify-center font-mono text-xs font-black">
                  {node.order_index}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold text-zinc-800 uppercase tracking-wider">
                      Fase {node.level}: {node.customBadge || theme.name}
                    </span>
                    {node.status === 'completed' && (
                      <span className="text-[10px] font-mono font-bold bg-black text-[#4ADE80] px-2 py-0.5 rounded">
                        ✓ SELESAI
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-zinc-950 mt-1">{node.title}</h3>
                  <p className="text-xs text-zinc-700 line-clamp-2 mt-1">{node.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full-Screen Visual Roadmap Flow Studio for Live Customization */}
      {isFlowStudioOpen && (
        <RoadmapGraphStudioModal
          isOpen={isFlowStudioOpen}
          roadmapTitle={roadmap.title}
          nodes={positionedNodes.map(n => ({
            id: n.id,
            title: n.title,
            duration: '2 jam',
            level: n.level || 1,
            importance: 'recommended',
            posX: n.posX,
            posY: n.posY,
            customColor: n.customColor,
            customBadge: n.customBadge
          }))}
          connections={connections.map(c => ({
            id: c.id,
            fromNodeId: c.fromNodeId,
            toNodeId: c.toNodeId,
            fromPort: c.fromPort,
            toPort: c.toPort,
            label: c.label,
            color: c.color,
            lineStyle: c.lineStyle,
            curveType: c.curveType
          }))}
          stageBoxes={stageBoxes.map((b, i) => ({
            id: `stage-${b.level}-${i}`,
            level: b.level,
            title: b.title,
            subtitle: b.subtitle,
            tag: b.tag,
            x: b.x,
            y: b.y,
            width: b.width,
            height: b.height
          }))}
          onClose={() => setIsFlowStudioOpen(false)}
          onApply={({ nodes: studioNodes, connections: studioEdges, stageBoxes: studioBoxes }) => {
            const nodeOverrides: Record<string, { posX: number; posY: number; title?: string; level?: number; customColor?: string; customBadge?: string }> = {};
            studioNodes.forEach(sn => {
              nodeOverrides[sn.id] = {
                posX: sn.posX,
                posY: sn.posY,
                title: sn.title,
                level: sn.level,
                customColor: sn.customColor,
                customBadge: sn.customBadge
              };
            });
            const payload = {
              nodeOverrides,
              connections: studioEdges,
              stageBoxes: studioBoxes
            };
            setCustomLayoutOverride(payload);
            if (roadmap?.slug) {
              try {
                localStorage.setItem(`roadmap-flow-studio-${roadmap.slug}`, JSON.stringify(payload));
              } catch {
                // ignore storage quota errors
              }
            }
          }}
        />
      )}
    </div>
  );
};
