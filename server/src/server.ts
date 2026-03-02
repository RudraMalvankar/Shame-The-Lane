import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import { initSocket } from './sockets';
import { env } from './config/env';
import { logger } from './utils/logger';

const httpServer = http.createServer(app);

// Initialize Socket.io
initSocket(httpServer);

const bootstrap = async (): Promise<void> => {
  // Connect to MongoDB
  await connectDB();

  httpServer.listen(env.port, () => {
    logger.info(
      `🚦 Shame The Lane server running on port ${env.port} [${env.nodeEnv}]`
    );
  });
};

bootstrap().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  httpServer.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});
