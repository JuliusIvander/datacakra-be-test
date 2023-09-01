import { Module } from '@nestjs/common';
import {
  ActionService,
  MedicalRecordService,
  MedicineService,
} from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { Action } from './entities/action.entity';
import { UserModule } from '../user/user.module';
import { Medicine } from './entities/medicine.entity';
import { MedicalMedicine } from './entities/medical-medicine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalRecord,
      Action,
      Medicine,
      MedicalMedicine,
    ]),
    UserModule,
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService, ActionService, MedicineService],
  exports: [MedicineService, MedicalRecordService],
})
export class MedicalRecordModule {}
