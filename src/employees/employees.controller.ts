import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dtos/employees.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
@UsePipes(ValidationPipe)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  getEmployee(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOneById(id);
  }

  @Post()
  postEmployee(@Body() data: CreateEmployeeDto) {
    this.employeesService.create(data);
  }

  @Patch(':id')
  patchEmployee(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateEmployeeDto,
  ) {
    data.id = id;
    this.employeesService.update(data);
  }

  @Delete(':id')
  deleteEmployee(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.employeesService.delete(id);
  }
}
