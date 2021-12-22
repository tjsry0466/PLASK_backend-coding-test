import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { number, string } from 'joi';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  findAll(
    @Query('name') name: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.shopsService.findAll({
      skip: number,
      take: number,
      name: string,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }
}
