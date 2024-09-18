import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DocumentsService {
  constructor(@InjectRepository(Document) private repo: Repository<Document>) {}

  findAll() {
    return this.repo.find();
  }

  async create(body: CreateDocumentDto, user: User) {
    const document = this.repo.create({ ...body, user: user });

    return this.repo.save(document);
  }

  async findOne(id: number) {
    const document = await this.repo.findOneBy({ id });

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
