import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roadmap } from '../types';
import { HomeDiscovery } from '../components/HomeDiscovery';
import { ContributorPortalModal } from '../components/ContributorPortalModal';
import { CreateRoadmapModal } from '../components/CreateRoadmapModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isContributorModalOpen, setIsContributorModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/roadmaps')
      .then(res => res.json())
      .then(json => {
        if (json.success) setRoadmaps(json.data);
      })
      .catch(err => console.error('Failed to load roadmaps', err));
  }, []);

  return (
    <>
      <HomeDiscovery
        roadmaps={roadmaps}
        onSelectRoadmap={(slug) => navigate(`/roadmaps/${slug}`)}
        onNavigateToRoadmap={() => navigate('/roadmaps/price-action-market-structure')}
        onNavigateToDocs={(slug) => navigate(`/docs/${slug}`)}
        onNavigateToPlayground={() => navigate('/playground')}
        onOpenContributorModal={() => setIsContributorModalOpen(true)}
      />

      <ContributorPortalModal
        isOpen={isContributorModalOpen}
        onClose={() => setIsContributorModalOpen(false)}
        onOpenCreateRoadmap={() => {
          setIsContributorModalOpen(false);
          setIsCreateModalOpen(true);
        }}
      />

      <CreateRoadmapModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() => navigate('/community')}
      />
    </>
  );
};
