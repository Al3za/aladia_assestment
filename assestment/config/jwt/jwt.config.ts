import { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET')!, // get JWT_SECRET data from .env
  expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN') || '1h',
});

// This configuration with ConfigService module make sure that .env.secret and .env.expiresIn data are loaded(non undefined), before import this file in jwt.strategy.
// ""ConfigService make process.env values fully loaded at import-time, avoiding problem like process.env.JWT_SECRET = udefined"
// "thats why you can get errors with classic process.env.JWT_SECRET "

// export const jwtConfig = {
//   secret: process.env.JWT_SECRET, (process.env.JWT_SECRET = undefined because without ConfigService, Node imports this file to jwt.strategy before .env.secret is loaded, risulting in an error at runtime in jwt.strategy file )
// };

// jwtConfigFactory can be seen as a function:
// export jwtConfigFactory f(x) {
//   return x + 1;
// }

// that contains the secret and expiresIn values

// in jwt.strategy.ts file we call this value and get the data in secretOrKey property secretOrKey:
