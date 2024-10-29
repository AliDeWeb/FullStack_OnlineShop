import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Newsletter,
  NewsletterDocument,
} from 'src/schemas/newsletter/newsletter.schema';
import { CreateNewsletterDto } from './dto/createNewsletter.dto';

export class NewsletterRepository {
  constructor(
    @InjectModel(Newsletter.name)
    private readonly newsletterModel: Model<NewsletterDocument>,
  ) {}

  async createNewsletter(createNewsletterData: CreateNewsletterDto) {
    const newsletter = await this.newsletterModel.create(createNewsletterData);

    return newsletter;
  }
}
