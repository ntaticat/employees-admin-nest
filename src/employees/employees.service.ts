import { Injectable, NotFoundException } from '@nestjs/common';

export interface IEmployee {
  id: number;
  name: string;
}

@Injectable()
export class EmployeesService {
  private EMPLOYEES: IEmployee[] = [
    {
      id: 1,
      name: 'Rafael',
    },
    {
      id: 2,
      name: 'Juan',
    },
    {
      id: 3,
      name: 'Pedro',
    },
  ];

  findAll(): IEmployee[] {
    return this.EMPLOYEES;
  }

  findOneById(id: number): IEmployee {
    const foundEmployeeIndex = this.EMPLOYEES.findIndex(
      (employee) => employee.id === id,
    );

    if (foundEmployeeIndex === -1) {
      throw new NotFoundException(`Employee with id ${id} was not found`);
    }

    return this.EMPLOYEES[foundEmployeeIndex];
  }

  create(employee: IEmployee): void {
    this.EMPLOYEES.push(employee);
  }

  update(employee: Partial<IEmployee>) {
    const employeeId = employee.id;

    const foundEmployeeIndex = this.EMPLOYEES.findIndex(
      (employee) => employee.id === employeeId,
    );

    if (foundEmployeeIndex === -1) {
      throw new NotFoundException(
        `Employee with id ${employeeId} was not found and couldn't update it`,
      );
    }

    const employeeUpdated = {
      ...this.EMPLOYEES[foundEmployeeIndex],
      ...employee,
    };

    this.EMPLOYEES[foundEmployeeIndex] = employeeUpdated;
  }

  delete(id: number): void {
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
