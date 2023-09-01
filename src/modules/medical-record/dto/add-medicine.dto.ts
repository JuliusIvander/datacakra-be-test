import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddMedicineDto {
  @ApiProperty({
    description: 'Medical record id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @ApiProperty({
    description: 'Medicine id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  medicineId: number;

  @ApiProperty({
    description: 'Number of medicine needed for the patient',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
