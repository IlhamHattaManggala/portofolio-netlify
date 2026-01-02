import { useState, useEffect } from 'react';
import { onArticleViewChange } from '../services/firebase';
import type { TArticle } from '../components/types';

export const useLiveViews = (initialArticles: TArticle[]) => {
  const [articlesWithViews, setArticlesWithViews] = useState<TArticle[]>(initialArticles);

  useEffect(() => {
    // If no articles, do nothing
    if (initialArticles.length === 0) return;

    // Create a map to store current view counts
    const viewsMap = new Map<string, number>();
    
    // Initialize map with static views
    initialArticles.forEach(article => {
      viewsMap.set(article.slug, article.views || 0);
    });

    const unsubscribers: (() => void)[] = [];

    // Subscribe to each article's view count
    initialArticles.forEach(article => {
      const unsubscribe = onArticleViewChange(article.slug, (liveViews) => {
        viewsMap.set(article.slug, liveViews);
        
        // Update state with new views
        setArticlesWithViews(currentArticles => 
          currentArticles.map(a => 
            a.slug === article.slug 
              ? { ...a, views: liveViews } 
              : a
          )
        );
      });
      unsubscribers.push(unsubscribe);
    });

    // Cleanup all listeners
    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [initialArticles]); // Re-run if input articles change (which shouldn't happen often for static list)

  return articlesWithViews;
};
