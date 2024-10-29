import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as xssClean from 'xss-clean';
import * as process from 'node:process';
import { NextFunction, Request, Response } from 'express';

const SWAGGER_ENVS = ['local', 'dev'];
export let PORT = Number(process.env.PORT) || 0;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet(),
    // csurf(),
    rateLimit({
      windowMs: 5 * 60 * 1000,
      max: process.env.NODE_ENV === 'production' ? 100 : 10000,
    }),
    xssClean(),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Opener-Policy', 'cross-origin');

    next();
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(
      ['/docs', '/docs-json'],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('API Docs')
      .setDescription('The API documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const server = await app.listen(PORT, '0.0.0.0');
  PORT = server.address().port;
}

bootstrap().then(() => console.log(`app listening on port ${PORT}`));
