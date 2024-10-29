import { Injectable } from '@nestjs/common';
import { NewsletterRepository } from './newsletter.repository';
import { CreateNewsletterDto } from './dto/createNewsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(private readonly newsletterRepository: NewsletterRepository) {}

  async createNewsletter(createNewsletterData: CreateNewsletterDto) {
    const newsletter =
      await this.newsletterRepository.createNewsletter(createNewsletterData);

    return newsletter;
  }
}
