module.exports = {
  apps: [
    {
      name: 'app-fork',
      script: './build/src/index.js',
      watch: true,
      autorestart: true,
      args: '--mode fork --run pm2 --port 8081',
    },
    {
      name: 'app-cluster',
      script: './build/src/index.js',
      watch: true,
      autorestart: true,
      instances: -1,
      args: '--mode cluster --run pm2 --port 8082',
    },
  ],
};
