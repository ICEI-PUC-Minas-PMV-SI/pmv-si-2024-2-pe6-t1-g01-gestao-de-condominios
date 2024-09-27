import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from '../entities/feed.entity';
import { CreateFeedDto } from './dtos/create-feed.dto';
import { User } from 'src/entities/user.entity';
import { UpdateDocumentDto } from 'src/documents/dtos/update-document.dto';
import { MinioService } from 'src/documents/minio.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed) private repo: Repository<Feed>,
    private minioService: MinioService,
    private readonly configService: ConfigService
  ) {}

  async create(body: CreateFeedDto, file: Express.Multer.File, user: User) {
    const  { fileName, url } = await this.uploadDocument(file);
    let feed = this.repo.create({ ...body, link: fileName, user });

    feed = await this.repo.save(feed);
    feed.link = url

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

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const feed = await this.repo.findOne({
      where: { id },
    });

    if (!feed) {
      throw new NotFoundException('Feed não encontrado.');
    }

    return feed;
  }

  async update(id: number, body: UpdateDocumentDto, file: Express.Multer.File, user: User) {
    const feed = await this.findOne(id);

    if (!feed) {
      throw new NotFoundException('Feed de notícia não encontrado.');
    }

    Object.assign(feed, body);
    return this.repo.save(feed);
  }

  async remove(id: number) {
    const feed = await this.findOne(id);
    if (!feed) {
      throw new NotFoundException('Apartamento não encontrado.');
    }
    return this.repo.remove(feed);
  }
}
