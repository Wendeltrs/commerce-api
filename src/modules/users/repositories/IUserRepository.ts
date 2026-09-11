import { User } from 'prisma/generated/prisma/client'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

export abstract class IUserRepository {
  abstract getAll(query?: QueryDto): Promise<[User[], number]>
  abstract getById(id: string): Promise<User | null>
  abstract getByEmail(email: string): Promise<User | null>
  abstract create(data: CreateUserDto): Promise<User>
  abstract update(id: string, data: UpdateUserDto): Promise<User>
  abstract delete(id: string): Promise<void>
  abstract uploadAvatar(file: Express.Multer.File): Promise<void>
}
