import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from 'core/cors/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //AppModule → globale, orchestration, guards, pipes, filters, shared services. put in AppModule al te resources that has to be global, and then put in within bootstrap
  app.enableCors(corsConfig);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
