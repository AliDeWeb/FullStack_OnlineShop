import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResponseToCommentDto {
  @ApiProperty({
    name: 'response',
    example: 'thanks for your feedback',
    description: 'response must have 10 character at least',
  })
  @IsString({ message: 'provide a valid response' })
  @MinLength(10, { message: 'response must have 10 character at least' })
  response: string;
}
