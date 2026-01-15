import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EmployeesModule, DatabaseModule],
})
export class AuthenticationModule {}
