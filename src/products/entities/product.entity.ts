import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

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
}
