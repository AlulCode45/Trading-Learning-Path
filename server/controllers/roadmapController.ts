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
        nodes: JSON.parse(c.nodes_json || '[]')
      }));
      res.json({ success: true, data: community });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  createCommunityRoadmap = (req: Request, res: Response) => {
    try {
      const { title, creator_name, description, category, nodes } = req.body;
      const result = this.service.createCommunityRoadmap({
        title,
        creator_name,
        description,
        category,
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
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
