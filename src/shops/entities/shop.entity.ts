import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;
}
