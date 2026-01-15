import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseService } from './database/database.service.js';
import { DatabaseModule } from './database/database.module.js';
import { EmployeesModule } from './employees/employees.module.js';

// the main module of our app
@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule], // adds automaticaly here when we craete a new module, to have relation
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
