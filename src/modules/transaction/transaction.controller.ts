import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  HttpStatus,
  HttpCode,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/dto/auth-user';
import { ADMIN } from '../medical-record/constant';
import {
  MedicalRecordService,
  MedicineService,
} from '../medical-record/medical-record.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetTransactionPresenter } from './presenter/get-transaction.presenter';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionPresenter } from './presenter/update-transaction.presenter';

@ApiBearerAuth()
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly medicineService: MedicineService,
    private readonly medicalRecordService: MedicalRecordService,
  ) {}

  @ApiParam({ name: 'id', description: 'Transaction Id', example: '1' })
  @ApiOkResponse({
    description: 'Response when data is sent to client',
    type: GetTransactionPresenter,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getTransactionDetail(
    @Param('id') id: string,
    @Request() req: AuthUser,
  ): Promise<any> {
    if (req.user.role.name !== ADMIN) {
      throw new ForbiddenException();
    }

    const data = await this.transactionService.findOneById(parseInt(id));
    if (!data) {
      throw new NotFoundException();
    }

    return {
      id: data.id,
      admin: data.admin
        ? {
            id: data.adminId,
            name: data.admin.name,
          }
        : null,
      recipientName: data.recipientName,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      paymentBill: data.paymentBill,
      issueAt: data.createdAt,
      medicalDetail: data.record
        ? {
            patientName: data.record.patientName,
            doctor: {
              name: data.record.doctor.name,
              specialization: data.record.doctor.role.name,
            },
            pharmacist: {
              name: data.record.pharmacist.name,
            },
            doctorActions: data.record.actions.map((action) => {
              return {
                name: action.name,
                price: action.price,
              };
            }),
            medicines: data.record.medicines.map((medicine) => {
              return {
                name: medicine.medicine.name,
                quantity: medicine.quantity,
                price: medicine.medicine.price,
              };
            }),
          }
        : {},
    };
  }

  @ApiCreatedResponse({
    description: 'Response when data is successfully created',
    type: Transaction,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  async createTransaction(
    @Body() transactionDto: CreateTransactionDto,
    @Request() req: AuthUser,
  ): Promise<any> {
    if (req.user.role.name !== ADMIN) {
      throw new ForbiddenException();
    }

    const transactionData = await this.transactionService.findByRecordId(
      transactionDto.recordId,
    );
    if (transactionData) {
      throw new BadRequestException('Transaction has been occured');
    }

    const record = await this.medicalRecordService.findById(
      transactionDto.recordId,
    );
    if (!record) {
      throw new NotFoundException('Medical record not found!');
    }

    const medicines = record.medicines;
    for (let i = 0; i < record.medicines.length; i++) {
      if (medicines[i].medicine.stock - medicines[i].quantity < 0) {
        throw new BadRequestException(
          `Medicine with ID ${medicines[0].medicineId} is out of stock. Please update your medicine data`,
        );
      }
    }
    medicines.forEach(async (medicine) => {
      const updatedStock = medicine.medicine.stock - medicine.quantity;
      await this.medicineService.updateStorageMedicine(
        medicine.medicineId,
        updatedStock,
      );
    });

    let paymentBill = 0;
    record.actions.forEach((action) => {
      paymentBill += action.price;
    });
    record.medicines.forEach(
      (medicine) =>
        (paymentBill += medicine.quantity * medicine.medicine.price),
    );

    return this.transactionService.create({
      ...transactionDto,
      paymentBill,
      adminId: req.user._id,
    });
  }

  @ApiParam({ name: 'id', description: 'Transaction Id', example: '1' })
  @ApiOkResponse({
    description: 'Response when transaction successfully updated',
    type: UpdateTransactionPresenter,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateTransaction(
    @Body() transactionDto: UpdateTransactionDto,
    @Request() req: AuthUser,
    @Param('id') id: string,
  ) {
    const transaction = await this.transactionService.findOneById(parseInt(id));
    if (!transaction) {
      throw new BadRequestException('Transaction not found!');
    }

    if (transaction.adminId !== req.user._id || req.user.role.name !== ADMIN) {
      throw new ForbiddenException();
    }

    await this.transactionService.update({
      ...transactionDto,
      id: parseInt(id),
    });

    return {
      message: 'Transaction successfully updated!',
    };
  }
}
