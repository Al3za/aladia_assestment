import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; //'../generated/client'; //'@prisma/client'; il nostro db client

// here we define the connection with prisma db
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$connect(); // await the connection to prisma
  }
}
