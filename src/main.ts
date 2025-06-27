import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const appPort = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort);

  console.log(
    `\n\t🚀 graphql service ready at http://localhost:${appPort}/graphql/ \n\t`,
  );
}
bootstrap();
