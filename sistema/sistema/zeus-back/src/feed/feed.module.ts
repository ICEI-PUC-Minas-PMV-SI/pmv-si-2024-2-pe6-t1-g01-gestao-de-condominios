import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { Feed } from '../entities/feed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioService } from 'src/documents/minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  controllers: [FeedController],
  providers: [FeedService, MinioService],
})
export class FeedModule {}
