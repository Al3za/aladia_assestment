import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { authMicroserviceClientConfig } from '../../../config/microservices/auth.client.config';
@Module({
  imports: [
    ClientsModule.register([
      // connection with microservice
      authMicroserviceClientConfig,
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
