import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { UpdateVisitorDto } from './dtos/update-visitor.dto';
import { VisitorsService } from './visitors.service';
import { Body, Controller, Delete, Get, Param, Put, Post, UseGuards } from '@nestjs/common';
import { VisitorDto } from './dtos/visitor.dto';
import { JwtSessionGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('visitor')
@Serialize(VisitorDto)
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  @UseGuards(JwtSessionGuard)
  async create(@Body() body: CreateVisitorDto) {
    const visitor = await this.visitorsService.create(
      body.name,
      body.cellphone,
      body.cpf,
    );

    return visitor;
  }

  @Get()
  @UseGuards(JwtSessionGuard)
  findAll() {
    return this.visitorsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtSessionGuard)
  findOne(@Param('id') id: string) {
    return this.visitorsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSessionGuard)
  update(@Param('id') id: string, @Body() body: UpdateVisitorDto) {
    return this.visitorsService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(JwtSessionGuard)
  remove(@Param('id') id: string) {
    return this.visitorsService.remove(+id);
  }
}
