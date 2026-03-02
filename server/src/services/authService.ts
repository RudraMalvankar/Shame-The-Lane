import { User, IUser } from '../models/User';
import { signToken, JwtPayload } from '../config/jwt';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResult {
  user: Omit<IUser, 'password'>;
  token: string;
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResult> => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw new Error('Email already registered');

  const user = await User.create(payload);
  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const userObj = user.toObject() as IUser & { password?: string };
  delete userObj.password;

  return { user: userObj as IUser, token };
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResult> => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.comparePassword(payload.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const userObj = user.toObject() as IUser & { password?: string };
  delete userObj.password;

  return { user: userObj as IUser, token };
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id).lean() as Promise<IUser | null>;
};
