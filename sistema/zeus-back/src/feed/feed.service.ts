import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from '../entities/feed.entity';
import { CreateFeedDto } from './dtos/create-feed.dto';
import { User } from 'src/entities/user.entity';
import { MinioService } from 'src/documents/minio.service';
import { ConfigService } from '@nestjs/config';
import { UpdateFeedDto } from './dtos/update-feed.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed) private repo: Repository<Feed>,
    private minioService: MinioService,
    private readonly configService: ConfigService
  ) {}

  async create(body: CreateFeedDto, file: Express.Multer.File, user: User) {
    const { fileName, url } = await this.uploadDocument(file);
    let feed = this.repo.create({ ...body, link: fileName, user });

    feed = await this.repo.save(feed);
    feed.link = url

    return feed;
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

  async findAll() {
    const bucket = this.configService.get('MINIO_BUCKET');
    const feeds = await this.repo.find({ relations: ['user'] });
    const feedsWithLinks = await Promise.all(feeds.map(async feed => {
      const link = await this.minioService.getFileUrl(feed.link, bucket)
      return { ...feed, link };
    }));

    return feedsWithLinks;
  }

  async findOne(id: number) {
    const feed = await this.repo.findOne({
      where: { id },
      relations: ['user']
    });

    if (!feed) {
      throw new NotFoundException('Feed não encontrado.');
    }

    const bucketName = this.configService.get('MINIO_BUCKET');
    feed.link = await this.minioService.getFileUrl(feed.link, bucketName);

    return feed;
  }

  async update(id: number, body: UpdateFeedDto, file: Express.Multer.File, user: User) {
    const feed = await this.findOne(id);

    if (!feed) {
      throw new NotFoundException('Feed de notícia não encontrado.');
    }

    Object.assign(feed, body);
    if(file) feed.link = file.originalname;
    return this.repo.save(feed);
  }

  async remove(id: number) {
    const feed = await this.findOne(id);
    if (!feed) {
      throw new NotFoundException('Feed de notícia não encontrado.');
    }
    return this.repo.remove(feed);
  }
}
