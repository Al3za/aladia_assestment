import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { CoreModule } from 'core/core.module';

@Module({
  // imports: [
  //   JwtModule.register({
  //     // JwtModule.register Serve a configurare globalmente il JwtService
  //     // Quando qualcuno usa JwtService, usa QUESTO secret e QUESTE opzioni di default”
  //     secret: process.env.JWT_SECRET || 'super-secret-key',
  //     signOptions: { expiresIn: '1h' },
  //   }),
  // ],
  imports: [CoreModule], // in  CoreModule configuriamo JWT e' lo usiamo coremodule per poter fare il sign del token una volta che l'utente si e' registrato
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
