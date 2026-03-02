import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

export { cloudinary };

export const uploadImage = async (
  filePath: string,
  folder = 'shame-the-lane'
): Promise<string> => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return result.secure_url;
};
