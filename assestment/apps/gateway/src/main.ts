import { NestFactory } from '@nestjs/core';
// import { GatewayModule } from './gateway.module';
import { AppModule } from './app.module';
// import { RpcToHttpExceptionFilter } from 'core/filters/rpc-to-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //AppModule → globale, orchestration, guards, pipes, filters, shared services. put in AppModule al te resources that has to be globali, and then put in within bootstrap
  //app.useGlobalFilters(new RpcToHttpExceptionFilter()); // class defined in core/filters. It hepls throws custom errors from
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
