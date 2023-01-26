import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';

const redis = new Redis(6379, '127.0.0.1');

const queue = new Queue('{test}', {connection: redis});

const worker = new Worker('{test}', async (job) => {
    console.log('accept', job.id);

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 5000);
    });

    console.log('finish', job.id);
}, {
    lockDuration: 1000,
    lockRenewTime: 10000,
    stalledInterval: 1100,
    connection: redis,
    concurrency: 10,
    maxStalledCount: 0
});

worker.on('stalled', (jobId) => {
    console.log('stalled', jobId);
});

worker.on('error', (error) => {
    console.log('error', `Error : ${error.message}`);
});

worker.on('failed', (job, error) => {
    console.log('failed', job?.id, `Error : ${error.message}`);
});

(async () => {
    console.log('job pushing...');
    const job = await queue.add('mytest', {}, {
        removeOnFail: true,
        removeOnComplete: true,
    });
    console.log(`job pubshed : ${job.id}`);
})();
