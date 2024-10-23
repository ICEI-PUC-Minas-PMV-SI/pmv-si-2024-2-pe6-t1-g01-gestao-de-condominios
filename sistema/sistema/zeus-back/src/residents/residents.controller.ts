import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { UpdateResidentDto } from './dtos/update-resident.dto';
import { JwtSessionGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResidentDto } from './dtos/resident.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateResidentDto } from './dtos/create-resident.dto';

@Controller('resident')
@Serialize(ResidentDto)
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Get()
  @UseGuards(JwtSessionGuard)
  findAll() {
    return this.residentsService.findAll();
  }

  @Post()
  @UseGuards(JwtSessionGuard)
  create(@Body() body: CreateResidentDto) {
    return this.residentsService.create(body);
  }

  @Get(':id')
  @UseGuards(JwtSessionGuard)
  findOne(@Param('id') id: string) {
    return this.residentsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSessionGuard)
  update(@Param('id') id: string, @Body() body: UpdateResidentDto) {
    return this.residentsService.update(+id, { ...body, role: 'MORADOR' });
  }

  @Delete(':id')
  @UseGuards(JwtSessionGuard)
  remove(@Param('id') id: string) {
    return this.residentsService.remove(+id);
  }
}
