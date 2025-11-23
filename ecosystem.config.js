module.exports = {
  apps: [
    {
      name: 'experience-art-client',
      script: './node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/experience.art.client/current',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/www/experience.art.client/shared/log/pm2-error.log',
      out_file: '/var/www/experience.art.client/shared/log/pm2-out.log',
      log_file: '/var/www/experience.art.client/shared/log/pm2-combined.log',
      time: true,
      merge_logs: true,
      kill_timeout: 5000,
      wait_ready: false,
      listen_timeout: 10000
    }
  ]
};
