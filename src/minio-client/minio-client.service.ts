import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = this.configService.get('minio.bucket');

  public get client() {
    return this.minio.client;
  }

  constructor(
    private configService: ConfigService,
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {

    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    }
    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
      acl: 'public-read',
    };
    const filename = hashedFileName + ext;
    const fileName = `${filename}`;
    const fileBuffer = file.buffer;
    console.log(baseBucket, fileName, fileBuffer, metaData);
    this.client.putObject(
      baseBucket,
      fileName,
      fileBuffer,
      metaData,
      function (err, res) {
        console.log(err, res);
        if (err)
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
      },
    );

    return {
      url: `${this.configService.get(
        'minio.endpoint',
      )}:${this.configService.get('minio.port')}/${this.configService.get(
        'minio.bucket',
      )}/${filename}`,
    };
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err, res) {
      if (err)
        throw new HttpException(
          'Oops Something wrong happend',
          HttpStatus.BAD_REQUEST,
        );
    });
  }
}