import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtSessionGuard } from 'src/auth/guards/jwt-auth.guard';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { DocumentDto } from './dtos/document.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('document')
@Serialize(DocumentDto)
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly minioService: MinioService
  ) {}

  @Get()
  @UseGuards(JwtSessionGuard)
  findAll() {
    return this.documentsService.findAll();
  }

  @Post()
  @UseGuards(JwtSessionGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateDocumentDto,
    @Req() req: Request
  ) {
    const currentUser = req.user as User;

    return this.documentsService.create(body, file, currentUser);
  }

  @Get(':id')
  @UseGuards(JwtSessionGuard)
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSessionGuard)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateDocumentDto,
    @Req() req: Request
  ) {
    const currentUser = req.user as User;

    return this.documentsService.update(+id, body, file, currentUser);
  }

  @Delete(':id')
  @UseGuards(JwtSessionGuard)
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}
