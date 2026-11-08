import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createYoga } from 'graphql-yoga';
import { initDatabase } from './db/database.ts';
import { RoadmapController } from './controllers/roadmapController.ts';
import { schema } from './graphql/schema.ts';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite Schema and Seed Data
initDatabase();

// GraphQL Yoga Endpoint
const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  landingPage: false,
});

app.use('/graphql', yoga);

const controller = new RoadmapController();

// API Endpoints
app.get('/api/roadmaps', controller.getRoadmaps);
app.get('/api/roadmaps/:slug', controller.getRoadmapDetails);
app.put('/api/nodes/:nodeId/status', controller.updateNodeStatus);
app.put('/api/checklists/:checklistId/toggle', controller.toggleChecklist);

app.get('/api/community', controller.getCommunityRoadmaps);
app.get('/api/community/roadmaps/:slug', controller.getCommunityRoadmapDetails);
app.post('/api/community', controller.createCommunityRoadmap);
app.post('/api/community/:id/fork', controller.forkCommunityRoadmap);
app.post('/api/community/:id/upvote', controller.upvoteCommunityRoadmap);

app.get('/api/community/articles', controller.getAllCommunityArticles);
app.get('/api/community/articles/:slug', controller.getCommunityArticle);
app.post('/api/community/articles', controller.saveCommunityArticle);

// Database-Driven Curriculum Articles & Modular Chart Endpoints
app.get('/api/curriculum/articles', controller.getCurriculumArticles);
app.get('/api/curriculum/articles/:slug', controller.getCurriculumArticle);

app.get('/api/charts/presets', controller.getChartPresets);
app.get('/api/charts/presets/:slug', controller.getChartPreset);
app.post('/api/charts/presets', controller.saveChartPreset);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Serve frontend static assets in production
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/graphql')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      next();
    }
  });
}

app.listen(PORT, () => {
  console.log(`⚡ Trading Learning Path API Server is running on http://localhost:${PORT}`);
});
