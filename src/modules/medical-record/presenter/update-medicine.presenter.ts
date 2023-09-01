import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicinePresenter {
  @ApiProperty({
    description: 'message',
    example: 'Medicine successfully updated!',
  })
  message: string;
}
