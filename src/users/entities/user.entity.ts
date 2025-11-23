import { IUser } from '../interfaces/user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: false, nullable: false })
  username: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
}
