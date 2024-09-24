import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT') || 'minio',
      port: parseInt(this.configService.get('MINIO_PORT'), 10) || 9000,
      useSSL: JSON.parse(this.configService.get('MINIO_USE_SSL')) || false,
      accessKey: this.configService.get('MINIO_ROOT_USER'),
      secretKey: this.configService.get('MINIO_ROOT_PASSWORD'),
      region: this.configService.get('MINIO_REGION') || 'us-east-1'
    });
  }
  
  getBaseUrl() {
    const useSSL: boolean = JSON.parse(this.configService.get('MINIO_USE_SSL'));
    return `${useSSL ? 'https' : 'http'}://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.configService.get('MINIO_BUCKET')}/`;
  }

  async upload(file: Express.Multer.File, bucket: string, object: string) {
    await this.createBucket(this.configService.get('MINIO_BUCKET'), this.configService.get('MINIO_REGION'))

    await this.minioClient.putObject(bucket, object, file.buffer, file.size, {
      'Content-Type': file.mimetype,
      'x-amz-acl': 'public-read',
    });
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

  async getFileUrl(bucket: string, object: string) {
    return this.minioClient.presignedGetObject(bucket, object);
  }

  async getSignedUrl(objectName: string): Promise<string> {
    const bucketName = this.configService.get('MINIO_BUCKET');
    const expiresIn = 7 * 24 * 60 * 60;
    const useSSL = JSON.parse(this.configService.get('MINIO_USE_SSL'));

    return await this.minioClient.presignedUrl('GET', bucketName, objectName, expiresIn);
    // return await this.minioClient.presignedGetObject(bucketName, objectName, expiresIn);
  }
}