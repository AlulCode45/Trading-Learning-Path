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
