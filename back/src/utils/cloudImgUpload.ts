import { UploadedFile } from 'express-fileupload';
import { FileValidation } from 'errors';
import cloudinary from 'services/cloudinary';

export const uploadToCloudinary = async (
  file: UploadedFile,
  folder: 'Users' | 'Products',
): Promise<{ secure_url: string; public_id: string }> => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  if (file.size > 1024 * 1024) {
    throw new FileValidation(
      400,
      'La imagen supera el tamaño permitido, debe ser menor de 1mb',
    );
  }
  if (!mimetype) {
    throw new FileValidation(
      400,
      'La extensión del archivo no es la correcta, debe ser: .jpg, .jpeg o .png',
    );
  }
  const { tempFilePath } = file;
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    tempFilePath,
    { folder },
  );

  return { secure_url, public_id };
};
