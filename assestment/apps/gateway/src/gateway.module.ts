import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
//import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001, // same port as the microservice
        },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}

// AUTH_SERVICE è solo un token DI, non il nome del microservizio.

// run  nest start gateway --watch to open gateway connection ( it opens tnx to nest-cli.json file)

// after you open the gateway servers, run postman test at http://localhost:3000/auth/users , not 3001. (main.ts listens at port 3000)
