import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service.js';

// here is the module that define the providers where we do the connection to the db
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
