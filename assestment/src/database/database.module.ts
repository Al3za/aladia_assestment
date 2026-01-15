import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

// here is the module that define the providers where we do the connection to the db

@Global() // 🔥 very important. Without it, DatabaseService exist but is not reacheble in EmployeeModule, and so the db connection within EmployService fails
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
