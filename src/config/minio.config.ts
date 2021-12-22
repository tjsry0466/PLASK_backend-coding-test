import { registerAs } from '@nestjs/config';

export default registerAs('minio', () => ({
  endpoint: process.env.MINIO_ENDPOINT,
  port: process.env.MINIO_PORT,
  access_key: process.env.MINIO_ACCESS_KEY,
  secret_key: process.env.MINIO_SECRET_KEY,
  bucket: process.env.MINIO_BUCKET_NAME,
}));
