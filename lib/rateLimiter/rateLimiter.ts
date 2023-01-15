// import { default as Redis } from 'ioredis';
import { createClient } from 'redis';
import { apiLimiter } from './apiLimiterLua';

interface rateLimitReturn {
	allowed: boolean;
	remaining: number;
}

export const checkRateLimit = async (key: string): Promise<{ allowed: boolean; remaining: number }> => {
	const redisUrl = process.env.REDIS_URL;
	let allowedReturn: boolean = true;
	let remainingReturn: number = 0;
	if (redisUrl) {
		console.log('redisUrl', redisUrl);
		const client = createClient();

		client.on('error', (err) => console.log('Redis Client Error', err));

		await client.connect();
		client.QUIT();

		// const redis = new Redis();
		// console.log('redis', redis);
		// const redis = new Redis(redisUrl);
		// const rate = 5;
		// const capacity = rate * 3;
		// const now = Math.floor(new Date().getTime() / 1000);
		// const requested = 3;
		// const keys = [`${key}.tokens`, `${key}.timestamp`];
		// const args = [rate, capacity, now, requested];

		// const [allowed, remaining]: any = await redis.eval(apiLimiter, keys.length, ...keys, ...args);
		// console.log('alowed', allowed, 'remaining', remaining);
		// const redisStatus: any = redis.status;
		// console.log('redisStatus', redisStatus);
		// const returnVal: any = await redis.eval('return ARGV[1]', 0, 'hello');
		// console.log('returnVal', returnVal);
		// allowedReturn = allowed === 1;
		// remainingReturn = remaining;
	}

	return { allowed: allowedReturn, remaining: remainingReturn };
};
