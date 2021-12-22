import { Controller, Get, Post, Body, Param, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { number, string } from 'joi';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from '../minio-client/file.model';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile() image: BufferedFile,
    @Body() createShopDto: CreateShopDto,
  ) {
    return this.shopsService.create(createShopDto, image);
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
