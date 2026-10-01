import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CloudinaryService } from './common/services/cloudinary/cloudinary.service'
import { SessionService } from './common/services/session/session.service'
import { BcryptoRepositoryModule } from './core/crypto/bcrypto/BcryptoRepository.module'
import { AddressesModule } from './modules/addresses/addresses.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { MailModule } from './modules/mail/mail.module'
import { ProductsModule } from './modules/products/products.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { CartModule } from './modules/carts/carts.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BcryptoRepositoryModule,
    MailModule,
    AddressesModule,
    CategoriesModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryService, SessionService],
})
export class AppModule {}
