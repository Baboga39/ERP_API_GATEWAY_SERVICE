// shared-libs/utils/redis.config.js
const { createClient } = require('redis');

const redis = createClient({
  username: 'default',
  password: 'nmRBH4xn7cdR98RRdIoX3N90FzG1eXR4',
  socket: {
    host: 'redis-10985.crce194.ap-seast-1-1.ec2.redns.redis-cloud.com',
    port: 10985
  }
});

redis.on('error', err => console.error('❌ Redis Client Error:', err));

(async () => {
  await redis.connect();
  console.log('✅ Redis client connected');
})();

module.exports = redis;
