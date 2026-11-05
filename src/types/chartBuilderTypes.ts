export interface CustomCandle {
  id: string;
  index: number;         // Bar index from left to right (0, 1, 2, ...)
  open: number;          // Opening price
  high: number;          // Upper wick high
  low: number;           // Lower wick low
  close: number;         // Closing price
  volume?: number;       // Trading volume (VSA)
  color?: string;        // Custom body color override
  wickColor?: string;    // Custom wick color override
  borderColor?: string;  // Custom border color override
  label?: string;        // Optional label below candle (e.g. 'C1', 'OB', 'Sweep')
  labelColor?: string;   // Custom label text color
}

export interface FibonacciDrawing {
  id: string;
  startPrice: number;    // Swing 1 price
  endPrice: number;      // Swing 2 price
  startIndex: number;    // Start candle index
  endIndex: number;      // End candle index
  label?: string;        // Optional label for Fib dealing range
  levels?: number[];     // Default: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.0, 1.618]
  showFill?: boolean;    // Toggle OTE Golden Zone fill
  fillColor?: string;    // OTE zone background color
  fillOpacity?: number;  // OTE zone opacity (0.05 - 0.6)
  lineColor?: string;    // Optional unified line color override
  textColor?: string;    // Optional unified text color override
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  showPrices?: boolean;  // Toggle price values next to % levels
}

export interface BoxDrawing {
  id: string;
  startIndex: number;
  endIndex: number;
  topPrice: number;
  bottomPrice: number;
  label: string;         // 'Order Block (OB)', 'Fair Value Gap (FVG)', 'Supply Zone', 'Demand Zone'
  labelPosition?: 'top-left' | 'top-right' | 'center' | 'bottom-left';
  fontSize?: number;     // Label font size (default 10)
  textColor?: string;    // Custom text color override
  textBgColor?: string;  // Optional background pill behind label text
  boxType?: 'fvg' | 'order_block' | 'supply_demand' | 'liquidity_pool';
  showMidLine?: boolean; // Consequent Encroachment (50%) or Mean Threshold (50%)
  midLineLabel?: string; // Custom label for midline (default '50% EQ')
  midLineColor?: string; // Custom midline color
  color: string;         // Background fill color
  opacity?: number;      // Background fill opacity (default 0.18)
  borderColor?: string;  // Custom border color override
  borderWidth?: number;  // Border stroke width (default 1.2)
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
}

export interface PositionDrawing {
  id: string;
  type: 'long' | 'short';
  label?: string;        // Custom setup note (e.g. 'Silver Bullet Entry')
  entryPrice: number;
  targetPrice: number;   // Take Profit
  stopPrice: number;     // Stop Loss
  startIndex: number;
  endIndex: number;
  targetColor?: string;      // Reward box color (default '#10B981')
  targetTextColor?: string;  // Reward text color
  targetOpacity?: number;    // Reward box fill opacity (default 0.22)
  stopColor?: string;        // Risk box color (default '#EF4444')
  stopTextColor?: string;    // Risk text color
  stopOpacity?: number;      // Risk box fill opacity (default 0.22)
  entryLineColor?: string;   // Center entry line color
  badgeBgColor?: string;     // R:R badge background color
  badgeTextColor?: string;   // R:R badge text color
}

export interface TrendlineDrawing {
  id: string;
  x1Index: number;
  y1Price: number;
  x2Index: number;
  y2Price: number;
  color: string;
  strokeWidth?: number;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  isRay?: boolean;
  label?: string;        // 'BOS', 'CHoCH', 'Trendline', 'EQH'
  labelAlignment?: 'start' | 'center' | 'end';
  fontSize?: number;
  textColor?: string;
  textBgColor?: string;
  showTextBg?: boolean;
  showArrow?: boolean;
  showDots?: boolean;
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
  style?: 'badge' | 'pill' | 'outline' | 'transparent' | 'callout';
  color?: string;        // Background color (legacy alias for bgColor)
  bgColor?: string;      // Background color
  bgOpacity?: number;    // Background opacity (0 - 1)
  textColor?: string;    // Text font color
  borderColor?: string;  // Border stroke color
  borderWidth?: number;  // Border stroke width
  fontSize?: number;     // Text size in px (default 9.5)
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
  candleSpacing?: 'compact' | 'normal' | 'wide';
  isDarkMode?: boolean;
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
