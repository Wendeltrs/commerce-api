import { Module } from '@nestjs/common'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { CategoryRepositoryModule } from './repositories/CategoryRepository.module'

@Module({
  imports: [CategoryRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
