import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEmployee } from '../interfaces/employee.interface';

@Entity()
export class Employee implements IEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  curp: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  middleName: string;
  @Column({ nullable: false })
  surName: string;
  @Column({ unique: true, nullable: true })
  phoneNumber: string;
  @Column({ unique: true, nullable: true })
  email: string;
}
