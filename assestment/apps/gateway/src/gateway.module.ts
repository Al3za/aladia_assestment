import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ClientsModule } from '@nestjs/microservices';
import { authMicroserviceClientConfig } from '../../../config/microservices/auth.client.config';
@Module({
  imports: [
    ClientsModule.register([
      // registers and connect with the microservices
      authMicroserviceClientConfig,
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
