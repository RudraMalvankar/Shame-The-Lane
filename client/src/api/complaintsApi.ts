import { http } from './http';

export const getComplaints = async (params?: Record<string, unknown>) => {
  const res = await http.get('/complaints', { params });
  return res.data.data;
};

export const getComplaintById = async (id: string) => {
  const res = await http.get(`/complaints/${id}`);
  return res.data.data;
};

export const createComplaint = async (payload: Record<string, unknown>) => {
  const res = await http.post('/complaints', payload);
  return res.data.data;
};

export const getNearbyComplaints = async (
  lat: number,
  lng: number,
  radius = 5000
) => {
  const res = await http.get('/complaints/nearby', {
    params: { lat, lng, radius },
  });
  return res.data.data;
};

export const castVote = async (complaintId: string, type: 'upvote' | 'downvote') => {
  const res = await http.post('/complaints/votes', { complaintId, type });
  return res.data.data;
};
