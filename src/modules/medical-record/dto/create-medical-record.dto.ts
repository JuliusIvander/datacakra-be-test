import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateRecordDto {
  @ApiProperty({
    description: 'Patient name',
    example: 'Sumarto',
  })
  @IsNotEmpty()
  @MaxLength(32)
  patientName: string;

  @ApiProperty({
    description: 'Doctor notes that will be read by pharmacist',
    example: 'Obat penyembuh luka yang bagus yak',
  })
  @IsNotEmpty()
  doctorNotes: string;

  @ApiProperty({
    description: 'Doctor action on handling the patient in form of action ids',
    example: [1],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  actionIds: number[];
}
