import { http } from './http';

export const getRtiDraft = async (complaintId: string) => {
  const res = await http.get(`/rti/${complaintId}`);
  return res.data.data as { rtiDraft?: string; rtiFiledAt?: string };
};

export const generateRti = async (
  complaintId: string,
  payload: { address: string }
) => {
  const res = await http.post(`/rti/${complaintId}/generate`, payload);
  return res.data.data as { rtiLetter: string };
};
