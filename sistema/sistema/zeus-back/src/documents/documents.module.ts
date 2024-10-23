import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { MinioService } from './minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentsController],
  providers: [DocumentsService, MinioService]
})
export class DocumentsModule {}
