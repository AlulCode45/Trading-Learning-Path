import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RoadmapNode } from '../types';
import { DocReader } from '../components/DocReader';

export const DocPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const currentArticleSlug = slug || 'candlestick-anatomy-wick-dynamics';

  const [nodes, setNodes] = useState<RoadmapNode[]>([]);

  useEffect(() => {
    fetch('/api/roadmaps/price-action-market-structure')
      .then(res => res.json())
      .then(json => {
        if (json.success) setNodes(json.data.nodes);
      })
      .catch(err => console.error('Failed to load nodes for doc progress', err));
  }, []);

  const handleUpdateNodeStatus = async (nodeId: string, status: RoadmapNode['status']) => {
    try {
      await fetch(`/api/nodes/${nodeId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      // refresh nodes
      const res = await fetch('/api/roadmaps/price-action-market-structure');
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
      onReturnToRoadmap={() => navigate('/roadmaps/price-action-market-structure')}
      onUpdateNodeStatus={handleUpdateNodeStatus}
      nodeStatus={nodeStatusMap}
    />
  );
};
