import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),

  // CORS
  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),

  // Common rate limit settings
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  // MongoDB Atlas
  MONGO_USERNAME: str({ devDefault: testOnly('username') }),
  MONGO_PASSWORD: str({ devDefault: testOnly('password') }),
  MONGO_DB_NAME: str({ devDefault: testOnly('test-db') }),
  MONGO_CLUSTER: str({ devDefault: testOnly('cluster0.mongodb.net') }),

  // MongoDB Connection Pool Options (optional, if used)
  DB_MAX_POOL_SIZE: num({ devDefault: testOnly(5) }),
  DB_MIN_POOL_SIZE: num({ devDefault: testOnly(2) }),
  DB_IDLE_TIMEOUT_MS: num({ devDefault: testOnly(30000) }),
  DB_WAIT_QUEUE_TIMEOUT_MS: num({ devDefault: testOnly(5000) }),

  // JWT
  JWT_SECRET: str({ devDefault: testOnly('fasfadfasdfasdfasdfasdfasdf') }),
  JWT_REFRESH_SECRET: str({ devDefault: testOnly('fasfadfasdfasdfasdfasdfasdf') }),
  JWT_EXPIRES_IN: str({ devDefault: testOnly('30m') }),
  JWT_REFRESH_EXPIRES_IN: str({ devDefault: testOnly('7d') }),

  // Redis
  REDIS_HOST: host({ devDefault: testOnly('your host') }),
  REDIS_PORT: port({ devDefault: testOnly(1111) }),
});
