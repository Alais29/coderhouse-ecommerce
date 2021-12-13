import { UserValidation } from 'errors';
import multer from 'multer';
import path from 'path';

// storage configuration for multer
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + req.body.email + path.extname(file.originalname),
    );
  },
});

// multer configuration
export const fotoUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: function (req, file, callback) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return callback(null, true);
    } else {
      callback(
        new UserValidation(
          400,
          'La extensión del archivo no es la correcta, debe ser: .jpg, .jpeg o .png',
        ),
      );
    }
  },
}).single('foto');
