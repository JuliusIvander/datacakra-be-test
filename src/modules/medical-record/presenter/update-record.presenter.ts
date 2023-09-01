import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecordPresenter {
  @ApiProperty({
    description: 'message',
    example: 'Record successfully updated!',
  })
  message: string;
}
