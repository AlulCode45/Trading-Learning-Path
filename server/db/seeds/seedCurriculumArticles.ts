import fs from 'fs';
import path from 'path';
import { db } from '../database.ts';

export function seedCurriculumArticlesAndCharts() {
  const seedFile = path.resolve(import.meta.dir, 'curriculum_seed.json');
  if (!fs.existsSync(seedFile)) {
    console.warn('⚠️ curriculum_seed.json not found, skipping curriculum seed.');
    return;
  }

  const existingCount = db.prepare('SELECT COUNT(*) as count FROM curriculum_articles').get() as { count: number };
  const existingChartCount = db.prepare('SELECT COUNT(*) as count FROM chart_presets').get() as { count: number };

  if (existingCount.count >= 100 && existingChartCount.count >= 30) {
    console.log(`ℹ️ Database already initialized with ${existingCount.count} articles and ${existingChartCount.count} chart presets.`);
    return;
  }

  console.log('📦 Starting Migration: Seeding curriculum articles and chart presets into SQLite/DB...');

  const raw = fs.readFileSync(seedFile, 'utf-8');
  const { articles = [], charts = [] } = JSON.parse(raw);

  const upsertArticle = db.prepare(`
    INSERT INTO curriculum_articles (
      id, slug, roadmap_id, node_id, module_id, title, summary,
      category, level, reading_time_minutes, difficulty,
      sections_json, quiz_json, key_takeaways_json, common_mistakes_json,
      related_topics_json, references_json, is_official
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      summary = excluded.summary,
      category = excluded.category,
      level = excluded.level,
      reading_time_minutes = excluded.reading_time_minutes,
      difficulty = excluded.difficulty,
      sections_json = excluded.sections_json,
      quiz_json = excluded.quiz_json,
      key_takeaways_json = excluded.key_takeaways_json,
      common_mistakes_json = excluded.common_mistakes_json,
      related_topics_json = excluded.related_topics_json,
      references_json = excluded.references_json,
      updated_at = CURRENT_TIMESTAMP
  `);

  const upsertChart = db.prepare(`
    INSERT INTO chart_presets (
      id, slug, title, subtitle, engine_type, category, timeframe, config_json
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      subtitle = excluded.subtitle,
      engine_type = excluded.engine_type,
      category = excluded.category,
      timeframe = excluded.timeframe,
      config_json = excluded.config_json,
      updated_at = CURRENT_TIMESTAMP
  `);

  const tx = db.transaction(() => {
    for (const art of articles) {
      upsertArticle.run(
        art.id,
        art.slug,
        art.roadmap_id,
        art.node_id,
        art.module_id,
        art.title,
        art.summary || '',
        art.category || 'Trading Education',
        art.level || 1,
        art.reading_time_minutes || 10,
        art.difficulty || 'Intermediate',
        art.sections_json,
        art.quiz_json || '[]',
        art.key_takeaways_json || '[]',
        art.common_mistakes_json || '[]',
        art.related_topics_json || '[]',
        art.references_json || '[]',
        art.is_official ?? 1
      );
    }

    for (const ch of charts) {
      upsertChart.run(
        ch.id,
        ch.slug,
        ch.title,
        ch.subtitle || '',
        ch.engine_type || 'custom_builder',
        ch.category || 'General',
        ch.timeframe || 'Daily',
        ch.config_json
      );
    }
  });

  tx();

  console.log(`✅ Successfully seeded ${articles.length} curriculum articles and ${charts.length} modular chart presets into database!`);
}
