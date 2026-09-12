import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserRepositoryModule } from './repositories/UserRepository.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
