import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { ProductRepositoryModule } from './repositories/ProductRepository.module'

@Module({
  imports: [ProductRepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
