import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IEmployee } from '../interfaces/employees.interface';

export class EmployeeDto implements IEmployee {
  @IsUUID()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  middleName: string;
  @IsString()
  @IsNotEmpty()
  surName: string;
}

export class CreateEmployeeDto extends OmitType(EmployeeDto, ['id'] as const) {}

export class UpdateEmployeeDto extends PartialType(EmployeeDto) {}
