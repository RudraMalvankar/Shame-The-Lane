import { http } from './http';

export const login = async (email: string, password: string) => {
  const res = await http.post('/auth/login', { email, password });
  return res.data.data as { user: any; token: string };
};

export const signup = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await http.post('/auth/register', { name, email, password });
  return res.data.data as { user: any; token: string };
};

export const getMe = async () => {
  const res = await http.get('/auth/me');
  return res.data.data;
};
