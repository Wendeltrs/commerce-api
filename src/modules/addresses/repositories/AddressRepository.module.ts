import { Module } from '@nestjs/common'
import { RedisModule } from 'src/common/infra/redis/redis.module'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AddressRepository } from './AddressRepository'
import { IAddressRepository } from './IAddressRepository'

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: IAddressRepository,
      useClass: AddressRepository,
    },
    PrismaService,
    SessionService,
  ],
  exports: [IAddressRepository, SessionService, PrismaService],
})
export class AddressRepositoryModule {}
