import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { JwtSessionGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateVisitDto } from './dtos/create-visit.dto';
import { UpdateVisitDto } from './dtos/update-visit.dto';

@Controller('visit')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @UseGuards(JwtSessionGuard)
  async create(@Body() body: CreateVisitDto) {
    return await this.visitsService.create(body);
  }

  @Get()
  @UseGuards(JwtSessionGuard)
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtSessionGuard)
  findOne(@Param('id') id: string) {
    return this.visitsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSessionGuard)
  update(@Param('id') id: string, @Body() body: UpdateVisitDto) {
    return this.visitsService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(JwtSessionGuard)
  remove(@Param('id') id: string) {
    return this.visitsService.remove(+id);
  }
}
