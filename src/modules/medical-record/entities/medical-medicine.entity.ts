import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MedicalRecord } from './medical-record.entity';
import { Medicine } from './medicine.entity';

@Entity()
export class MedicalMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  medicalRecordId: number;

  @Column('int', { nullable: false })
  medicineId: number;

  @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.medicines)
  medicalRecord: MedicalRecord;

  @ManyToOne(() => Medicine, (medicine) => medicine.medicalMedicines)
  medicine: Medicine;

  @Column('int', { nullable: false })
  quantity: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
