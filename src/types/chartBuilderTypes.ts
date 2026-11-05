export interface CustomCandle {
  id: string;
  index: number;         // Bar index from left to right (0, 1, 2, ...)
  open: number;          // Opening price
  high: number;          // Upper wick high
  low: number;           // Lower wick low
  close: number;         // Closing price
  volume?: number;       // Trading volume (VSA)
  color?: string;        // Optional custom color override
  label?: string;        // Optional label below candle (e.g. 'C1', 'OB', 'Sweep')
}

export interface FibonacciDrawing {
  id: string;
  startPrice: number;    // Swing 1 price
  endPrice: number;      // Swing 2 price
  startIndex: number;    // Start candle index
  endIndex: number;      // End candle index
  levels?: number[];     // Default: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.0, 1.618]
  showFill?: boolean;
}

export interface BoxDrawing {
  id: string;
  startIndex: number;
  endIndex: number;
  topPrice: number;
  bottomPrice: number;
  label: string;         // 'Order Block (OB)', 'Fair Value Gap (FVG)', 'Supply Zone', 'Demand Zone'
  boxType?: 'fvg' | 'order_block' | 'supply_demand' | 'liquidity_pool';
  showMidLine?: boolean; // Consequent Encroachment (50%) or Mean Threshold (50%)
  color: string;         // e.g. '#38BDF8', '#10B981', '#F43F5E', '#FACC15', '#A855F7'
  opacity?: number;
}

export interface PositionDrawing {
  id: string;
  type: 'long' | 'short';
  entryPrice: number;
  targetPrice: number;   // Take Profit
  stopPrice: number;     // Stop Loss
  startIndex: number;
  endIndex: number;
}

export interface TrendlineDrawing {
  id: string;
  x1Index: number;
  y1Price: number;
  x2Index: number;
  y2Price: number;
  color: string;
  strokeWidth?: number;
  isRay?: boolean;
  label?: string;        // 'BOS', 'CHoCH', 'Trendline'
  showArrow?: boolean;
}

export interface PolylineDrawing {
  id: string;
  points: Array<{ index: number; price: number }>;
  color: string;
  strokeWidth?: number;
  label?: string;        // e.g. '1-2-3-4-5 Wave', 'Zigzag'
}

export interface TextBadgeAnnotation {
  id: string;
  candleIndex: number;
  price: number;
  text: string;          // 'BOS', 'CHoCH', 'BSL $$$', 'SSL $$$', 'Entry', 'SL', 'TP'
  style?: 'badge' | 'arrow' | 'callout' | 'bracket';
  color?: string;
}

export interface CustomChartConfig {
  candles: CustomCandle[];
  fibonaccis?: FibonacciDrawing[];
  boxes?: BoxDrawing[];
  positions?: PositionDrawing[];
  trendlines?: TrendlineDrawing[];
  polylines?: PolylineDrawing[];
  badges?: TextBadgeAnnotation[];
  showVolume?: boolean;
  showEma?: boolean;
  emaPeriod?: number;
  title?: string;
  timeframe?: string;
}

export interface CandleTemplatePreset {
  id: string;
  name: string;
  category: 'Single Candle' | 'Reversal Pattern' | 'SMC Setup' | 'Market Scenario';
  description: string;
  candles: Array<{
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
    label?: string;
  }>;
  suggestedBoxes?: Array<{
    startIndex: number;
    endIndex: number;
    topPrice: number;
    bottomPrice: number;
    label: string;
    color: string;
    showMidLine?: boolean;
  }>;
  suggestedBadges?: Array<{
    candleIndex: number;
    price: number;
    text: string;
    color?: string;
  }>;
}
