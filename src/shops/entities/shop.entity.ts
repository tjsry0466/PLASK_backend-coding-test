import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';

export class Shop {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  logo: string;
}
