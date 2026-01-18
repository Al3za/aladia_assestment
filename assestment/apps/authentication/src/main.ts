// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './authentication.module';
import { NestFactory } from '@nestjs/core';
import { authMicroserviceConfig } from '../../../config/microservices/auth.microservice.config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    authMicroserviceConfig,
  );
  await app.listen();
  console.log('Authentication microservice is listening on TCP port 3001');
}
void bootstrap();

// ora il microservizio non espone più HTTP, ma riceve messaggi TCP dal Gateway.

// run  nest start authentication --watch to open authentication microservice ( it opens tnx to nest-cli.json file)

// after you open the authentication microservice servers, run postman test at http://localhost:3000/auth/users , not 3001. (main.ts listens at port 3000)
