import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Action } from './action.entity';
import { MedicalMedicine } from './medical-medicine.entity';
import { User } from '../../../modules/user/entities/user.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32, nullable: false })
  patientName: string;

  @Column('int', { nullable: false })
  doctorId: number;

  @Column('text', { nullable: true })
  doctorNotes: string;

  @Column('int', { nullable: true })
  pharmacistId: number;

  @ManyToMany(() => Action, { cascade: true })
  @JoinTable()
  actions: Action[];

  @OneToMany(
    () => MedicalMedicine,
    (medicalMedicine) => medicalMedicine.medicalRecord,
  )
  medicines: MedicalMedicine[];

  @ManyToOne(() => User, (user) => user.doctorRecords)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @ManyToOne(() => User, (user) => user.pharmacistRecords)
  @JoinColumn({ name: 'pharmacistId' })
  pharmacist: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
