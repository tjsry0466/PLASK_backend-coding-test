import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from '../dto/create-product.dto';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsNumber()
  rating: number;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsNumber()
  discount_price: number;

  constructor(partial: CreateProductDto) {
    Object.assign(this, partial);
  }
}
