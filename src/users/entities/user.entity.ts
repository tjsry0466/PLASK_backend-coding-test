import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Exclude()
  password: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  phone: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
