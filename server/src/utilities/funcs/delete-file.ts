import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { promises as fs } from 'fs';

export const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new NotFoundException(`File at path ${filePath} not found.`);
    } else {
      throw new InternalServerErrorException(
        `Error deleting file at path ${filePath}: ${err.message}`,
      );
    }
  }
};
