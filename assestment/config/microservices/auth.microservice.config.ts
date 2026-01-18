import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const authMicroserviceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 3001, // same as the gateway
  },
};

// utilizabile sia nel microservice che nel client gateway
