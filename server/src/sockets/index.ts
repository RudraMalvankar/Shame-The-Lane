import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyToken } from '../config/jwt';
import { logger } from '../utils/logger';

let io: Server;

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const payload = verifyToken(token);
        (socket as Socket & { user?: typeof payload }).user = payload;
      } catch {
        // Allow unauthenticated connections for read-only events
      }
    }
    next();
  });

  io.on('connection', (socket: Socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    // Join city room for location-based updates
    socket.on('join:city', (city: string) => {
      socket.join(`city:${city}`);
      logger.info(`Socket ${socket.id} joined city:${city}`);
    });

    // Join complaint room for real-time pressure updates
    socket.on('join:complaint', (complaintId: string) => {
      socket.join(`complaint:${complaintId}`);
    });

    socket.on('leave:complaint', (complaintId: string) => {
      socket.leave(`complaint:${complaintId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

// Emitters used by other services
export const emitPressureUpdate = (
  complaintId: string,
  pressureScore: number,
  voteCount: number
): void => {
  getIO()
    .to(`complaint:${complaintId}`)
    .emit('pressure:update', { complaintId, pressureScore, voteCount });
};

export const emitNewComplaint = (cityOrState: string, complaint: unknown): void => {
  getIO().to(`city:${cityOrState}`).emit('complaint:new', complaint);
};

export const emitStatusChange = (
  complaintId: string,
  status: string
): void => {
  getIO()
    .to(`complaint:${complaintId}`)
    .emit('status:change', { complaintId, status });
};
