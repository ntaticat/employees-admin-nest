import { PartialType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class UpdateEmployeeDto extends PartialType(Employee) {}
