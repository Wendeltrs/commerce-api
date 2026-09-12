import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BcryptoRepositoryModule } from './core/crypto/bcrypto/BcryptoRepository.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BcryptoRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
