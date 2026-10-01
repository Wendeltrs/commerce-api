import { Test, TestingModule } from '@nestjs/testing'
import { CartService } from './carts.service'
import { ICartRepository } from './repositories/ICartRepository'

describe('CartService', () => {
  let service: CartService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: ICartRepository, useValue: {} },
      ],
    }).compile()

    service = module.get<CartService>(CartService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
