import { StringValue } from 'ms';

// export const jwtConfig = {
//   //   secret: process.env.JWT_SECRET || 'super-secret-key',
//   //   expiresIn: '1h',
// //   secret: process.env.JWT_SECRET || 'super-secret-key',
// //   expiresIn: 3600, // "1h"
// //   //signOptions: { expiresIn: '1h' },

// };

export const jwtConfig: {
  secret: string;
  expiresIn: StringValue | number;
} = {
  secret: process.env.JWT_SECRET || 'super-secret-key',
  expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || '1h',
};
