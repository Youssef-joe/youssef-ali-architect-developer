import { useState, useEffect, useRef, useCallback } from 'react';

export interface ArticleComment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  rating?: number;
}

export interface ArticleFeedbackData {
  articleId: string;
  ratings: number[];
  comments: ArticleComment[];
  lastUpdated: number;
}

export const useArticleFeedback = (articleId: string) => {
  const [feedback, setFeedback] = useState<ArticleFeedbackData>({
    articleId,
    ratings: [],
    comments: [],
    lastUpdated: Date.now(),
  });

  const [userRating, setUserRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `article-feedback-${articleId}`;
  const userRatingKey = `user-rating-${articleId}`;
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = useCallback((data: ArticleFeedbackData) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving feedback:', error);
      }
    }, 100);
  }, [storageKey]);

  // Load feedback from localStorage
  useEffect(() => {
    const loadFeedback = () => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          setFeedback(parsed);
        }

        const storedUserRating = localStorage.getItem(userRatingKey);
        if (storedUserRating) {
          setUserRating(parseInt(storedUserRating, 10));
        }
      } catch (error) {
        console.error('Error loading feedback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedback();
  }, [articleId, storageKey, userRatingKey]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  // Save feedback to localStorage
  useEffect(() => {
    if (!isLoading) {
      scheduleSave(feedback);
    }
  }, [feedback, isLoading, scheduleSave]);

  const addRating = (rating: number) => {
    setFeedback((prev) => {
      const newRatings = [...prev.ratings];

      if (userRating > 0) {
        const existingIndex = feedback.ratings.findIndex(
          (_, idx) => localStorage.getItem(`${userRatingKey}-index`) === idx.toString()
        );
        if (existingIndex !== -1) {
          newRatings[existingIndex] = rating;
        } else {
          newRatings.push(rating);
        }
      } else {
        newRatings.push(rating);
      }

      localStorage.setItem(`${userRatingKey}-index`, (newRatings.length - 1).toString());

      const updated = {
        ...prev,
        ratings: newRatings,
        lastUpdated: Date.now(),
      };

      return updated;
    });

    setUserRating(rating);
    localStorage.setItem(userRatingKey, rating.toString());
  };

  const addComment = (author: string, content: string, rating?: number) => {
    const newComment: ArticleComment = {
      id: `${Date.now()}-${Math.random()}`,
      author: author.trim(),
      content: content.trim(),
      timestamp: Date.now(),
      rating,
    };

    setFeedback((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
      lastUpdated: Date.now(),
    }));
  };

  const deleteComment = (commentId: string) => {
    setFeedback((prev) => ({
      ...prev,
      comments: prev.comments.filter((c) => c.id !== commentId),
      lastUpdated: Date.now(),
    }));
  };

  const getAverageRating = () => {
    if (feedback.ratings.length === 0) return 0;
    const sum = feedback.ratings.reduce((a, b) => a + b, 0);
    return sum / feedback.ratings.length;
  };

  const getTotalRatings = () => feedback.ratings.length;
  const getComments = () => feedback.comments;

  return {
    feedback,
    userRating,
    isLoading,
    addRating,
    addComment,
    deleteComment,
    getAverageRating,
    getTotalRatings,
    getComments,
  };
};
