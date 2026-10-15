import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { OrderRepositoryModule } from './repositories/OrderRepository.module'

@Module({
  imports: [OrderRepositoryModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
