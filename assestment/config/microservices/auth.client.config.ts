import { Transport, ClientProviderOptions } from '@nestjs/microservices';

export const authMicroserviceClientConfig: ClientProviderOptions = {
  // name: 'AUTH_SERVICE',
  // transport: Transport.TCP,
  // options: {
  //   host: process.env.AUTH_HOST ?? '127.0.0.1',
  //   port: Number(process.env.AUTH_PORT ?? 3001),
  // },
  name: 'AUTH_SERVICE',
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 3001,
  },
};
