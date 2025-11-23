import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private employeesRepo: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeesRepo.find();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Could not get all employees');
    }
  }

  async findOneById(id: string): Promise<Employee> {
    try {
      const employee = await this.employeesRepo.findOneBy({ id });
      if (!employee) {
        throw new NotFoundException(`Employee ${id} not found`);
      }

      return employee;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Could not get employee');
    }
  }

  async create(dto: CreateEmployeeDto) {
    try {
      const employee = this.employeesRepo.create(dto);
      return await this.employeesRepo.save(employee);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Could not create employee');
    }
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeesRepo.preload({ id, ...dto });
      if (!employee) {
        throw new NotFoundException(`Employee ${id} not found`);
      }
      return await this.employeesRepo.save(employee);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Could not update employee');
    }
  }

  async delete(id: string) {
    try {
      const employee = await this.employeesRepo.findOneBy({ id });
      if (!employee) {
        throw new NotFoundException(`Employee ${id} not found`);
      }
      return await this.employeesRepo.remove(employee);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Could not delete employee');
    }
  }
}
