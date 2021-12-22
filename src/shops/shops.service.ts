import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BufferedFile } from '../minio-client/file.model';
import { Product } from '../products/entities/product.entity';
import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
    private minioClientService: MinioClientService,
  ) {}

  async create(createShopDto: CreateShopDto, image: BufferedFile) {
    const uploaded_image = await this.minioClientService.upload(image);
    const shop = new Shop(createShopDto);
    shop.logo = uploaded_image.url;

    return this.shopsRepository.save(shop);
  }

  async findAll({ name, skip, take }) {
    // TODO id, 이름, 쇼핑몰 로고
    // TODO 페이지네이션 이름순
    const result = this.shopsRepository.createQueryBuilder('shop');

    if (name) {
      result.where('shop.name like :name', {
        name: '%' + name + '%',
      });
    }

    if (skip && take) {
      result.skip(skip).take(take);
    }

    return result.orderBy('shop.name', 'ASC').getMany();
  }

  async findOne(id: number) {
    // TODO 쇼핑몰 정보 및 쇼핑몰 Owner
    return await this.shopsRepository.findOne({ id: id });
  }
}
