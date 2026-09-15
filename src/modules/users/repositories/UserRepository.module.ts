import { Module } from '@nestjs/common'
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service'
import { SessionService } from 'src/common/services/session/session.service'
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
    SessionService,
    CloudinaryService,
  ],
  exports: [IUserRepository, SessionService, PrismaModule],
})
export class UserRepositoryModule {}
