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
    if (!roadmap) {
      const communityRm = this.repo.getCommunityRoadmapBySlug(slug);
      if (communityRm) {
        let parsedNodes: any[] = [];
        try {
          parsedNodes = JSON.parse(communityRm.nodes_json || '[]');
        } catch {
          parsedNodes = [];
        }

        const safeNodes = parsedNodes.map((n, idx) => {
          const docSlug = n.doc_slug || n.slug || `doc-${communityRm.slug}-modul-${idx + 1}`;
          return {
            id: n.id || `node-${idx + 1}`,
            roadmap_id: communityRm.id,
            title: n.title || 'Modul',
            slug: docSlug,
            doc_slug: docSlug,
            summary: n.docConfig?.summary || n.summary || n.description || (n.content_markdown ? n.content_markdown.replace(/[#*`]/g, '').slice(0, 140) : ''),
            description: n.description || '',
            content: n.content_markdown || n.content || '',
            level: n.level || ((idx % 5) + 1),
            category: n.category || communityRm.category,
            importance: n.importance || 'recommended',
            order_index: idx + 1,
            parent_node_id: n.parent_node_id !== undefined ? n.parent_node_id : (idx > 0 ? (parsedNodes[idx - 1].id || `node-${idx}`) : null),
            estimated_hours: n.duration ? parseInt(n.duration) || 2 : 2,
            status: n.status || (idx === 0 ? 'available' : 'locked'),
            visual_type: n.diagram_type || n.visual_type || 'candlestick-anatomy',
            illustrationMode: n.illustrationMode || 'custom_builder',
            diagram_type: n.diagram_type || 'candlestick-anatomy',
            chartConfig: n.chartConfig || null,
            snapshotConfig: n.snapshotConfig || null,
            customChartConfig: n.customChartConfig || null,
            content_markdown: n.content_markdown || '',
            docConfig: n.docConfig || null,
            posX: typeof n.posX === 'number' ? n.posX : undefined,
            posY: typeof n.posY === 'number' ? n.posY : undefined,
            customColor: n.customColor || undefined,
            customBadge: n.customBadge || undefined,
            customConnections: Array.isArray(n.customConnections) ? n.customConnections : undefined,
            customStageBoxes: Array.isArray(n.customStageBoxes) ? n.customStageBoxes : undefined,
            checklists: n.docConfig?.checklists || n.checklists || [],
            resources: n.resources || [],
            quizzes: n.docConfig?.quizzes || n.quizzes || []
          };
        });

        const firstNodeWithMeta = parsedNodes.find((n: any) => Array.isArray(n.customConnections) || Array.isArray(n.customStageBoxes));

        return {
          roadmap: {
            id: communityRm.id,
            title: communityRm.title,
            slug: communityRm.slug,
            description: communityRm.description,
            category: communityRm.category,
            difficulty: 'Intermediate',
            estimated_hours: safeNodes.length * 2,
            is_official: false,
            creator_name: communityRm.creator_name,
            forked_from_id: (communityRm as any).forked_from_id,
            customConnections: firstNodeWithMeta?.customConnections || undefined,
            customStageBoxes: firstNodeWithMeta?.customStageBoxes || undefined
          },
          stats: {
            total_nodes: safeNodes.length,
            completed_nodes: 0,
            in_progress_nodes: 0,
            completion_percentage: 0
          },
          nodes: safeNodes
        };
      }
      return null;
    }

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

  getAllCommunityArticles() {
    return this.repo.getAllCommunityArticles();
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
    difficulty?: string;
    nodes: Array<any>;
  }) {
    if (!data.title || !data.creator_name || !data.description) {
      throw new Error('Title, Creator Name, dan Description wajib diisi');
    }

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);

    const id = 'comm-' + Date.now();

    const enrichedNodes = (data.nodes || []).map((n: any, idx: number) => {
      const nodeSlugPart = (n.title || `modul-${idx + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
        .slice(0, 36);
      const docSlug = n.doc_slug || `doc-${slug}-${idx + 1}-${nodeSlugPart}`;
      const nodeId = n.id || `node-${idx + 1}`;

      // Save full documentation article in community_articles table
      const payloadJson = JSON.stringify({
        roadmapId: id,
        roadmapSlug: slug,
        roadmapTitle: data.title,
        category: data.category || 'Community Trading',
        difficulty: data.difficulty || 'Intermediate',
        level: n.level || idx + 1,
        nodeId,
        orderIndex: idx + 1,
        illustrationMode: n.illustrationMode || 'custom_builder',
        customChartConfig: n.customChartConfig || null,
        snapshotConfig: n.snapshotConfig || null,
        docConfig: n.docConfig || null
      });

      this.repo.saveCommunityArticle({
        slug: docSlug,
        title: n.title || `Modul #${idx + 1}`,
        content_markdown: n.content_markdown || `### ${n.title}\nMateri dokumentasi lengkap.`,
        illustration_mode: n.illustrationMode || 'custom_builder',
        illustration_payload: payloadJson,
        author_name: data.creator_name,
        roadmap_id: id,
        node_id: nodeId
      });

      return {
        ...n,
        id: nodeId,
        slug: docSlug,
        doc_slug: docSlug
      };
    });

    this.repo.createCommunityRoadmap({
      id,
      slug,
      title: data.title,
      creator_name: data.creator_name,
      description: data.description,
      category: data.category || 'Community Trading',
      nodes_json: JSON.stringify(enrichedNodes)
    });

    return { success: true, id, slug, data: { id, slug } };
  }

  upvoteCommunityRoadmap(id: string) {
    return this.repo.upvoteCommunityRoadmap(id);
  }
}
