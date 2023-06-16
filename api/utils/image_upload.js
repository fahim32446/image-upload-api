import crypto from 'crypto';
import { dirname } from 'esm-dirname';
import multer from 'multer';
import path from 'path';


export const currentPath = dirname(import.meta);

export const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${crypto
      .randomBytes(8)
      .toString('hex')}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

export const upload = multer({ storage: storage });
