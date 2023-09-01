import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { PAYMENT_METHOD, PAYMENT_STATUS } from '../constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Name that responsible on the transaction',
    example: 'Asep',
  })
  @IsNotEmpty()
  recipientName: string;

  @ApiProperty({
    description: 'Transaction payment method',
    example: 'INSURANCE',
  })
  @IsNotEmpty()
  @IsIn(PAYMENT_METHOD)
  paymentMethod: string;

  @ApiProperty({
    description: 'Transaction payment status',
    example: 'PENDING',
  })
  @IsNotEmpty()
  @IsIn(PAYMENT_STATUS)
  paymentStatus: string;

  @ApiProperty({
    description: 'Medical record id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  adminId: number;
  paymentBill: number;
}
