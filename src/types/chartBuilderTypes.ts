export interface CustomCandle {
  id: string;
  index: number;         // Bar index from left to right (0, 1, 2, ...)
  open: number;          // Opening price
  high: number;          // Upper wick high
  low: number;           // Lower wick low
  close: number;         // Closing price
  color?: string;        // Optional custom color override
  label?: string;        // Optional label below candle (e.g. 'C1', 'C2', 'Sweep')
}

export interface FibonacciDrawing {
  id: string;
  startPrice: number;    // Swing 1 price
  endPrice: number;      // Swing 2 price
  startIndex: number;    // Start candle index
  endIndex: number;      // End candle index
  levels?: number[];     // Default: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.0]
  showFill?: boolean;
}

export interface BoxDrawing {
  id: string;
  startIndex: number;
  endIndex: number;
  topPrice: number;
  bottomPrice: number;
  label: string;         // 'Order Block (OB)', 'Fair Value Gap (FVG)', 'Supply Zone', 'Demand Zone'
  color: string;         // e.g. '#38BDF8', '#10B981', '#F43F5E', '#FACC15'
  opacity?: number;
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
}

export interface TextBadgeAnnotation {
  id: string;
  candleIndex: number;
  price: number;
  text: string;          // 'BOS', 'CHoCH', 'Liquidity Sweep', 'Entry', 'SL', 'TP'
  style?: 'badge' | 'arrow' | 'callout';
  color?: string;
}

export interface CustomChartConfig {
  candles: CustomCandle[];
  fibonaccis?: FibonacciDrawing[];
  boxes?: BoxDrawing[];
  trendlines?: TrendlineDrawing[];
  badges?: TextBadgeAnnotation[];
  title?: string;
  timeframe?: string;
}

export interface CandleTemplatePreset {
  id: string;
  name: string;
  category: 'Single Candle' | 'Reversal Pattern' | 'SMC Setup' | 'Multi-Candle';
  description: string;
  candles: Array<{
    open: number;
    high: number;
    low: number;
    close: number;
    label?: string;
  }>;
}
