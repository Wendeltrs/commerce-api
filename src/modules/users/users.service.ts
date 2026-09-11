import { Injectable, NotFoundException } from '@nestjs/common'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { IUserRepository } from './repositories/IUserRepository'

@Injectable()
export class UsersService {
  constructor(private userRepository: IUserRepository) {}

  public async getAll(query?: QueryDto) {
    return await this.userRepository.getAll(query)
  }

  public async getById(id: string) {
    return await this.userRepository.getById(id)
  }

  public async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  public async create(data: CreateUserDto) {
    return await this.userRepository.create(data)
  }

  public async uploadAvatar(_file: Express.Multer.File) {
    // TODO: Implementation for uploading user avatar
  }

  public async update(id: string, data: UpdateUserDto) {
    return await this.userRepository.update(id, data)
  }

  public async delete(id: string) {
    await this.userRepository.delete(id)
  }
}
