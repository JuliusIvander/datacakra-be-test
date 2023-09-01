import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicinePresenter {
  @ApiProperty({
    description: 'The middleman between medical record and medicine data',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Medical record id',
    example: 1,
  })
  recordId: number;

  @ApiProperty({
    description: 'medicine data',
    example: {
      id: 1,
      name: 'Rustic Bronze Keyboard',
      price: 3618,
      quantity: 2,
    },
  })
  medicine: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
}
