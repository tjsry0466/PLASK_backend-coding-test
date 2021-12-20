import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, ShopsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
