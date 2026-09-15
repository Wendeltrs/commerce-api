import { Module } from '@nestjs/common'
import { AddressesController } from './addresses.controller'
import { AddressesService } from './addresses.service'
import { AddressRepositoryModule } from './repositories/AddressRepository.module'

@Module({
  imports: [AddressRepositoryModule],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
