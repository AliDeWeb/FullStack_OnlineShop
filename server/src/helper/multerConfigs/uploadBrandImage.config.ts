import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const maxFileSize = 0.5 * 1024 * 1024;

export const uploadBrandsImage = {
  storage: diskStorage({
    destination: 'static/uploads/images/brands',
    filename: (req, file, cb) => {
      const uniqueName = `brand-${Date.now()}-${Math.floor(Math.random() * 100000)}-image`;
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
