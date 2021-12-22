import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from '../minio-client/file.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() image: BufferedFile,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, image);
  }

  @Get()
  findAll(
    @Query('orderBy') orderBy: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    // TODO 낮은 가격, 높은 가격, 평점, 최신순
    // TODO 페이지네이션 기본 10개, 요청에 따라 20~40개 까지 가능
    return this.productsService.findAll({ orderBy, skip, take });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
