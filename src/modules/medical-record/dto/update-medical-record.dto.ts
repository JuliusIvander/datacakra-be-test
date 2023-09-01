import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordDto } from './create-medical-record.dto';
import { Action } from '../entities/action.entity';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {
  id?: number;
  doctorId?: number;
  pharmacistId?: number;
  actions?: Action[];
}
