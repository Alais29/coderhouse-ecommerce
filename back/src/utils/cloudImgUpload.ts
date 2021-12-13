import { UploadedFile } from 'express-fileupload';
import { UserValidation } from 'errors';
import cloudinary from 'services/cloudinary';

export const uploadToCloudinary = async (
  file: UploadedFile,
  email: string,
): Promise<string> => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  if (file.size > 1024 * 1024) {
    throw new UserValidation(
      400,
      'La imagen supera el tamaño permitido, debe ser menor de 1mb',
    );
  }
  if (!mimetype) {
    throw new UserValidation(
      400,
      'La extensión del archivo no es la correcta, debe ser: .jpg, .jpeg o .png',
    );
  }
  const { tempFilePath } = file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    public_id: `foto-${email}`,
    folder: 'Users',
  });

  return secure_url;
};
