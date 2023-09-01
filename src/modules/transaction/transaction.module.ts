import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { MedicalRecordModule } from '../medical-record/medical-record.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), MedicalRecordModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
