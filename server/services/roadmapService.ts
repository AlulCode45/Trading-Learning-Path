import { RoadmapRepository, Roadmap, RoadmapNode, CommunityRoadmap } from '../repositories/roadmapRepository.ts';

export class RoadmapService {
  private repo: RoadmapRepository;

  constructor() {
    this.repo = new RoadmapRepository();
  }

  getRoadmapsList(): Array<Roadmap & { completion_percentage: number; completed_nodes: number }> {
    const roadmaps = this.repo.getAllRoadmaps();
    
    return roadmaps.map(rm => {
      const nodes = this.repo.getNodesForRoadmap(rm.id);
      const totalNodes = nodes.length;
      const completedNodes = nodes.filter(n => n.status === 'completed').length;
      const completionPercentage = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

      return {
        ...rm,
        completed_nodes: completedNodes,
        completion_percentage: completionPercentage
      };
    });
  }

  getRoadmapDetails(slug: string) {
    const roadmap = this.repo.getRoadmapBySlug(slug);
    if (!roadmap) return null;

    const nodes = this.repo.getNodesForRoadmap(roadmap.id);
    const totalNodes = nodes.length;
    const completedNodes = nodes.filter(n => n.status === 'completed').length;
    const inProgressNodes = nodes.filter(n => n.status === 'in_progress').length;
    const completionPercentage = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

    return {
      roadmap,
      stats: {
        total_nodes: totalNodes,
        completed_nodes: completedNodes,
        in_progress_nodes: inProgressNodes,
        completion_percentage: completionPercentage
      },
      nodes
    };
  }

  updateNodeStatus(nodeId: string, status: 'locked' | 'available' | 'in_progress' | 'completed') {
    this.repo.setNodeStatus(nodeId, status);

    // If marked as completed, automatically unlock all immediate child nodes
    if (status === 'completed') {
      const allRoadmaps = this.repo.getAllRoadmaps();
      for (const rm of allRoadmaps) {
        const nodes = this.repo.getNodesForRoadmap(rm.id);
        const childNodes = nodes.filter(n => n.parent_node_id === nodeId);
        for (const child of childNodes) {
          if (child.status === 'locked') {
            this.repo.setNodeStatus(child.id, 'available');
          }
        }
      }
    }

    return { success: true, nodeId, status };
  }

  toggleChecklist(checklistId: string, isCompleted: boolean) {
    this.repo.toggleChecklist(checklistId, isCompleted);
    return { success: true, checklistId, isCompleted };
  }

  getCommunityRoadmaps(): CommunityRoadmap[] {
    return this.repo.getCommunityRoadmaps();
  }

  createCommunityRoadmap(data: {
    title: string;
    creator_name: string;
    description: string;
    category: string;
    nodes: Array<{ title: string; level: number; duration: string }>;
  }) {
    if (!data.title || !data.creator_name || !data.description) {
      throw new Error('Title, Creator Name, dan Description wajib diisi');
    }

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);

    const id = 'comm-' + Date.now();

    this.repo.createCommunityRoadmap({
      id,
      slug,
      title: data.title,
      creator_name: data.creator_name,
      description: data.description,
      category: data.category || 'Community Trading',
      nodes_json: JSON.stringify(data.nodes || [])
    });

    return { success: true, id, slug };
  }

  upvoteCommunityRoadmap(id: string) {
    this.repo.upvoteCommunityRoadmap(id);
    return { success: true };
  }
}
