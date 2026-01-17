import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
// import { RpcToHttpExceptionFilter } from 'core/filters/rpc-to-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  //app.useGlobalFilters(new RpcToHttpExceptionFilter()); // class defined in core/filters. It hepls throws custom errors from
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
