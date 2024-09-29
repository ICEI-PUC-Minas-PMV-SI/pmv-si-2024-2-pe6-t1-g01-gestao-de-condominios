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

  async findAll() {
    const bucket = this.configService.get('MINIO_BUCKET');
    const documents = await this.repo.find({ relations: ['user'] });
    const documentsWithLinks = await Promise.all(documents.map(async document => {
      const link = await this.minioService.getFileUrl(document.link, bucket)
      return { ...document, link };
    }));

    return documentsWithLinks;
  }

  async create(body: CreateDocumentDto, file: Express.Multer.File, user: User) {
    const  { fileName, url } = await this.uploadDocument(file);
    let document = this.repo.create({ ...body, link: fileName, user });

    document = await this.repo.save(document);
    document.link = url

    return document;
  }

  private async uploadDocument(file: Express.Multer.File): Promise<{ fileName: string; url: string }> {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    const bucketName = this.configService.get('MINIO_BUCKET');
    const fileName = `${Date.now()}_${file.originalname}`;

    const url = await this.minioService.upload(file, bucketName, fileName);
    
    return { fileName, url };
  }

  async findOne(id: number) {
    const document = await this.repo.findOne({
      where: { id },
      relations: ['user']
    });
  
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const bucketName = this.configService.get('MINIO_BUCKET');
    document.link = await this.minioService.getFileUrl(document.link, bucketName);

    return document;
  }

  async update(id: number, body: UpdateDocumentDto, file: Express.Multer.File, user: User) {
    const document = await this.findOne(id);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    Object.assign(document, body);
    document.link = file.originalname;

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
