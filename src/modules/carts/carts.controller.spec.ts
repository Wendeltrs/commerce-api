import { Test, TestingModule } from '@nestjs/testing'
import { CartController } from './carts.controller'
import { CartService } from './carts.service'

describe('CartController', () => {
  let controller: CartController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: {} }],
    }).compile()

    controller = module.get<CartController>(CartController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
