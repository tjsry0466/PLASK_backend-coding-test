import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    return await this.usersRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    return await this.usersRepository.findOne(loginUserDto);
  }

  async withdrawal(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
