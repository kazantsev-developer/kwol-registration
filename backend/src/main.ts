import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints || {}).join(', '),
        }));
        return new BadRequestException({
          statusCode: 400,
          error: 'Validation Error',
          messages,
        });
      },
    }),
  );

  const port = process.env.PORT || 5001;
  await app.listen(port, '0.0.0.0');

  console.log(`Backend running on http://localhost:${port}`);
}

void bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
