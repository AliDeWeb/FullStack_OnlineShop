import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsletterDto } from './dto/createNewsletter.dto';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('create')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  async createNewsletter(@Body() body: CreateNewsletterDto) {
    const data = await this.newsletterService.createNewsletter(body);

    return { message: `welcome to newsletter ${data.email}` };
  }
}
