# Build Information Feature

This application includes automatic build information tracking to help identify which version is deployed.

## How to Check Build Info

### 1. Browser Console
Open the browser console on any page, and you'll see:
```
🎨 Experience.art Client
Version: v0.1.0 (20250124123456-abc1234) - 2025-01-24T12:34:56.789Z
Git Commit: abc1234
```

### 2. API Endpoint
Visit `/api/build-info` to get JSON response:
```json
{
  "buildTime": "2025-01-24T12:34:56.789Z",
  "buildId": "20250124123456-abc1234",
  "version": "0.1.0",
  "gitCommit": "abc1234"
}
```

### 3. HTML Meta Tag
Check the page source for:
```html
<meta name="build-info" content="v0.1.0 (20250124123456-abc1234) - 2025-01-24T12:34:56.789Z">
```

## How It Works

During deployment (via Capistrano), the `npm:generate_build_info` task:
1. Extracts the current git commit hash
2. Generates a build ID with timestamp + commit
3. Creates `.env.production.local` with:
   - `NEXT_PUBLIC_BUILD_TIME` - ISO timestamp of build
   - `NEXT_PUBLIC_BUILD_ID` - Unique build identifier
   - `NEXT_PUBLIC_GIT_COMMIT` - Short git commit hash

These variables are then available throughout the Next.js app and included in the build.

## Local Development

In development mode, it will show:
- Build ID: "development"
- Git Commit: "unknown"
- Build Time: current timestamp

## Production

After deployment, you'll see real values like:
- Build ID: "20250124161523-a1b2c3d"
- Git Commit: "a1b2c3d"
- Build Time: "2025-01-24T16:15:23.456Z"

This helps verify that:
- The correct version is deployed
- The deployment completed successfully
- You're not seeing cached old versions
