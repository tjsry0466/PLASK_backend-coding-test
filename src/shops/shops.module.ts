import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [MinioClientModule, UsersModule, TypeOrmModule.forFeature([Shop])],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
