// Build information - updated during deployment
export const BUILD_INFO = {
  buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString(),
  buildId: process.env.NEXT_PUBLIC_BUILD_ID || 'development',
  version: process.env.npm_package_version || '0.1.0',
  gitCommit: process.env.NEXT_PUBLIC_GIT_COMMIT || 'unknown',
};

export function getBuildString(): string {
  return `v${BUILD_INFO.version} (${BUILD_INFO.buildId}) - ${BUILD_INFO.buildTime}`;
}
