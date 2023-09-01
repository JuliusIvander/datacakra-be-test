import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionPresenter {
  @ApiProperty({
    description: 'message',
    example: 'Transaction successfully updated!',
  })
  message: string;
}
