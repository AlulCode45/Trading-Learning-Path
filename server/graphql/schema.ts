import { createSchema } from 'graphql-yoga';
import { db } from '../db/database.ts';

export const typeDefs = /* GraphQL */ `
  type Roadmap {
    id: ID!
    slug: String!
    title: String!
    description: String!
    category: String!
    difficulty: String!
    isOfficial: Boolean!
    estimatedHours: Int!
    nodesCount: Int!
    nodes: [RoadmapNode!]!
  }

  type RoadmapNode {
    id: ID!
    roadmapId: String!
    parentNodeId: String
    level: Int!
    title: String!
    slug: String!
    summary: String!
    content: String!
    visualType: String
    coordinatesX: Int!
    coordinatesY: Int!
    orderIndex: Int!
    checklists: [NodeChecklist!]!
    resources: [NodeResource!]!
    article: CurriculumArticle
  }

  type NodeChecklist {
    id: ID!
    nodeId: String!
    text: String!
    orderIndex: Int!
    isCompleted: Boolean!
  }

  type NodeResource {
    id: ID!
    nodeId: String!
    title: String!
    url: String!
    type: String!
    author: String
  }

  type ArticleSection {
    id: String!
    title: String!
    content: String!
    illustrationType: String
    illustrationConfig: String
  }

  type CurriculumArticle {
    id: ID!
    slug: String!
    roadmapId: String
    nodeId: String
    moduleId: String!
    title: String!
    summary: String
    category: String!
    level: Int!
    readingTimeMinutes: Int!
    difficulty: String!
    sectionsJson: String!
    quizJson: String
    keyTakeawaysJson: String
    commonMistakesJson: String
    relatedTopicsJson: String
    referencesJson: String
    isOfficial: Boolean!
    chartPresets: [ChartPreset!]!
    roadmap: Roadmap
  }

  type ChartPreset {
    id: ID!
    slug: String!
    title: String!
    description: String
    category: String!
    engineType: String!
    chartPayloadJson: String!
  }

  type Query {
    # Roadmaps queries
    roadmaps(category: String): [Roadmap!]!
    roadmap(slug: String!): Roadmap

    # Curriculum Articles queries
    curriculumArticles(category: String, moduleId: String): [CurriculumArticle!]!
    curriculumArticle(slug: String!): CurriculumArticle

    # Chart Presets queries
    chartPresets(category: String): [ChartPreset!]!
    chartPreset(slug: String!): ChartPreset
  }

  type Mutation {
    toggleChecklist(checklistId: ID!): NodeChecklist
    updateNodeStatus(nodeId: ID!, status: String!): Boolean
  }
`;

