import { Inject, Injectable } from '@nestjs/common'
import { QueryDto } from 'src/common/decorators/query/dto/query.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { IUserRepository } from './repositories/IUserRepository'

@Injectable()
export class UsersService {
  constructor(@Inject(IUserRepository) private userRepository: IUserRepository) {}

  public async getAll(query?: QueryDto) {
    return await this.userRepository.getAll(query)
  }

  public async getById(id: string) {
    return await this.userRepository.getById(id)
  }

  public async getByEmail(email: string) {
    return await this.userRepository.getByEmail(email)
  }

  public async create(data: CreateUserDto) {
    return await this.userRepository.create(data)
  }

  public async uploadAvatar(file: Express.Multer.File) {
    return await this.userRepository.uploadAvatar(file)
  }

  public async update(id: string, data: UpdateUserDto) {
    return await this.userRepository.update(id, data)
  }

  public async delete(id: string) {
    await this.userRepository.delete(id)
  }
}
