import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const shop = new Shop(createShopDto);
    return this.shopsRepository.save(shop);
  }

  async findAll({ skip, take, name }) {
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
