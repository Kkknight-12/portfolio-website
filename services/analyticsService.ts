// services/analyticsService.ts
import { api } from '@/lib/api';
import { ApiResponse } from '@/types';

interface AnalyticsTimeRange {
  start: Date;
  end: Date;
  interval?: 'day' | 'week' | 'month';
}

interface AnalyticsOptions {
  timeRange?: AnalyticsTimeRange;
  includeHistory?: boolean;
  groupBy?: 'day' | 'week' | 'month';
}

interface AnalyticsData {
  totalViews: number;
  uniqueViews: number;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  trends: {
    viewsTrend: number;
    uniqueViewsTrend: number;
  };
  timeBasedAnalytics?: Array<{
    period: string;
    views: number;
    uniqueViews: number;
  }>;
}

export const analyticsService = {
  /**
   * Get analytics for a specific blog
   * @param blogId - The blog post ID
   * @param options - Analytics options for filtering and grouping
   */
  getBlogAnalytics: async (
    blogId: string,
    options?: AnalyticsOptions
  ): Promise<ApiResponse<AnalyticsData>> => {
    const params = new URLSearchParams();

    if (options?.timeRange) {
      params.append('start', options.timeRange.start.toISOString());
      params.append('end', options.timeRange.end.toISOString());
      if (options.timeRange.interval) {
        params.append('interval', options.timeRange.interval);
      }
    }

    if (options?.groupBy) {
      params.append('groupBy', options.groupBy);
    }

    if (options?.includeHistory) {
      params.append('includeHistory', 'true');
    }

    const response = await api.get(
      `/analytics/blog/${blogId}?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Track a new blog view
   * @param blogId - The blog post ID
   */
  trackBlogView: async (blogId: string): Promise<ApiResponse<void>> => {
    const response = await api.post(`/analytics/track/${blogId}`);
    return response.data;
  },
};
