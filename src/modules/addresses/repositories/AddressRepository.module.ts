import { Module } from '@nestjs/common'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AddressRepository } from './AddressRepository'
import { IAddressRepository } from './IAddressRepository'

@Module({
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
