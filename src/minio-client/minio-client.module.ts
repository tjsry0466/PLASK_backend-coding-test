import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get('minio.endpoint'),
        port: parseInt(configService.get('minio.port')),
        useSSL: false, // If on localhost, keep it at false. If deployed on https, change to true
        accessKey: configService.get('minio.access_key'),
        secretKey: configService.get('minio.secret_key'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
