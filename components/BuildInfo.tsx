'use client';

import { useEffect } from 'react';
import { BUILD_INFO, getBuildString } from '@/lib/build-info';

export function BuildInfo() {
  useEffect(() => {
    console.log(
      '%c🎨 Experience.art Client',
      'font-weight: bold; font-size: 16px; color: #8B5CF6; padding: 4px;'
    );
    console.log(
      `%cVersion: ${getBuildString()}`,
      'color: #6B7280; font-size: 12px;'
    );
    console.log(
      `%cGit Commit: ${BUILD_INFO.gitCommit}`,
      'color: #6B7280; font-size: 12px;'
    );
  }, []);

  return null; // This component doesn't render anything
}
