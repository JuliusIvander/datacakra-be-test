import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MedicalMedicine } from './medical-medicine.entity';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32, nullable: false })
  name: string;

  @Column('varchar', { unique: true })
  sku: string;

  @Column('int', { nullable: false })
  price: number;

  @Column('int', { default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(
    () => MedicalMedicine,
    (medicalMedicine) => medicalMedicine.medicine,
  )
  medicalMedicines: MedicalMedicine[];
}
