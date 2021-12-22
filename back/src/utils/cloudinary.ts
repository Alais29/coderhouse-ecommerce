import { UploadedFile } from 'express-fileupload';
import _ from 'lodash';
import { FileValidation } from 'errors';
import Config from 'config';
import cloudinary from 'services/cloudinary';
import { IItem } from 'common/interfaces/products';
import { productsAPI } from 'api/productos';

/**
 * Uploads the iamge file to cloudinary to an specified folder and returns the url and id of the uploaded image
 * @param file file to upload
 * @param folder folder on cloudinary to upload to
 * @returns object iwth the secure_url and public_id of the uploaded image
 */
export const uploadToCloudinary = async (
  file: UploadedFile,
  folder: 'Users' | 'Products',
): Promise<{ secure_url: string; public_id: string }> => {
  if (Config.NODE_ENV === 'test') {
    return { secure_url: 'secure url', public_id: 'public id' };
  }

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

export const uploadMultipleToCloudinary = async (
  files: UploadedFile[],
  folder: 'Users' | 'Products',
): Promise<{ fotosUrls: string[]; fotosId: string[] }> => {
  const imgArray = Array.isArray(files) ? files : [files];
  const cldyImages: { fotosUrls: string[]; fotosId: string[] } = {
    fotosUrls: [],
    fotosId: [],
  };
  for await (const file of imgArray) {
    const { secure_url, public_id } = await uploadToCloudinary(file, folder);
    cldyImages.fotosUrls.push(secure_url);
    cldyImages.fotosId.push(public_id);
  }
  return cldyImages;
};

/**
 * Deletes images from cloudinary when deleting a product or editing an existing one
 * @param prevProductId id of the product which images need to be deleted
 * @param method 'update' if the product is just being updated, 'delete' is the product is being deleted
 * @param dataToUpdate mandatory if updating a product
 * @returns void
 */
export const deleteFromCloudinary = async (
  prevProductId: string,
  method: 'update' | 'delete',
  dataToUpdate?: IItem,
): Promise<void> => {
  if (Config.NODE_ENV === 'test') return;

  const productToUpdateOrDelete = (await productsAPI.get(
    prevProductId,
  )) as IItem;

  switch (method) {
    case 'update': {
      if (
        dataToUpdate !== undefined &&
        productToUpdateOrDelete?.fotosId?.length !==
          dataToUpdate?.fotosId?.length
      ) {
        const imagesToDelete = _.difference(
          productToUpdateOrDelete.fotosId,
          dataToUpdate.fotosId as string[],
        );
        for await (const imgId of imagesToDelete) {
          await cloudinary.uploader.destroy(imgId);
        }
      }
      break;
    }
    default: {
      if (productToUpdateOrDelete.fotosId) {
        for await (const fotoId of productToUpdateOrDelete.fotosId) {
          await cloudinary.uploader.destroy(fotoId);
        }
      }
      break;
    }
  }
};
