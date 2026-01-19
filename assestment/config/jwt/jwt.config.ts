import { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET')!, // sicuro perché throw se undefined
  expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN') || '1h',
});
