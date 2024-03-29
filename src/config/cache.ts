import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: String(process.env.REDIS_HOST),
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
      db: 1,
    },
  },
} as ICacheConfig;
