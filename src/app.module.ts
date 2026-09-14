import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BcryptoRepositoryModule } from './core/crypto/bcrypto/BcryptoRepository.module'
import { AuthModule } from './modules/auth/auth.module'
import { MailModule } from './modules/mail/mail.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { CloudinaryService } from './common/services/cloudinary/cloudinary.service';

@Module({
  imports: [UsersModule, AuthModule, BcryptoRepositoryModule, MailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryService],
})
export class AppModule {}
