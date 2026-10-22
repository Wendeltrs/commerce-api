import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy/throttler-behind-proxy.guard'
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
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 10,
      },
      {
        name: 'long',
        ttl: 100000,
        limit: 100,
      },
    ]),
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    AppService,
    PrismaService,
    CloudinaryService,
    SessionService,
    ShippingService,
    StripeService,
  ],
})
export class AppModule {}
