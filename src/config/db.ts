import mongoose from 'mongoose';

import { logger } from '@/config/logger';
import { env } from '@/utils/envConfig';

// Connection options
const options: mongoose.ConnectOptions = {
  maxPoolSize: env.DB_MAX_POOL_SIZE,
  minPoolSize: env.DB_MIN_POOL_SIZE,
  maxIdleTimeMS: env.DB_IDLE_TIMEOUT_MS,
  waitQueueTimeoutMS: env.DB_WAIT_QUEUE_TIMEOUT_MS,
};

const getMongoURI = () => {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = env;
  return `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.b1wgc.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
};

export async function connectDB() {
  try {
    const mongoURI = getMongoURI();

    await mongoose.connect(mongoURI, options);
    logger.info('Connected to MongoDB');

    // Attach listeners after successful connection
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    // Optional: handle app shutdown gracefully
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('📦 MongoDB disconnected on app termination');
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}
