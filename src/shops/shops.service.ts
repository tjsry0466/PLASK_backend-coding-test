import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
  create(createShopDto: CreateShopDto) {
    // TODO Authorization 검증 사용
    return 'This action adds a new shop';
  }

  findAll() {
    // TODO id, 이름, 쇼핑몰 로고
    // TODO 페이지네이션 이름순
    return `This action returns all shops`;
  }

  findOne(id: number) {
    // TODO 쇼핑몰 정보 및 쇼핑몰 Owner
    return `This action returns a #${id} shop`;
  }
}
