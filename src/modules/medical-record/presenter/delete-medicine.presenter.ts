import { ApiProperty } from '@nestjs/swagger';

export class DeleteMedicinePresenter {
  @ApiProperty({
    description: 'message',
    example: 'Medicine successfully removed!',
  })
  message: string;
}
