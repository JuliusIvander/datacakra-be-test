import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-medical-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { In, Repository } from 'typeorm';
import { Action } from './entities/action.entity';
import { Medicine } from './entities/medicine.entity';
import { MedicalMedicine } from './entities/medical-medicine.entity';
import { UpdateRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}

  findByIds(ids: number[]): Promise<Action[] | undefined> {
    return this.actionRepository.findBy({ id: In(ids) });
  }
}

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
  ) {}

  async create(
    recordDto: CreateRecordDto & { doctorId: number; actions: Action[] },
  ): Promise<MedicalRecord> {
    const record = new MedicalRecord();
    record.patientName = recordDto.patientName;
    record.doctorNotes = recordDto.doctorNotes;
    record.doctorId = recordDto.doctorId;
    record.actions = recordDto.actions;

    const result = await this.medicalRecordRepository.save(record);
    return this.findById(result.id);
  }

  async update(recordDto: UpdateRecordDto): Promise<MedicalRecord> {
    const record = await this.medicalRecordRepository.findOneBy({
      id: recordDto.id,
    });
    const updatedData = {
      ...record,
      ...recordDto,
    };

    return this.medicalRecordRepository.save(updatedData);
  }

  findById(id: number): Promise<MedicalRecord> {
    return this.medicalRecordRepository.findOne({
      where: { id },
      relations: {
        actions: true,
        medicines: {
          medicine: true,
        },
        doctor: {
          role: true,
        },
        pharmacist: {
          role: true,
        },
      },
    });
  }
}

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    @InjectRepository(MedicalMedicine)
    private readonly medicalMedicineRepository: Repository<MedicalMedicine>,
  ) {}

  getMedicineById(id: number): Promise<Medicine> {
    return this.medicineRepository.findOneBy({ id });
  }

  async insertPatientMedicine(
    recordId: number,
    medicineId: number,
    quantity: number,
  ): Promise<MedicalMedicine> {
    const medicalMedicine = new MedicalMedicine();
    medicalMedicine.medicalRecordId = recordId;
    medicalMedicine.medicineId = medicineId;
    medicalMedicine.quantity = quantity;

    const result = await this.medicalMedicineRepository.save(medicalMedicine);
    return this.getMedicalMedicineById(result.id);
  }

  updatePatientMedicine(
    id: number,
    quantity: number,
  ): Promise<MedicalMedicine> {
    return this.medicalMedicineRepository.save({ id, quantity });
  }

  removePatientMedicine(id: number) {
    return this.medicalMedicineRepository.delete({ id });
  }

  async updateStorageMedicine(id: number, stock: number) {
    const medicineData = await this.getMedicineById(id);
    const newStock = medicineData.stock - stock;

    return this.medicineRepository.save({ id, stock: newStock });
  }

  getMedicalMedicineByRecordAndMedicineId(
    recordId: number,
    medicineId: number,
  ): Promise<MedicalMedicine> {
    return this.medicalMedicineRepository.findOneBy({
      medicalRecordId: recordId,
      medicineId,
    });
  }

  getMedicalMedicineById(id: number): Promise<MedicalMedicine> {
    return this.medicalMedicineRepository.findOne({
      where: { id },
      relations: ['medicine', 'medicalRecord'],
    });
  }
}
