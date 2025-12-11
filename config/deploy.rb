# config valid for current version and patch releases of Capistrano
lock '~> 3.19.2'

require 'time'

set :application, 'experience-art-client'
set :repo_url, 'git@github.com:vnazarenko/experience.art.client.git'

ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

append :linked_files, '.env'
append :linked_dirs, '.next/cache'

set :ssh_options,
    verify_host_key: :always,
    forward_agent: true

set :nvm_type, :user
set :nvm_node, 'v22.2.0'
set :keep_releases, 5

set :cache_path, ->{ File.join(shared_path, 'node_modules') }

set :nvm_map_bins, %w{node npm pm2}

namespace :npm do
  task :install do
    on roles(:all) do
      within release_path do
        execute :npm, 'ci --omit=dev'
      end
    end
  end

  desc 'Generate build information'
  task :generate_build_info do
    # Get git commit locally before deploying
    git_commit = `git rev-parse --short HEAD`.strip

    on roles(:all) do
      within release_path do
        # Generate build ID (timestamp + short commit)
        build_time = Time.now.utc.iso8601
        build_id = "#{Time.now.utc.strftime('%Y%m%d%H%M%S')}-#{git_commit}"

        # Create .env.production.local with build info
        execute :echo, "\"NEXT_PUBLIC_BUILD_TIME=#{build_time}\" > .env.production.local"
        execute :echo, "\"NEXT_PUBLIC_BUILD_ID=#{build_id}\" >> .env.production.local"
        execute :echo, "\"NEXT_PUBLIC_GIT_COMMIT=#{git_commit}\" >> .env.production.local"

        info "Build info generated: #{build_id}"
      end
    end
  end

  task :build do
    on roles(:all) do
      within release_path do
        execute :npm, 'run build'
      end
    end
  end

  after :install, :generate_build_info
  after :generate_build_info, :build
end

namespace :deploy do
  desc 'Verify .next directory exists'
  task :verify_build do
    on roles(:all) do
      within release_path do
        # Check if .next directory exists
        unless test("[ -d .next ]")
          error ".next directory not found! Build may have failed."
          raise "Build verification failed: .next directory missing"
        end

        # Check if middleware-manifest.json exists
        unless test("[ -f .next/server/middleware-manifest.json ]")
          error "middleware-manifest.json not found! Build may have failed."
          raise "Build verification failed: middleware-manifest.json missing"
        end

        info ".next directory verified successfully"
      end
    end
  end

  desc 'Start PM2 process for the first time'
  task :start_pm2 do
    on roles(:all) do
      within current_path do
        info 'Starting PM2 process using ecosystem config'
        execute :pm2, 'start ecosystem.config.js'
        execute :pm2, 'save'
      end
    end
  end

  desc 'Reload PM2 process'
  task :reload_pm2 do
    on roles(:all) do
      # Always execute from home directory to avoid cwd issues
      info 'Reloading PM2 process: experience-art-client'

      # Delete existing process if it exists (avoids cwd issues)

      # Start fresh from current symlink
      within current_path do
        if test("pm2 list 2>/dev/null | grep -q experience-art-client")
          execute :pm2, 'delete experience-art-client || true'
        end

        execute :pm2, 'start ecosystem.config.js'
        execute :pm2, 'save'
      end
    end
  end

  desc 'Restart PM2 process'
  task :restart_pm2 do
    on roles(:all) do
      # Always execute from home directory to avoid cwd issues
      within current_path do
        info 'Restarting PM2 process: experience-art-client'
        # Start fresh from current symlink
        execute :pm2, 'restart ecosystem.config.js'
      end
    end
  end

  # after 'npm:build', :vn erify_build
  after :published, 'npm:install'
  before :cleanup, :restart_pm2
end
