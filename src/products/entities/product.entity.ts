import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  rating: number;

  @Column()
  price: number;

  @Column()
  discount_price: number;
}
