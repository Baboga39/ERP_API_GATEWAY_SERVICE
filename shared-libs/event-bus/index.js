const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');

const redisConnectionString = 'redis://default:nmRBH4xn7cdR98RRdIoX3N90FzG1eXR4@redis-10985.crce194.ap-seast-1-1.ec2.redns.redis-cloud.com:10985';

const connection = new Redis(redisConnectionString, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// Ví dụ tạo queue
function getQueue(name) {
  return new Queue(name, { connection });
}

// Ví dụ enqueue
async function enqueue(queueName, data) {
  const queue = getQueue(queueName);
  await queue.add('job', data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 3000 },
    removeOnComplete: true,
    removeOnFail: false
  });
}

// Ví dụ subscribe
function subscribe(queueName, handler) {
  const worker = new Worker(queueName, async (job) => {
    await handler(job.data);
  }, { connection });

  worker.on('completed', (job) => {
    console.log(`✅ [${queueName}] Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ [${queueName}] Job ${job.id} failed: ${err.message}`);
  });

  console.log(`👂 Listening to queue [${queueName}]...`);
}

module.exports = { enqueue, subscribe };
