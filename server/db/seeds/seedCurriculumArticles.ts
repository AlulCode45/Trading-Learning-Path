import { db } from '../database.ts';
import { EDUCATIONAL_ARTICLES, getModuleIdForArticle, getRoadmapSlugForArticle } from '../../../src/data/articles/index.ts';

export function seedCurriculumArticlesAndCharts() {
  console.log('📦 Starting Migration: Seeding curriculum articles and chart presets into SQLite/DB...');

  const upsertArticle = db.prepare(`
    INSERT INTO curriculum_articles (
      id, slug, roadmap_id, node_id, module_id, title, summary,
      category, level, reading_time_minutes, difficulty,
      sections_json, quiz_json, key_takeaways_json, common_mistakes_json,
      related_topics_json, references_json, is_official
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
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

  let articleCount = 0;
  let chartCount = 0;
  const seenArticleSlugs = new Set<string>();

  for (const [key, article] of Object.entries(EDUCATIONAL_ARTICLES)) {
    if (!article || !article.slug) continue;
    if (seenArticleSlugs.has(article.slug)) continue;
    seenArticleSlugs.add(article.slug);

    const moduleId = getModuleIdForArticle(article);
    const roadmapSlug = getRoadmapSlugForArticle(article);

    // Extract any embedded customChartConfig into chart_presets table for modular reusability
    if (article.sections && Array.isArray(article.sections)) {
      article.sections.forEach((sec, sIdx) => {
        if (sec.customChartConfig && (sec.customChartConfig.candles || sec.customChartConfig.trendlines)) {
          const chartSlug = `${article.slug}-sec-${sIdx}-chart`;
          const chartId = `ch-${article.slug}-${sIdx}`;
          try {
            upsertChart.run(
              chartId,
              chartSlug,
              sec.customChartConfig.title || sec.title,
              sec.customChartConfig.subtitle || '',
              sec.illustrationMode || 'custom_builder',
              moduleId,
              sec.customChartConfig.timeframe || 'Daily',
              JSON.stringify(sec.customChartConfig)
            );
            chartCount++;
          } catch (cErr) {
            console.warn(`Could not seed chart ${chartSlug}:`, cErr);
          }
        }
      });
    }

    try {
      upsertArticle.run(
        article.id || `art-${article.slug}`,
        article.slug,
        roadmapSlug,
        article.nodeId || null,
        moduleId,
        article.title,
        article.summary || '',
        article.category || 'Trading Education',
        article.level || 1,
        article.readingTimeMinutes || 10,
        article.difficulty || 'Intermediate',
        JSON.stringify(article.sections || []),
        JSON.stringify((article as any).quiz || []),
        JSON.stringify(article.keyTakeaways || []),
        JSON.stringify(article.commonMistakes || []),
        JSON.stringify(article.relatedTopics || []),
        JSON.stringify(article.references || [])
      );
      articleCount++;
    } catch (err) {
      console.error(`Error migrating article ${article.slug}:`, err);
    }
  }

  console.log(`✅ Successfully seeded ${articleCount} curriculum articles and ${chartCount} modular chart presets into database!`);
}
