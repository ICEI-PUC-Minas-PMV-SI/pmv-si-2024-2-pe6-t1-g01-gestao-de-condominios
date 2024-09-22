import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { User } from 'src/entities/user.entity';
import { MinioService } from './minio.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private repo: Repository<Document>,
    private minioService: MinioService,
    private readonly configService: ConfigService
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  async create(body: CreateDocumentDto, file: Express.Multer.File, user: User) {
    const fileName = await this.uploadDocument(file);
    const document = this.repo.create({ ...body, link: fileName, user });

    return this.repo.save(document);
  }

  private async uploadDocument(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const bucketName = this.configService.get('MINIO_BUCKET');
    const objectName = `${Date.now()}_${file.originalname}`;

    await this.minioService.upload(file.buffer, bucketName, objectName);
    
    return objectName;
  }

  async findOne(id: number) {
    const document = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
  
    if (!document) {
      throw new NotFoundException('Document not found');
    }
  
    return document;
  }

  async update(id: number, body: UpdateDocumentDto) {
    const document = await this.findOne(id);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    Object.assign(document, body);
    return this.repo.save(document);
  }

  async remove(id: number) {
    const document = await this.findOne(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return this.repo.remove(document);
  }
}
