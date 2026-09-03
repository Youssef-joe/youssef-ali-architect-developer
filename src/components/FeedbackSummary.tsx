import { Star, MessageCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { memo } from 'react';
import type { FeedbackStats } from '@/lib/utils';

interface FeedbackSummaryProps {
  stats: FeedbackStats;
}

export const FeedbackSummary = memo(({ stats }: FeedbackSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-border rounded-lg p-6 mb-8"
    >
      <h3 className="heading-md mb-6 flex items-center gap-2">
        <TrendingUp size={20} />
        Reader Engagement
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-muted-foreground">Avg Rating</p>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{stats.totalRatings}</div>
          <p className="text-sm text-muted-foreground">Total Ratings</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <MessageCircle size={16} />
            <span className="text-2xl font-bold">{stats.totalComments}</span>
          </div>
          <p className="text-sm text-muted-foreground">Comments</p>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{stats.totalArticles}</div>
          <p className="text-sm text-muted-foreground">Articles</p>
        </div>
      </div>
    </motion.div>
  );
});
