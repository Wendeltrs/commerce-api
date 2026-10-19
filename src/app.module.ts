import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RedisModule } from './common/infra/redis/redis.module'
import { CloudinaryService } from './common/services/cloudinary/cloudinary.service'
import { SessionService } from './common/services/session/session.service'
import { ShippingService } from './common/services/shipping/shipping.service'
import { StripeService } from './common/services/stripe/stripe.service'
import { BcryptoRepositoryModule } from './core/crypto/bcrypto/BcryptoRepository.module'
import { AddressesModule } from './modules/addresses/addresses.module'
import { AuthModule } from './modules/auth/auth.module'
import { CartModule } from './modules/carts/carts.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { CompaniesModule } from './modules/companies/companies.module'
import { MailModule } from './modules/mail/mail.module'
import { OrdersModule } from './modules/orders/orders.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { ProductsModule } from './modules/products/products.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'

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
    OrdersModule,
    HttpModule,
    PrismaModule,
    CompaniesModule,
    PaymentsModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    CloudinaryService,
    SessionService,
    ShippingService,
    StripeService,
  ],
})
export class AppModule {}
