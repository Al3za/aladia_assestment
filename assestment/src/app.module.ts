import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
// import { DatabaseModule } from './database/database.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';

// the main module of our app
@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule], // adds automaticaly here when we craete a new module, to have relation
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
