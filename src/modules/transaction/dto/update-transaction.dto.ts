import { IsIn, IsString, ValidateIf } from 'class-validator';
import { PAYMENT_METHOD, PAYMENT_STATUS } from '../constant';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto {
  @ApiProperty({
    description: 'Name that responsible on the transaction',
    example: 'Asep',
  })
  @IsString()
  @ValidateIf((_object, value) => value !== undefined)
  recipientName?: string;

  @ApiProperty({
    description: 'Transaction payment method',
    example: 'INSURANCE',
  })
  @IsIn(PAYMENT_METHOD)
  @ValidateIf((_object, value) => value !== undefined)
  paymentMethod?: string;

  @ApiProperty({
    description: 'Transaction payment status',
    example: 'COMPLETE',
  })
  @IsIn(PAYMENT_STATUS)
  @ValidateIf((_object, value) => value !== undefined)
  paymentStatus?: string;
}
