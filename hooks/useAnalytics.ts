// src/hooks/useAnalytics.ts

import { analyticsService } from '@/services';
import { useEffect, useState } from 'react';

interface AnalyticsOptions {
  timeRange?: {
    start: Date;
    end: Date;
    interval?: 'day' | 'week' | 'month';
  };
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

interface UseAnalyticsReturn {
  data: AnalyticsData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useAnalytics = (
  blogId: string,
  options: AnalyticsOptions = {}
): UseAnalyticsReturn => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await analyticsService.getBlogAnalytics(blogId, options);

      if (!response.success) {
        throw new Error('Failed to fetch analytics');
      }

      setData(response.data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch analytics')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [blogId, JSON.stringify(options)]);

  return { data, loading, error, refetch: fetchAnalytics };
};

// Time range presets utility
export const getTimeRangePresets = () => ({
  today: {
    start: new Date(new Date().setHours(0, 0, 0, 0)),
    end: new Date(),
    interval: 'day' as const,
  },
  lastWeek: {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
    interval: 'day' as const,
  },
  lastMonth: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
    interval: 'week' as const,
  },
  lastYear: {
    start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    end: new Date(),
    interval: 'month' as const,
  },
});
