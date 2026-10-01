import { Cart, CartItem } from 'prisma/generated/prisma/client'
import { CreateCartItemDto } from '../dto/create-cart-item.dto'
import { UpdateCartItemDto } from '../dto/update-cart-item.dto'

export abstract class ICartRepository {
  abstract get(): Promise<Cart | null>
  abstract create(data: CreateCartItemDto): Promise<CartItem>
  abstract update(id: string, data: UpdateCartItemDto): Promise<CartItem>
  abstract delete(id: string): Promise<void>
}
