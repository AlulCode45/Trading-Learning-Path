import { useState, useEffect } from 'react';
import { ArticleMeta } from '../data/curriculumMeta';

let cachedArticles: ArticleMeta[] | null = null;
let fetchPromise: Promise<ArticleMeta[]> | null = null;

export function fetchArticlesManifest(): Promise<ArticleMeta[]> {
  if (cachedArticles) {
    return Promise.resolve(cachedArticles);
  }
  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = fetch('/api/curriculum/articles')
    .then(res => res.json())
    .then(json => {
      if (json.success && Array.isArray(json.data)) {
        cachedArticles = json.data.map((r: any) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          moduleId: r.moduleId,
          level: r.level || 1,
          readingTimeMinutes: r.readingTimeMinutes || 10,
          difficulty: r.difficulty || 'Beginner',
          summary: r.summary || ''
        }));
        return cachedArticles || [];
      }
      return [];
    })
    .catch(err => {
      console.error('Failed to fetch articles manifest from DB', err);
      return [];
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export function useCurriculumManifest() {
  const [articles, setArticles] = useState<ArticleMeta[]>(cachedArticles || []);
  const [loading, setLoading] = useState<boolean>(!cachedArticles);

  useEffect(() => {
    if (cachedArticles) {
      setArticles(cachedArticles);
      setLoading(false);
      return;
    }

    let isMounted = true;
    fetchArticlesManifest().then(data => {
      if (isMounted) {
        setArticles(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { articles, loading };
}
