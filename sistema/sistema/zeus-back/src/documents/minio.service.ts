import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;
  private readonly externalMinioClient: Minio.Client;

  private readonly port: number = parseInt(this.configService.get('MINIO_PORT'), 10) || 9000;
  private readonly useSSL: boolean = JSON.parse(this.configService.get('MINIO_USE_SSL')) || false;
  private readonly accessKey: string = this.configService.get('MINIO_ROOT_USER');
  private readonly secretKey: string = this.configService.get('MINIO_ROOT_PASSWORD');
  private readonly region: string = this.configService.get('MINIO_REGION') || 'us-east-1';
  private readonly bucketName: string = this.configService.get('MINIO_BUCKET') || 'zeus-bucket';

  constructor(private readonly configService: ConfigService) {
    const minioClientConfig = {
      port: this.port,
      useSSL: this.useSSL,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
      region: this.region
    }

    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT') || 'minio',
      ...minioClientConfig
    });

    this.externalMinioClient = new Minio.Client({
      endPoint: this.configService.get('APP_HOST') || '127.0.0.1',
      ...minioClientConfig
    });
  }

  async upload(file: Express.Multer.File, bucket: string, fileName: string) {
    try {
      await this.createBucket(this.bucketName, this.region)

      await this.minioClient.putObject(bucket, fileName, file.buffer, file.size, {
        'Content-Type': file.mimetype,
        'x-amz-acl': 'public-read',
      });

      return await this.getFileUrl(fileName, bucket)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao fazer upload do arquivo');
    }
  }

  async createBucket(bucketName: string, region: string): Promise<void> {
    try {
      const bucketExists = await this.minioClient.bucketExists(bucketName);

      if (bucketExists) {
        return;
      }

      await this.minioClient.makeBucket(bucketName, region);
      console.log(`Bucket ${bucketName} criado com sucesso na região ${region}.`);
    } catch (error) {
      console.error('Erro ao criar o bucket:', error);
      throw new Error('Erro ao criar o bucket');
    }
  }

  async getFileUrl(fileName: string, bucket: string = this.bucketName) {
    try {
      return await this.externalMinioClient.presignedGetObject(bucket, fileName);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao gerar URL assinada');
    }
  }
}