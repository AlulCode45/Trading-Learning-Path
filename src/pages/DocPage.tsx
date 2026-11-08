import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RoadmapNode } from '../types';
import { DocReader } from '../components/DocReader';
import { getRoadmapSlugForArticle } from '../data/curriculumMeta';

export const DocPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const currentArticleSlug = slug || 'what-is-trading-fundamentals';

  const [nodes, setNodes] = useState<RoadmapNode[]>([]);
  const currentRoadmapSlug = useMemo(() => getRoadmapSlugForArticle(currentArticleSlug), [currentArticleSlug]);

  useEffect(() => {
    fetch(`/api/roadmaps/${currentRoadmapSlug}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setNodes(json.data.nodes);
      })
      .catch(err => console.error('Failed to load nodes for doc progress', err));
  }, [currentRoadmapSlug]);

  const handleUpdateNodeStatus = async (nodeId: string, status: RoadmapNode['status']) => {
    try {
      await fetch(`/api/nodes/${nodeId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      // refresh nodes
      const res = await fetch(`/api/roadmaps/${currentRoadmapSlug}`);
      const json = await res.json();
      if (json.success) setNodes(json.data.nodes);
    } catch (err) {
      console.error('Failed to update node status', err);
    }
  };

  const nodeStatusMap = useMemo(() => {
    const map: Record<string, RoadmapNode['status']> = {};
    nodes.forEach(n => { map[n.id] = n.status; });
    return map;
  }, [nodes]);

  return (
    <DocReader
      articleSlug={currentArticleSlug}
      allNodes={nodes}
      onSelectArticle={(newSlug) => navigate(`/docs/${newSlug}`)}
      onReturnToRoadmap={() => navigate(`/roadmaps/${currentRoadmapSlug}`)}
      onUpdateNodeStatus={handleUpdateNodeStatus}
      nodeStatus={nodeStatusMap}
    />
  );
};
