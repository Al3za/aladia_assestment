import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: [
    // domains allowed listed here. Store it in .env in production
    'http://localhost:5173', // frontend dev
    'https://myapp.com', // production
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Authorization necessary for JWT
  credentials: true, // if using cookie / auth
};
