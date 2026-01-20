import { Transport, ClientProviderOptions } from '@nestjs/microservices';

export const authMicroserviceClientConfig: ClientProviderOptions = {
  name: process.env.AUTH_SERVICE_NAME!,
  transport: Transport.TCP,
  options: {
    host: process.env.AUTH_SERVICE_HOST!,
    port: Number(process.env.AUTH_SERVICE_PORT),
  },
};
