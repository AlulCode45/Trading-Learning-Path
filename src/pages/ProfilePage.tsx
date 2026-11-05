import React, { useState, useEffect } from 'react';
import { RoadmapNode } from '../types';
import { ProfileView } from '../components/ProfileView';

export const ProfilePage: React.FC = () => {
  const [nodes, setNodes] = useState<RoadmapNode[]>([]);

  useEffect(() => {
    fetch('/api/roadmaps/price-action-market-structure')
      .then(res => res.json())
      .then(json => {
        if (json.success) setNodes(json.data.nodes);
      })
      .catch(err => console.error('Failed to load profile nodes', err));
  }, []);

  return <ProfileView nodes={nodes} />;
};
