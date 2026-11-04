import express from 'express';
import cors from 'cors';
import { initDatabase } from './db/database.ts';
import { RoadmapController } from './controllers/roadmapController.ts';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite Schema and Seed Data
initDatabase();

const controller = new RoadmapController();

// API Endpoints
app.get('/api/roadmaps', controller.getRoadmaps);
app.get('/api/roadmaps/:slug', controller.getRoadmapDetails);
app.put('/api/nodes/:nodeId/status', controller.updateNodeStatus);
app.put('/api/checklists/:checklistId/toggle', controller.toggleChecklist);

app.get('/api/community', controller.getCommunityRoadmaps);
app.post('/api/community', controller.createCommunityRoadmap);
app.post('/api/community/:id/upvote', controller.upvoteCommunityRoadmap);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`⚡ Trading Learning Path API Server is running on http://localhost:${PORT}`);
});
