import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  create(transactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.recipientName = transactionDto.recipientName;
    transaction.paymentBill = transactionDto.paymentBill;
    transaction.adminId = transactionDto.adminId;
    transaction.recordId = transactionDto.recordId;
    transaction.paymentMethod = transactionDto.paymentMethod;
    transaction.paymentStatus = transactionDto.paymentStatus;

    return this.transactionRepository.save(transaction);
  }

  update(
    transactionDto: UpdateTransactionDto & { id: number },
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.findOneBy({
      id: transactionDto.id,
    });
    const updatedData = {
      ...transaction,
      ...transactionDto,
    };

    return this.transactionRepository.save(updatedData);
  }

  findOneById(id: number): Promise<Transaction> {
    return this.transactionRepository.findOne({
      where: { id },
      relations: {
        admin: true,
        record: {
          medicines: {
            medicine: true,
          },
          doctor: {
            role: true,
          },
          pharmacist: {
            role: true,
          },
          actions: true,
        },
      },
    });
  }

  findByRecordId(recordId: number): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ recordId });
  }
}
