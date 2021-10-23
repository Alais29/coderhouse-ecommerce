import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads',
  // TODO: Add file limitations (size, extension, etc)
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + req.body.email + path.extname(file.originalname),
    );
  },
});

export const fotoUpload = multer({ storage });
