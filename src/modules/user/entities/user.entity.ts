import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { MedicalRecord } from '../../../modules/medical-record/entities/medical-record.entity';
import { Transaction } from '../../../modules/transaction/entities/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32, nullable: false })
  name: string;

  @Column('varchar', { length: 32, nullable: false, unique: true })
  username: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column('number', { nullable: false })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.doctor)
  doctorRecords: MedicalRecord[];

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.pharmacist)
  pharmacistRecords: MedicalRecord[];

  @OneToMany(() => Transaction, (transaction) => transaction.admin)
  transactions: Transaction[];
}
