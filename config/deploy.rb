# config valid for current version and patch releases of Capistrano
lock '~> 3.19.2'

set :application, 'experience-art-client'
set :repo_url, 'git@github.com:vnazarenko/experience.art.client.git'

ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

append :linked_files, '.env'

set :ssh_options,
    verify_host_key: :always,
    forward_agent: true

set :nvm_type, :user
set :nvm_node, 'v22.2.0'
set :nvm_map_bins, %w[node npm yarn]
set :keep_releases, 5

set :cache_path, ->{ File.join(shared_path, 'node_modules') }

set :nvm_map_bins, %w{node yarn pm2}

namespace :yarn do
  task :build do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        with fetch(:yarn_env_variables, {}) do
          execute fetch(:yarn_bin), 'build'
        end
      end
    end
  end

  task :load_cached_modules do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        with fetch(:yarn_env_variables, {}) do
          if test("[ -d #{fetch(:cache_path)} ]")
            execute :cp, '-a', fetch(:cache_path), 'node_modules'
          else
            execute :mkdir, '-p', fetch(:cache_path)
          end
        end
      end
    end
  end

  task :cache_modules do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        with fetch(:yarn_env_variables, {}) do
          if test("[ -d #{fetch(:cache_path)} ]")
            execute :rm, '-r', fetch(:cache_path)
          end
          execute :cp, '-a', 'node_modules', fetch(:cache_path)
        end
      end
    end
  end

  before :install, :load_cached_modules
  after :install, :cache_modules
  after :install, :build
end

namespace :deploy do
  desc 'Start PM2 process for the first time'
  task :start_pm2 do
    on roles(:all) do
      within current_path do
        info 'Starting PM2 process: experience-art-client'
        execute :pm2, 'start npm --name experience-art-client -- start'
        execute :pm2, 'save'
      end
    end
  end

  desc 'Restart PM2 process'
  task :restart_pm2 do
    on roles(:all) do
      within current_path do
        info 'Restarting PM2 process: experience-art-client'
        execute :pm2, 'restart experience-art-client'
      end
    end
  end

  before :cleanup, :restart_pm2
end
