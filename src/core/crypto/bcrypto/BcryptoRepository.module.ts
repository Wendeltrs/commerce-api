import { Module } from '@nestjs/common'
import { BcryptoRepository } from './BcryptoRepository'
import { IBcryptoRepository } from './IBcryptoRepository'

@Module({
  providers: [
    {
      provide: IBcryptoRepository,
      useClass: BcryptoRepository,
    },
  ],
  exports: [IBcryptoRepository],
})
export class BcryptoRepositoryModule {}
