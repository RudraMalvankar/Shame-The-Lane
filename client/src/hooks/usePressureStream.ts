import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';

interface PressureUpdate {
  complaintId: string;
  pressureScore: number;
  voteCount: number;
}

/**
 * Subscribe to real-time pressure updates for a specific complaint.
 */
export const usePressureStream = (complaintId: string, initialScore = 0) => {
  const { socket } = useSocket();
  const [pressureScore, setPressureScore] = useState(initialScore);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    if (!socket || !complaintId) return;

    socket.emit('join:complaint', complaintId);

    socket.on('pressure:update', (data: PressureUpdate) => {
      if (data.complaintId === complaintId) {
        setPressureScore(data.pressureScore);
        setVoteCount(data.voteCount);
      }
    });

    return () => {
      socket.emit('leave:complaint', complaintId);
      socket.off('pressure:update');
    };
  }, [socket, complaintId]);

  return { pressureScore, voteCount };
};
