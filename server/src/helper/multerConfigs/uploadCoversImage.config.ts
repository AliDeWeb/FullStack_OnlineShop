import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const maxFileSize = 8 * 1024 * 1024;

export const uploadCoversImage = {
  storage: diskStorage({
    destination: 'static/uploads/images/covers',
    filename: (req, file, cb) => {
      const uniqueName = `cover-${Date.now()}-${Math.floor(Math.random() * 100000)}-image`;
      const ext = file.originalname.split('.').pop();
      cb(null, `${uniqueName}.${ext}`);
    },
  }),
  fileFilter: (req, file: Express.Multer.File, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('file type is not allowed'), false);
    }
  },
  limits: {
    fileSize: maxFileSize,
  },
};
