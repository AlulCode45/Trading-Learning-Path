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

  getCommunityRoadmapBySlug(slug: string) {
    const rm = this.repo.getCommunityRoadmapBySlug(slug);
    if (!rm) return null;
    return {
      ...rm,
      nodes: JSON.parse((rm as any).nodes_json || '[]')
    };
  }

  forkRoadmap(roadmapId: string, creatorName: string) {
    // Check if official roadmap
    const official = this.repo.getAllRoadmaps().find(r => r.id === roadmapId);
    let title = '';
    let description = '';
    let category = '';
    let nodes: any[] = [];

    if (official) {
      title = `${official.title} (Forked by ${creatorName})`;
      description = `Kustomisasi berbasis roadmap resmi ${official.title}`;
      category = official.category;
      const officialNodes = this.repo.getNodesForRoadmap(official.id);
      nodes = officialNodes.map(n => ({
        title: n.title,
        level: n.level,
        duration: '1-2 jam',
        visual_type: n.visual_type,
        summary: n.summary
      }));
    } else {
      const comm = this.repo.getCommunityRoadmapById(roadmapId);
      if (!comm) throw new Error('Roadmap yang ingin di-fork tidak ditemukan');
      title = `${comm.title} (Fork by ${creatorName})`;
      description = comm.description;
      category = comm.category;
      nodes = JSON.parse((comm as any).nodes_json || '[]');
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);

    const id = 'fork-' + Date.now();

    this.repo.createCommunityRoadmap({
      id,
      slug,
      title,
      creator_name: creatorName,
      description,
      category,
      nodes_json: JSON.stringify(nodes),
      forked_from_id: roadmapId
    });

    return { success: true, id, slug, title };
  }

  getArticleBySlug(slug: string) {
    return this.repo.getCommunityArticle(slug);
  }

  saveArticle(data: {
    slug: string;
    title: string;
    content_markdown: string;
    illustration_mode?: string;
    illustration_payload?: string;
    author_name?: string;
    roadmap_id?: string;
    node_id?: string;
  }) {
    if (!data.slug || !data.title || !data.content_markdown) {
      throw new Error('Slug, Title, dan Content Markdown wajib diisi');
    }
    return this.repo.saveCommunityArticle(data);
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
    return this.repo.upvoteCommunityRoadmap(id);
  }
}
