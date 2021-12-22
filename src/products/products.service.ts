import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // TODO 이름, 설명, 이미지, 원가, 할인가
    const product = new Product(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll({ take = 10, orderBy, skip = 0 }) {
    const result = this.productRepository.createQueryBuilder('product');

    if (!['id', 'rating', 'low_price', 'high_price'].includes(orderBy)) {
      throw new HttpException(
        'orderBy is not valid. take one [id, rating, low_price, high_price]',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (orderBy && orderBy === 'low_price') {
      result.orderBy(`product.price`, 'ASC');
    } else if (orderBy && orderBy === 'high_price') {
      result.orderBy(`product.price`, 'DESC');
    } else if (orderBy) {
      result.orderBy(`product.${orderBy}`, 'ASC');
    }

    if (take == 10 || (take >= 20 && take <= 40)) {
      result.skip(skip).take(take);
    }

    return await result.getMany();
  }

  async findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  async remove(id: number) {
    return this.productRepository.delete(id);
  }
}
