import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UuidValidationPipe } from 'src/common/pipes/uuid-validation/uuid-validation.pipe';

@ApiTags('employees')
@Controller('employees')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener empleados' })
  @ApiResponse({ status: 200, description: 'Lista de empleados' })
  getEmployees() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un empleado por id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Empleado encontrado',
    schema: {
      example: {
        id: 'a7caaf56-23ff-48b8-b30c-3f3c2ef3ee8a',
        curp: 'ABCD010101XMXEFXXX',
        name: 'Juan',
        middleName: 'Perez',
        surName: 'Rodriguez',
        phoneNumber: '+525555555555',
        email: 'juan@perez.com',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  getEmployee(@Param('id', UuidValidationPipe) id: string) {
    return this.employeesService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar empleado' })
  @ApiBody({
    description: 'Employee payload',
    examples: {
      default: {
        summary: 'Example of employee',
        value: {
          curp: 'ABCD010101XMXEFXXX',
          name: 'Juan',
          middleName: 'Perez',
          surName: 'Rodriguez',
          phoneNumber: '+525555555555',
          email: 'juan@perez.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Empleado creado',
    schema: {
      example: {
        id: 'a7caaf56-23ff-48b8-b30c-3f3c2ef3ee8a',
        curp: 'ABCD010101XMXEFXXX',
        name: 'Juan',
        middleName: 'Perez',
        surName: 'Rodriguez',
        phoneNumber: '+525555555555',
        email: 'juan@perez.com',
      },
    },
  })
  postEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar empleado' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Empleado actualizado' })
  patchEmployee(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'eliminar empleado' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Empleado eliminado' })
  deleteEmployee(@Param('id', UuidValidationPipe) id: string) {
    return this.employeesService.delete(id);
  }
}
