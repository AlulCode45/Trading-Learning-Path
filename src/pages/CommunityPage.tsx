import React, { useState, useEffect } from 'react';
import { CommunityRoadmap } from '../types';
import { CommunityView } from '../components/CommunityView';
import { CreateRoadmapModal } from '../components/CreateRoadmapModal';

export const CommunityPage: React.FC = () => {
  const [communityRoadmaps, setCommunityRoadmaps] = useState<CommunityRoadmap[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchCommunity = async () => {
    try {
      const res = await fetch('/api/community');
      const json = await res.json();
      if (json.success) setCommunityRoadmaps(json.data);
    } catch (err) {
      console.error('Failed to load community roadmaps', err);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const handleUpvote = async (id: string) => {
    try {
      const res = await fetch(`/api/community/${id}/upvote`, { method: 'POST' });
      if (res.ok) fetchCommunity();
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  };

  return (
    <>
      <CommunityView
        roadmaps={communityRoadmaps}
        onUpvote={handleUpvote}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      <CreateRoadmapModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() => {
          fetchCommunity();
        }}
      />
    </>
  );
};
