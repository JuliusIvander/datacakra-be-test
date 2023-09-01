import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ActionService,
  MedicalRecordService,
  MedicineService,
} from './medical-record.service';
import { CreateRecordDto } from './dto/create-medical-record.dto';
import { AuthGuard } from '../auth/auth.guard';
import { APOTEKER, POLI_GIGI_MULUT, POLI_UMUM } from './constant';
import { AuthUser } from '../auth/dto/auth-user';
import { AddMedicineDto } from './dto/add-medicine.dto';
import { updatePatientMedicineDto } from './dto/update-medicine.dto';
import { UpdateRecordDto } from './dto/update-medical-record.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecordPresenter } from './presenter/create-record.presenter';
import { GetRecordPresenter } from './presenter/get-record.presenter';
import { UpdateRecordPresenter } from './presenter/update-record.presenter';
import { CreateMedicinePresenter } from './presenter/create-medicine.presenter';
import { UpdateMedicinePresenter } from './presenter/update-medicine.presenter';
import { DeleteMedicinePresenter } from './presenter/delete-medicine.presenter';

@ApiTags('Medical Record')
@ApiBearerAuth()
@Controller('medical-record')
export class MedicalRecordController {
  constructor(
    private readonly medicalRecordService: MedicalRecordService,
    private readonly actionService: ActionService,
    private readonly medicineService: MedicineService,
  ) {}

