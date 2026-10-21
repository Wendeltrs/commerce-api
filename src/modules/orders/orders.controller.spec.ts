import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

describe('OrdersController', () => {
  let controller: OrdersController
  let ordersService: { create: jest.Mock }

  beforeEach(async () => {
    ordersService = { create: jest.fn() }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: ordersService }],
    }).compile()

    controller = module.get<OrdersController>(OrdersController)
  })

  it('requires an idempotency key to create an order', async () => {
    await expect(
      controller.create({ addressId: 'address', shippingServiceId: 'shipping' }, ''),
    ).rejects.toThrow(BadRequestException)

    expect(ordersService.create).not.toHaveBeenCalled()
  })

  it('forwards the idempotency key when creating an order', async () => {
    const data: CreateOrderDto = { addressId: 'address', shippingServiceId: 'shipping' }
    ordersService.create.mockResolvedValue({ order: {}, paymentUrl: 'https://stripe.test' })

    await controller.create(data, '  retry-key  ')

    expect(ordersService.create).toHaveBeenCalledWith(data, 'retry-key')
  })
})
