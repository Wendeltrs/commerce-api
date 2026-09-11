import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { IUserRepository } from './IUserRepository'
import { UserRepository } from './UserRepository'

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class UserRepositoryModule {}
