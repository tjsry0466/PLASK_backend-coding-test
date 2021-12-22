import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.usersService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/users/:id')
  withdrawal(@Param('id') id: string) {
    return this.usersService.withdrawal(id);
  }
}
