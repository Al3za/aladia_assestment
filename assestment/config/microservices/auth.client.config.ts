import { Transport, ClientProviderOptions } from '@nestjs/microservices';

export const authMicroserviceClientConfig: ClientProviderOptions = {
  name: process.env.AUTH_SERVICE_NAME!, //'AUTH_SERVICE',
  transport: Transport.TCP,
  options: {
    host: process.env.AUTH_SERVICE_HOST!, //'127.0.0.1',
    port: Number(process.env.AUTH_SERVICE_PORT), //3001,
  },
};
