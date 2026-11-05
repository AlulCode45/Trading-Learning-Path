import { RoadmapEdgeConnection, RoadmapStageBoxConfig } from './roadmapStudioTypes';

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
  completed_nodes?: number;
  completion_percentage?: number;
  created_at: string;
  customConnections?: RoadmapEdgeConnection[];
  customStageBoxes?: RoadmapStageBoxConfig[];
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
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  checklists: Array<{ id: string; text: string; is_completed: boolean }>;
  resources: Array<{ id: string; title: string; url: string; type: string; author: string | null }>;
  quizzes?: QuizQuestion[];
  posX?: number;
  posY?: number;
  customColor?: string;
  customBadge?: string;
  customConnections?: RoadmapEdgeConnection[];
  customStageBoxes?: RoadmapStageBoxConfig[];
}

export interface CommunityRoadmap {
  id: string;
  slug: string;
  title: string;
  creator_name: string;
  description: string;
  category: string;
  nodes: Array<{ title: string; level: number; duration: string }>;
  upvotes: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'progress' | 'streak' | 'accuracy' | 'mastery';
}

export interface UserStats {
  streakDays: number;
  totalXp: number;
  masteredNodesCount: number;
  totalNodesCount: number;
  completedQuizzesCount: number;
  hoursSpent: number;
  rankTitle: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  visualType?: string;
  illustrationMode?: 'preset' | 'interactive_chart' | 'snapshot';
  chartConfig?: {
    symbol?: string;
    title?: string;
    timeframe?: string;
    data?: any[];
    boxes?: any[];
    markers?: any[];
    keyLevels?: any[];
  };
  snapshotConfig?: {
    src?: string;
    caption?: string;
    sourceUrl?: string;
  };
  callout?: {
    type: 'note' | 'warning' | 'tip' | 'example';
    title?: string;
    text: string;
  };
  financialExample?: {
    scenario: string;
    analysis: string;
    outcome: string;
  };
}

export interface CommonMistake {
  mistake: string;
  correction: string;
}

export interface RelatedTopic {
  slug: string;
  title: string;
  category: string;
}

export interface ArticleReference {
  title: string;
  author: string;
  year?: string;
  url?: string;
}

export interface EducationalArticle {
  id: string;
  nodeId?: string;
  slug: string;
  title: string;
  category: string;
  level: number;
  readingTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  prerequisites: string[];
  tableOfContents: TableOfContentItem[];
  sections: ArticleSection[];
  commonMistakes: CommonMistake[];
  keyTakeaways: string[];
  relatedTopics: RelatedTopic[];
  references: ArticleReference[];
}

