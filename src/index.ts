import { connectDB } from '@/config/db';
import { app, logger } from '@/server';
import { env } from '@/utils/envConfig';

async function startServer() {
  try {
    // Establish MongoDB connection
    await connectDB();

    // Start the server
    const { NODE_ENV, HOST, PORT } = env;
    const server = app.listen(PORT, () => {
      logger.info(`Server (${NODE_ENV}) running on http://${HOST}:${PORT}`);
    });

    // Graceful shutdown logic
    const onCloseSignal = () => {
      logger.info('SIGINT received, shutting down');
      server.close(() => {
        logger.info('Server closed');
        process.exit();
      });

      // Force shutdown after 10s
      setTimeout(() => process.exit(1), 10000).unref();
    };

    process.on('SIGINT', onCloseSignal);
    process.on('SIGTERM', onCloseSignal);
  } catch (error) {
    logger.error('❌ Could not start server due to DB connection error', error);
    process.exit(1);
  }
}

startServer();
