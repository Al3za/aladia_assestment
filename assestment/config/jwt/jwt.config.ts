// import { StringValue } from 'ms';

// export const jwtConfig = {
//   //   secret: process.env.JWT_SECRET || 'super-secret-key',
//   //   expiresIn: '1h',
//   // secret: process.env.JWT_SECRET || 'super-secret-key',
//   // expiresIn: 3600, // "1h"
//   // signOptions: { expiresIn: '1h' },
//   secret: process.env.JWT_SECRET || 'super-secret-key',
//   expiresIn: process.env.JWT_EXPIRES_IN as StringValue, // || '1h',
// };

// console.log(jwtConfig.secret, 'here');
// export const jwtConfig: {
//   secret: string;
//   expiresIn: StringValue | number;
// } = {
//   secret: process.env.JWT_SECRET //|| 'super-secret-key',
//   expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || '1h',
// };

import { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET')!, // sicuro perché throw se undefined
  expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN') || '1h',
});
