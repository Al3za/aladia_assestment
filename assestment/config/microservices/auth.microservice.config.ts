import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const authMicroserviceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.AUTH_SERVICE_HOST!, // '127.0.0.1',
    port: Number(process.env.AUTH_SERVICE_PORT), //3001, // same as the gateway
  },
};

// utilizabile sia nel microservice che nel client gateway
