import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IEmployee } from '../interfaces/employees.interface';

export class Employee implements IEmployee {
  @IsUUID()
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly middleName: string;
  @IsString()
  @IsNotEmpty()
  readonly surName: string;
}
