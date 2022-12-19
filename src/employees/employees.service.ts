import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEmployee } from './interfaces/employees.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeesService {
  private EMPLOYEES: IEmployee[] = [
    {
      id: uuid(),
      name: 'Rafael',
      middleName: 'Estrada',
      surName: 'Piñon',
    },
    {
      id: uuid(),
      name: 'Juan',
      middleName: 'Estrada',
      surName: 'Piñon',
    },
    {
      id: uuid(),
      name: 'Pedro',
      middleName: 'Estrada',
      surName: 'Piñon',
    },
  ];

  findAll(): IEmployee[] {
    return this.EMPLOYEES;
  }

  findOneById(id: string): IEmployee {
    const foundEmployeeIndex = this.EMPLOYEES.findIndex(
      (employee) => employee.id === id,
    );

    if (foundEmployeeIndex === -1) {
      throw new NotFoundException(`Employee with id ${id} was not found`);
    }

    return this.EMPLOYEES[foundEmployeeIndex];
  }

  create(employee: IEmployee): void {
    const newEmployee: IEmployee = {
      ...employee,
      id: uuid(),
    };

    this.EMPLOYEES.push(newEmployee);
  }

  update(id: string, employee: Partial<IEmployee>): void {
    if (employee.id && employee.id !== id) {
      throw new BadRequestException(
        `Employee id does not match the http request id`,
      );
    }

    const foundEmployeeIndex = this.EMPLOYEES.findIndex(
      (employee) => employee.id === id,
    );

    if (foundEmployeeIndex === -1) {
      throw new NotFoundException(
        `Employee with id ${id} was not found and couldn't update it`,
      );
    }

    const employeeUpdated = {
      ...this.EMPLOYEES[foundEmployeeIndex],
      ...employee,
      id,
    };

    this.EMPLOYEES[foundEmployeeIndex] = employeeUpdated;
  }

  delete(id: string): void {
    const foundEmployeeIndex = this.EMPLOYEES.findIndex(
      (employee) => employee.id === id,
    );
    if (foundEmployeeIndex === -1) {
      throw new NotFoundException(
        `Employee with id ${id} was not found and couldn't delete it`,
      );
    }

    this.EMPLOYEES.splice(foundEmployeeIndex, 1);
  }
}
