import { Controller, Get, Body, Put, Param, Delete, UseGuards, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { JwtSessionGuard } from '../auth/guards/jwt-auth.guard';
import { EmployeeDto } from './dtos/employee.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UserRole } from 'src/entities/user.entity';

@Controller('employee')
@Serialize(EmployeeDto)
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  @UseGuards(JwtSessionGuard)
  findAll() {
    return this.employeeService.findAll();
  }

  @Post()
  @UseGuards(JwtSessionGuard)
  create(@Body() body: CreateEmployeeDto) {
    return this.employeeService.create(body);
  }

  @Get(':id')
  @UseGuards(JwtSessionGuard)
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSessionGuard)
  update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    return this.employeeService.update(+id, { ...body, role: UserRole.PORTEIRO });
  }

  @Delete(':id')
  @UseGuards(JwtSessionGuard)
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