export const resolvers = {
  Query: {
    roadmaps: (_: any, args: { category?: string }) => {
      if (args.category) {
        return db.query('SELECT * FROM roadmaps WHERE category = ? ORDER BY title ASC').all(args.category);
      }
      return db.query('SELECT * FROM roadmaps ORDER BY title ASC').all();
    },
    roadmap: (_: any, args: { slug: string }) => {
      return db.query('SELECT * FROM roadmaps WHERE slug = ?').get(args.slug) || null;
    },
    curriculumArticles: (_: any, args: { category?: string; moduleId?: string }) => {
      let query = 'SELECT * FROM curriculum_articles';
      const conditions: string[] = [];
      const params: any[] = [];

      if (args.category) {
        conditions.push('category = ?');
        params.push(args.category);
      }
      if (args.moduleId) {
        conditions.push('module_id = ?');
        params.push(args.moduleId);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ' ORDER BY level ASC, title ASC';
      return db.query(query).all(...params);
    },
    curriculumArticle: (_: any, args: { slug: string }) => {
      return db.query('SELECT * FROM curriculum_articles WHERE slug = ?').get(args.slug) || null;
    },
    chartPresets: (_: any, args: { category?: string }) => {
      if (args.category) {
        return db.query('SELECT * FROM chart_presets WHERE category = ? ORDER BY title ASC').all(args.category);
      }
      return db.query('SELECT * FROM chart_presets ORDER BY title ASC').all();
    },
    chartPreset: (_: any, args: { slug: string }) => {
      return db.query('SELECT * FROM chart_presets WHERE slug = ?').get(args.slug) || null;
    },
  },

  Roadmap: {
    isOfficial: (r: any) => Boolean(r.is_official),
    estimatedHours: (r: any) => r.estimated_hours || 40,
    nodesCount: (r: any) => r.nodes_count || 0,
    nodes: (r: any) => {
      return db.query('SELECT * FROM roadmap_nodes WHERE roadmap_id = ? ORDER BY order_index ASC').all(r.id);
    },
  },

  RoadmapNode: {
    roadmapId: (n: any) => n.roadmap_id,
    parentNodeId: (n: any) => n.parent_node_id,
    visualType: (n: any) => n.visual_type,
    coordinatesX: (n: any) => n.coordinates_x,
    coordinatesY: (n: any) => n.coordinates_y,
    orderIndex: (n: any) => n.order_index,
    checklists: (n: any) => {
      return db.query(`
        SELECT c.*, COALESCE(p.is_completed, 0) as is_completed 
        FROM node_checklists c 
        LEFT JOIN user_checklist_progress p ON c.id = p.checklist_id 
        WHERE c.node_id = ? 
        ORDER BY c.order_index ASC
      `).all(n.id);
    },
    resources: (n: any) => {
      return db.query('SELECT * FROM node_resources WHERE node_id = ?').all(n.id);
    },
    article: (n: any) => {
      return db.query('SELECT * FROM curriculum_articles WHERE node_id = ? OR slug = ?').get(n.id, n.slug) || null;
    },
  },

  NodeChecklist: {
    nodeId: (c: any) => c.node_id,
    orderIndex: (c: any) => c.order_index,
    isCompleted: (c: any) => Boolean(c.is_completed),
  },

  NodeResource: {
    nodeId: (res: any) => res.node_id,
  },

  CurriculumArticle: {
    roadmapId: (a: any) => a.roadmap_id,
    nodeId: (a: any) => a.node_id,
    moduleId: (a: any) => a.module_id,
    readingTimeMinutes: (a: any) => a.reading_time_minutes || 10,
    sectionsJson: (a: any) => a.sections_json,
    quizJson: (a: any) => a.quiz_json,
    keyTakeawaysJson: (a: any) => a.key_takeaways_json,
    commonMistakesJson: (a: any) => a.common_mistakes_json,
    relatedTopicsJson: (a: any) => a.related_topics_json,
    referencesJson: (a: any) => a.references_json,
    isOfficial: (a: any) => Boolean(a.is_official),
    chartPresets: (a: any) => {
      // Cari preset yang berelasi dengan modul atau artikel
      return db.query('SELECT * FROM chart_presets WHERE slug LIKE ? OR category = ?').all(`%${a.slug}%`, a.category);
    },
    roadmap: (a: any) => {
      if (!a.roadmap_id) return null;
      return db.query('SELECT * FROM roadmaps WHERE id = ? OR slug = ?').get(a.roadmap_id, a.roadmap_id) || null;
    },
  },

  ChartPreset: {
    engineType: (p: any) => p.engine_type,
    chartPayloadJson: (p: any) => p.chart_payload_json,
  },

  Mutation: {
    toggleChecklist: (_: any, args: { checklistId: string }) => {
      const current = db.query('SELECT is_completed FROM user_checklist_progress WHERE checklist_id = ?').get(args.checklistId) as { is_completed: number } | null;
      const nextVal = current && current.is_completed === 1 ? 0 : 1;
      db.query(`
        INSERT INTO user_checklist_progress (checklist_id, is_completed, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(checklist_id) DO UPDATE SET is_completed = excluded.is_completed, updated_at = CURRENT_TIMESTAMP
      `).run(args.checklistId, nextVal);
      return db.query('SELECT *, ? as is_completed FROM node_checklists WHERE id = ?').get(nextVal, args.checklistId);
    },
    updateNodeStatus: (_: any, args: { nodeId: string; status: string }) => {
      db.query(`
        INSERT INTO user_node_progress (node_id, status, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(node_id) DO UPDATE SET status = excluded.status, updated_at = CURRENT_TIMESTAMP
      `).run(args.nodeId, args.status);
      return true;
    },
  },
};

export const schema = createSchema({
  typeDefs,
  resolvers,
});
