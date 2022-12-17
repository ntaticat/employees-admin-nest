import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeesService, IEmployee } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  getEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOneById(id);
  }

  @Post()
  postEmployee(@Body() data: IEmployee) {
    this.employeesService.create(data);
  }

  @Patch(':id')
  patchEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<IEmployee>,
  ) {
    data.id = id;
    this.employeesService.update(data);
  }

  @Delete(':id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    this.employeesService.delete(id);
  }
}
