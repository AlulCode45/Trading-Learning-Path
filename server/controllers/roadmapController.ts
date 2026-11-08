import { Request, Response } from 'express';
import { RoadmapService } from '../services/roadmapService.ts';

export class RoadmapController {
  private service: RoadmapService;

  constructor() {
    this.service = new RoadmapService();
  }

  getRoadmaps = (_req: Request, res: Response) => {
    try {
      const roadmaps = this.service.getRoadmapsList();
      res.json({ success: true, data: roadmaps });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getRoadmapDetails = (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const data = this.service.getRoadmapDetails(slug);
      if (!data) {
        res.status(404).json({ success: false, message: 'Roadmap tidak ditemukan' });
        return;
      }
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  updateNodeStatus = (req: Request, res: Response) => {
    try {
      const { nodeId } = req.params;
      const { status } = req.body;

      if (!['locked', 'available', 'in_progress', 'completed'].includes(status)) {
        res.status(400).json({ success: false, message: 'Status node tidak valid' });
        return;
      }

      const result = this.service.updateNodeStatus(nodeId, status);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  toggleChecklist = (req: Request, res: Response) => {
    try {
      const { checklistId } = req.params;
      const { isCompleted } = req.body;

      const result = this.service.toggleChecklist(checklistId, Boolean(isCompleted));
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getCommunityRoadmaps = (_req: Request, res: Response) => {
    try {
      const community = this.service.getCommunityRoadmaps().map(c => ({
        ...c,
        nodes: JSON.parse((c as any).nodes_json || '[]')
      }));
      res.json({ success: true, data: community });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getCommunityRoadmapDetails = (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const data = this.service.getCommunityRoadmapBySlug(slug);
      if (!data) {
        res.status(404).json({ success: false, message: 'Roadmap komunitas tidak ditemukan' });
        return;
      }
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  forkCommunityRoadmap = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { creator_name } = req.body;
      if (!creator_name) {
        res.status(400).json({ success: false, message: 'Creator name wajib diisi' });
        return;
      }
      const result = this.service.forkRoadmap(id, creator_name);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  createCommunityRoadmap = (req: Request, res: Response) => {
    try {
      const { title, creator_name, description, category, difficulty, nodes } = req.body;
      const result = this.service.createCommunityRoadmap({
        title,
        creator_name,
        description,
        category,
        difficulty,
        nodes
      });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  upvoteCommunityRoadmap = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = this.service.upvoteCommunityRoadmap(id);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getAllCommunityArticles = (_req: Request, res: Response) => {
    try {
      const articles = this.service.getAllCommunityArticles();
      res.json({ success: true, data: articles });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getCommunityArticle = (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const article = this.service.getArticleBySlug(slug);
      if (!article) {
        res.status(404).json({ success: false, message: 'Artikel tutorial tidak ditemukan' });
        return;
      }
      res.json({ success: true, data: article });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  saveCommunityArticle = (req: Request, res: Response) => {
    try {
      const { slug, title, content_markdown, illustration_mode, illustration_payload, author_name, roadmap_id, node_id } = req.body;
      const result = this.service.saveArticle({
        slug,
        title,
        content_markdown,
        illustration_mode,
        illustration_payload: typeof illustration_payload === 'object' ? JSON.stringify(illustration_payload) : illustration_payload,
        author_name,
        roadmap_id,
        node_id
      });
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // ==========================================================================
  // CURRICULUM ARTICLES & CHART PRESETS CONTROLLER
  // ==========================================================================

  getCurriculumArticle = (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const article = this.service.getCurriculumArticle(slug);
      if (!article) {
        res.status(404).json({ success: false, message: 'Artikel kurikulum tidak ditemukan di database' });
        return;
      }
      res.json({ success: true, data: article });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getCurriculumArticles = (req: Request, res: Response) => {
    try {
      const { module } = req.query;
      const articles = module
        ? this.service.getCurriculumArticlesByModule(String(module))
        : this.service.getAllCurriculumArticles();
      res.json({ success: true, data: articles });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getChartPresets = (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const presets = this.service.getChartPresets(category ? String(category) : undefined);
      res.json({ success: true, data: presets });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getChartPreset = (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const preset = this.service.getChartPresetBySlug(slug);
      if (!preset) {
        res.status(404).json({ success: false, message: 'Preset chart tidak ditemukan' });
        return;
      }
      res.json({ success: true, data: preset });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  saveChartPreset = (req: Request, res: Response) => {
    try {
      const result = this.service.saveChartPreset(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
