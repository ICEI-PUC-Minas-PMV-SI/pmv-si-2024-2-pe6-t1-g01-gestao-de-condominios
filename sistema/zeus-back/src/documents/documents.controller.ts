import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtSessionGuard } from 'src/auth/guards/jwt-auth.guard';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('document')
export class DocumentsController {
  constructor(private readonly documentService: DocumentsService) {}

  @Get()
  @UseGuards(JwtSessionGuard)
  findAll() {
    return this.documentService.findAll();
  }

  @Post()
  @UseGuards(JwtSessionGuard)
  create(@Body() body: CreateDocumentDto, @Req() req: Request) {
    const currentUser = req.user as User;
    return this.documentService.create(body, currentUser);
  }

  @Get(':id')
  @UseGuards(JwtSessionGuard)
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSessionGuard)
  update(@Param('id') id: string, @Body() body: UpdateDocumentDto) {
    return this.documentService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(JwtSessionGuard)
  remove(@Param('id') id: string) {
    return this.documentService.remove(+id);
  }
}
