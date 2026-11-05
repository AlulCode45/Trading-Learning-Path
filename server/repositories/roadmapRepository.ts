import { db } from '../db/database.ts';
import { allQuizzesData } from '../db/seeds/index.ts';

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
  created_at: string;
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
  status?: string;
  checklists?: Array<{ id: string; text: string; is_completed: boolean }>;
  resources?: Array<{ id: string; title: string; url: string; type: string; author: string | null }>;
  quizzes?: QuizQuestion[];
}

export interface CommunityRoadmap {
  id: string;
  slug: string;
  title: string;
  creator_name: string;
  description: string;
  category: string;
  nodes_json: string;
  upvotes: number;
  created_at: string;
}

export class RoadmapRepository {
  getAllRoadmaps(): Roadmap[] {
    return db.prepare('SELECT * FROM roadmaps ORDER BY is_official DESC, created_at ASC').all() as Roadmap[];
  }

  getRoadmapBySlug(slug: string): Roadmap | undefined {
    return db.prepare('SELECT * FROM roadmaps WHERE slug = ?').get(slug) as Roadmap | undefined;
  }

  getNodesForRoadmap(roadmapId: string): RoadmapNode[] {
    const nodes = db.prepare(`
      SELECT n.*, COALESCE(p.status, 'locked') as status
      FROM roadmap_nodes n
      LEFT JOIN user_node_progress p ON n.id = p.node_id
      WHERE n.roadmap_id = ?
      ORDER BY n.level ASC, n.order_index ASC
    `).all(roadmapId) as RoadmapNode[];

    const checklists = db.prepare(`
      SELECT c.*, COALESCE(cp.is_completed, 0) as is_completed
      FROM node_checklists c
      LEFT JOIN user_checklist_progress cp ON c.id = cp.checklist_id
      ORDER BY c.order_index ASC
    `).all() as Array<{ id: string; node_id: string; text: string; is_completed: number }>;

    const resources = db.prepare('SELECT * FROM node_resources').all() as Array<{
      id: string;
      node_id: string;
      title: string;
      url: string;
      type: string;
      author: string | null;
    }>;

    return nodes.map(node => ({
      ...node,
      checklists: checklists
        .filter(c => c.node_id === node.id)
        .map(c => ({ id: c.id, text: c.text, is_completed: Boolean(c.is_completed) })),
      resources: resources
        .filter(r => r.node_id === node.id)
        .map(r => ({ id: r.id, title: r.title, url: r.url, type: r.type, author: r.author })),
      quizzes: allQuizzesData[node.id] || []
    }));
  }

  setNodeStatus(nodeId: string, status: string): void {
    db.prepare(`
      INSERT INTO user_node_progress (node_id, status, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(node_id) DO UPDATE SET status = excluded.status, updated_at = CURRENT_TIMESTAMP
    `).run(nodeId, status);
  }

  toggleChecklist(checklistId: string, isCompleted: boolean): void {
    db.prepare(`
      INSERT INTO user_checklist_progress (checklist_id, is_completed, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(checklist_id) DO UPDATE SET is_completed = excluded.is_completed, updated_at = CURRENT_TIMESTAMP
    `).run(checklistId, isCompleted ? 1 : 0);
  }

  getCommunityRoadmaps(): CommunityRoadmap[] {
    return db.prepare('SELECT * FROM community_roadmaps ORDER BY upvotes DESC, created_at DESC').all() as CommunityRoadmap[];
  }

  getCommunityRoadmapBySlug(slug: string): CommunityRoadmap | undefined {
    return db.prepare('SELECT * FROM community_roadmaps WHERE slug = ?').get(slug) as CommunityRoadmap | undefined;
  }

  getCommunityRoadmapById(id: string): CommunityRoadmap | undefined {
    return db.prepare('SELECT * FROM community_roadmaps WHERE id = ?').get(id) as CommunityRoadmap | undefined;
  }

  createCommunityRoadmap(roadmap: {
    id: string;
    slug: string;
    title: string;
    creator_name: string;
    description: string;
    category: string;
    nodes_json: string;
    forked_from_id?: string;
  }): void {
    db.prepare(`
      INSERT INTO community_roadmaps (id, slug, title, creator_name, description, category, nodes_json, upvotes, forked_from_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
    `).run(
      roadmap.id,
      roadmap.slug,
      roadmap.title,
      roadmap.creator_name,
      roadmap.description,
      roadmap.category,
      roadmap.nodes_json,
      roadmap.forked_from_id || null
    );
  }

  upvoteCommunityRoadmap(id: string): { upvotes: number } {
    db.prepare('UPDATE community_roadmaps SET upvotes = upvotes + 1 WHERE id = ?').run(id);
    const row = db.prepare('SELECT upvotes FROM community_roadmaps WHERE id = ?').get(id) as { upvotes: number };
    return row || { upvotes: 0 };
  }

  getCommunityArticle(slug: string) {
    return db.prepare('SELECT * FROM community_articles WHERE slug = ?').get(slug);
  }

  saveCommunityArticle(article: {
    id?: string;
    slug: string;
    title: string;
    content_markdown: string;
    illustration_mode?: string;
    illustration_payload?: string;
    author_name?: string;
    roadmap_id?: string;
    node_id?: string;
  }) {
    const id = article.id || 'art-comm-' + Date.now();
    db.prepare(`
      INSERT INTO community_articles (id, slug, roadmap_id, node_id, title, content_markdown, illustration_mode, illustration_payload, author_name, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        content_markdown = excluded.content_markdown,
        illustration_mode = excluded.illustration_mode,
        illustration_payload = excluded.illustration_payload,
        author_name = excluded.author_name,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      id,
      article.slug,
      article.roadmap_id || null,
      article.node_id || null,
      article.title,
      article.content_markdown,
      article.illustration_mode || 'preset',
      article.illustration_payload || null,
      article.author_name || 'Community Trader'
    );
    return this.getCommunityArticle(article.slug);
  }
}
