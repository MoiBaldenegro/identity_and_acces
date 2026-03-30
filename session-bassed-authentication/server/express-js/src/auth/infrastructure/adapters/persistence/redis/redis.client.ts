// src/infrastructure/adapters/persistence/redis/redis.client.ts
import Redis from 'ioredis';
import { config } from '../../../../config/env.js';

export const redis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 100, 3000),
  enableReadyCheck: true,
  lazyConnect: true,
});

redis.on('error', (err) => console.error('Redis Client Error', err));
redis.on('connect', () => console.log('✅ Redis connected'));