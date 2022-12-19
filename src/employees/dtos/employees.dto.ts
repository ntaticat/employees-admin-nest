import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IEmployee } from '../interfaces/employees.interface';

export class EmployeeDto implements IEmployee {
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

export class CreateEmployeeDto extends OmitType(EmployeeDto, ['id'] as const) {}

export class UpdateEmployeeDto extends PartialType(EmployeeDto) {}
