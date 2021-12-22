import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  owner: User;

  @Column()
  public userId: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  logo: string;

  constructor(partial: Partial<Shop>) {
    Object.assign(this, partial);
  }
}