  @ApiCreatedResponse({
    description: 'Response when data is successfully created',
    type: CreateRecordPresenter,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  async createRecord(
    @Request() req: AuthUser,
    @Body() recordDto: CreateRecordDto,
  ): Promise<any> {
    const allowedRole = [POLI_GIGI_MULUT, POLI_UMUM];
    if (!allowedRole.includes(req.user.role.name)) {
      throw new ForbiddenException();
    }

    const actions = await this.actionService.findByIds(recordDto.actionIds);
    if (actions.length !== recordDto.actionIds.length) {
      throw new BadRequestException('Some action IDs are not found');
    }

    const data = await this.medicalRecordService.create({
      ...recordDto,
      doctorId: req.user._id,
      actions: actions,
    });
    const extractedAction = data.actions.map((action) => {
      return {
        id: action.id,
        name: action.name,
        price: action.price,
      };
    });

    return {
      id: data.id,
      patientName: data.patientName,
      doctorName: data.doctor.name,
      doctorNotes: data.doctorNotes,
      actions: extractedAction,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  @ApiParam({ name: 'id', description: 'Record Id', example: '1' })
  @ApiOkResponse({
    description: 'Response when data is sent to client',
    type: GetRecordPresenter,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getRecordDetail(@Param('id') id: string) {
    const data = await this.medicalRecordService.findById(parseInt(id));

    const extractedMedicine = data.medicines
      ? data.medicines.map((medicine) => {
          return {
            id: medicine.medicineId,
            name: medicine.medicine.name,
            quantity: medicine.quantity,
            price: medicine.medicine.price,
          };
        })
      : [];
    const extractedAction = data.actions
      ? data.actions.map((action) => {
          return {
            id: action.id,
            name: action.name,
            price: action.price,
          };
        })
      : [];
    const doctorData = data.doctor
      ? {
          id: data.doctorId,
          name: data.doctor.name,
          specialization: data.doctor.role.name,
        }
      : null;
    const pharmacistData = data.pharmacist
      ? {
          id: data.pharmacistId,
          name: data.pharmacist.name,
        }
      : null;

    return {
      id: data.id,
      patientName: data.patientName,
      doctor: doctorData,
      pharmacist: pharmacistData,
      doctorNotes: data.doctorNotes,
      actions: extractedAction,
      medicines: extractedMedicine,
    };
  }

  @ApiParam({ name: 'id', description: 'Record Id', example: '1' })
  @ApiOkResponse({
    description: 'Response where data has successfully updated',
    type: UpdateRecordPresenter,
  })
  @ApiBody({ type: CreateRecordDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateRecord(
    @Request() req: AuthUser,
    @Param('id') id: string,
    @Body() recordDto: UpdateRecordDto,
  ) {
    const record = await this.medicalRecordService.findById(parseInt(id));
    if (!record) {
      throw new NotFoundException('Medical record not found!');
    }

    const allowedRole = [POLI_GIGI_MULUT, POLI_UMUM];
    if (
      !allowedRole.includes(req.user.role.name) &&
      record.doctorId !== req.user._id
    ) {
      throw new ForbiddenException();
    }

    if (recordDto.actionIds) {
      const actions = await this.actionService.findByIds(recordDto.actionIds);
      if (actions.length !== recordDto.actionIds.length) {
        throw new BadRequestException('Some action IDs are not found');
      }
      recordDto.actions = actions;
    }
    await this.medicalRecordService.update(recordDto);
    return {
      message: 'Record successfully updated!',
    };
  }

  @ApiCreatedResponse({
    description: 'Response when data is successfully created',
    type: CreateMedicinePresenter,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post('/medicine')
  async addMedicine(
    @Request() req: AuthUser,
    @Body() medicineDto: AddMedicineDto,
  ) {
    const recordData = await this.medicalRecordService.findById(
      medicineDto.recordId,
    );
    if (!recordData) {
      throw new NotFoundException('Medical record not found!');
    }

    if (
      req.user.role.name !== APOTEKER ||
      (req.user._id !== recordData.pharmacistId &&
        recordData.pharmacistId !== null)
    ) {
      throw new ForbiddenException();
    }

    if (recordData.pharmacistId === null) {
      await this.medicalRecordService.update({ pharmacistId: req.user._id });
    }

    const medicine = await this.medicineService.getMedicineById(
      medicineDto.medicineId,
    );
    if (!medicine) {
      throw new BadRequestException('Medicine not found!');
    }
    if (medicine.stock - medicineDto.quantity < 0) {
      throw new BadRequestException(
        `Medicine with ID ${medicine.id} out of stock!`,
      );
    }

    const isMedicineInputed =
      await this.medicineService.getMedicalMedicineByRecordAndMedicineId(
        medicineDto.recordId,
        medicine.id,
      );
    if (isMedicineInputed) {
      throw new BadRequestException(
        `Medicine with ID ${medicine.id} has been inserted`,
      );
    }

    const data = await this.medicineService.insertPatientMedicine(
      medicineDto.recordId,
      medicine.id,
      medicineDto.quantity,
    );
    return {
      id: data.id,
      recordId: data.medicalRecordId,
      medicine: {
        id: data.medicineId,
        name: data.medicine.name,
        price: data.medicine.price,
        quantity: data.quantity,
      },
    };
  }

  @ApiParam({
    name: 'id',
    description: 'Middleware between medical record and medicine Id',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Response when data is successfully updated',
    type: UpdateMedicinePresenter,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('/medicine/:id')
  async editMedicine(
    @Param('id') medicalId: string,
    @Request() req: AuthUser,
    @Body() medicineDto: updatePatientMedicineDto,
  ) {
    const id = parseInt(medicalId);
    const medicalMedicine =
      await this.medicineService.getMedicalMedicineById(id);
    if (!medicalMedicine) {
      throw new NotFoundException();
    }

    if (
      req.user.role.name !== APOTEKER &&
      req.user._id !== medicalMedicine.medicalRecord.pharmacistId
    ) {
      throw new ForbiddenException();
    }

    const medicineDetail = medicalMedicine.medicine;
    if (medicineDetail.stock - medicineDto.quantity < 0) {
      throw new BadRequestException(
        `Medicine with ID ${medicineDetail.id} out of stock!`,
      );
    }

    await this.medicineService.updatePatientMedicine(id, medicineDto.quantity);
    return {
      message: 'Medicine successfully updated!',
    };
  }

  @ApiParam({
    name: 'id',
    description: 'Middleware between medical record and medicine Id',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Response when data is successfully removed',
    type: DeleteMedicinePresenter,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('/medicine/:id')
  async deleteMedicine(
    @Param('id') medicalId: string,
    @Request() req: AuthUser,
  ): Promise<any> {
    const id = parseInt(medicalId);
    const medicalMedicine =
      await this.medicineService.getMedicalMedicineById(id);
    if (!medicalMedicine) {
      throw new NotFoundException();
    }

    if (
      req.user.role.name !== APOTEKER &&
      req.user._id !== medicalMedicine.medicalRecord.pharmacistId
    ) {
      throw new ForbiddenException();
    }

    await this.medicineService.removePatientMedicine(id);
    return {
      message: 'Medicine successfully removed!',
    };
  }
}
