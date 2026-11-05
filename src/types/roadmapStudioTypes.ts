export type PortPosition = 'top' | 'bottom' | 'left' | 'right';

export type EdgeLineStyle = 'solid' | 'dashed' | 'animated';

export type EdgeCurveType = 'bezier' | 'step' | 'straight';

export interface RoadmapEdgeConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  fromPort: PortPosition;
  toPort: PortPosition;
  label?: string;
  color?: string;
  lineStyle?: EdgeLineStyle;
  curveType?: EdgeCurveType;
}

export interface RoadmapStageBoxConfig {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  tag: string;
  x: number;
  y: number;
  width: number;
  height: number;
  colorHex?: string;
}

export interface StudioNodeItem {
  id: string;
  title: string;
  duration: string;
  level: number;
  importance: 'essential' | 'recommended' | 'optional';
  posX: number;
  posY: number;
  customColor?: string;
  customBadge?: string;
}

export const STUDIO_NODE_WIDTH = 250;
export const STUDIO_NODE_HEIGHT = 104;
export const STUDIO_CANVAS_WIDTH = 1000;

export const LANE_LEFT_X = 110;
export const LANE_CENTER_X = 375;
export const LANE_RIGHT_X = 640;

export function getPortCoordinates(
  node: { posX: number; posY: number; width?: number; height?: number },
  port: PortPosition
): { x: number; y: number } {
  const w = node.width || STUDIO_NODE_WIDTH;
  const h = node.height || STUDIO_NODE_HEIGHT;
  switch (port) {
    case 'top':
      return { x: node.posX + w / 2, y: node.posY };
    case 'bottom':
      return { x: node.posX + w / 2, y: node.posY + h };
    case 'left':
      return { x: node.posX, y: node.posY + h / 2 };
    case 'right':
      return { x: node.posX + w, y: node.posY + h / 2 };
  }
}

export function buildEdgeSvgPath(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  fromPort: PortPosition = 'bottom',
  toPort: PortPosition = 'top',
  curveType: EdgeCurveType = 'bezier'
): string {
  if (curveType === 'straight') {
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  }

  if (curveType === 'step') {
    if (fromPort === 'bottom' || fromPort === 'top') {
      const midY = (fromY + toY) / 2;
      return `M ${fromX} ${fromY} L ${fromX} ${midY} L ${toX} ${midY} L ${toX} ${toY}`;
    } else {
      const midX = (fromX + toX) / 2;
      return `M ${fromX} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${toX} ${toY}`;
    }
  }

  // Smooth Bezier with port-aware control vectors
  const dist = Math.hypot(toX - fromX, toY - fromY);
  const offset = Math.min(Math.max(dist * 0.45, 50), 180);

  const getControlPoint = (x: number, y: number, port: PortPosition, mult: number) => {
    switch (port) {
      case 'top':
        return { cx: x, cy: y - mult };
      case 'bottom':
        return { cx: x, cy: y + mult };
      case 'left':
        return { cx: x - mult, cy: y };
      case 'right':
        return { cx: x + mult, cy: y };
    }
  };

  const c1 = getControlPoint(fromX, fromY, fromPort, offset);
  const c2 = getControlPoint(toX, toY, toPort, offset);

  return `M ${fromX} ${fromY} C ${c1.cx} ${c1.cy}, ${c2.cx} ${c2.cy}, ${toX} ${toY}`;
}

export function buildArrowPolygonPoints(
  toX: number,
  toY: number,
  toPort: PortPosition = 'top'
): string {
  switch (toPort) {
    case 'top':
      return `${toX - 6},${toY - 12} ${toX + 6},${toY - 12} ${toX},${toY - 1}`;
    case 'bottom':
      return `${toX - 6},${toY + 12} ${toX + 6},${toY + 12} ${toX},${toY + 1}`;
    case 'left':
      return `${toX - 12},${toY - 6} ${toX - 12},${toY + 6} ${toX - 1},${toY}`;
    case 'right':
      return `${toX + 12},${toY - 6} ${toX + 12},${toY + 6} ${toX + 1},${toY}`;
  }
}
