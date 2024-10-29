import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import {
  Newsletter,
  NewsletterSchema,
} from 'src/schemas/newsletter/newsletter.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsletterRepository } from './newsletter.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Newsletter.name, schema: NewsletterSchema },
    ]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService, NewsletterRepository],
})
export class NewsletterModule {}
