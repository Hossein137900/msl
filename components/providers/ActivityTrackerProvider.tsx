'use client';

import { useEffect } from 'react';
import { activityTracker } from '@/lib/activityTracker';

export function ActivityTrackerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && activityTracker) {
      activityTracker.initialize();
    }
  }, []);

  return <>{children}</>;
}
