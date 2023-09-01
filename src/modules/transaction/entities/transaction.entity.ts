import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PAYMENT_STATUS, PAYMENT_METHOD } from '../constant';
import { User } from '../../../modules/user/entities/user.entity';
import { MedicalRecord } from '../../..//modules/medical-record/entities/medical-record.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction {
  @ApiProperty({ description: 'Transaction id', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Recipient name', example: 'Asep' })
  @Column('varchar', { length: 32, nullable: false })
  recipientName: string;

  @ApiProperty({
    description: 'Transaction payment status',
    example: 'PENDING',
  })
  @Column('enum', { enum: PAYMENT_STATUS, default: 'PENDING' })
  paymentStatus: string;

  @ApiProperty({
    description: 'Transaction payment method',
    example: 'INSURANCE',
  })
  @Column('enum', { enum: PAYMENT_METHOD })
  paymentMethod: string;

  @ApiProperty({
    description: 'Amount of money that need to be paid by the recipient',
    example: 10102,
  })
  @Column('int', { nullable: false })
  paymentBill: number;

  @ApiProperty({ description: 'Admin id', example: 1 })
  @Column('int', { nullable: false })
  adminId: number;

  @ManyToOne(() => User, (user) => user.transactions)
  admin: User;

  @ApiProperty({
    description: 'Transaction created datetime',
    example: '2023-09-01T09:21:04.356Z',
  })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({
    description: 'Transaction update datetime',
    example: '2023-09-01T09:21:04.356Z',
  })
  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(() => MedicalRecord)
  @JoinColumn()
  record: MedicalRecord;

  @ApiProperty({ description: 'Medical record id', example: 1 })
  @Column('int', { nullable: false })
  recordId: number;
}
