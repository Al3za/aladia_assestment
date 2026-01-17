import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      // rate limit middleware
      { name: 'default', ttl: 60_000, limit: 10 },
      { name: 'auth', ttl: 60_000, limit: 5 },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [ThrottlerModule], // se altri moduli vogliono usarlo
})
export class rateLimitModule {}
