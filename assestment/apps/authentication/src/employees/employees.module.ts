import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { CoreModule } from 'core/core.module';

@Module({
  imports: [CoreModule], // in CoreModule configuriamo JWT e' lo usiamo coremodule per poter fare il sign del token una volta che l'utente si e' registrato
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
