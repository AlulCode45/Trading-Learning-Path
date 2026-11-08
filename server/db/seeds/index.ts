import { ALL_ROADMAPS_METADATA, NodeSeedData } from '../seedData.ts';
import { priceActionNodes } from './priceActionNodes.ts';
import { smcNodes } from './smcNodes.ts';
import { wyckoffNodes } from './wyckoffNodes.ts';
import { riskNodes } from './riskNodes.ts';
import { quantNodes } from './quantNodes.ts';
import { ediantoOngNodes } from './ediantoOngNodes.ts';
import { allQuizzesData } from './allQuizzes.ts';

export const ALL_SEEDED_NODES: NodeSeedData[] = [
  ...priceActionNodes,
  ...smcNodes,
  ...wyckoffNodes,
  ...riskNodes,
  ...quantNodes,
  ...ediantoOngNodes
];

export {
  ALL_ROADMAPS_METADATA,
  priceActionNodes,
  smcNodes,
  wyckoffNodes,
  riskNodes,
  quantNodes,
  ediantoOngNodes,
  allQuizzesData
};
