import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const uploadImage = async (
  filepath: string,
  folder: string
): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filepath, {
    folder: `Park-Manager/${folder}`,
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};
