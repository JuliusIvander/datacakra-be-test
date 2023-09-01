import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class updatePatientMedicineDto {
  @ApiProperty({
    description: `
    Number of medicine needed for the patient
    Note: This API can only change the quantity of the medicine, use delete then add to change medicine id
    `,
    example: 7,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  medicalId: number;
}
