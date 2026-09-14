import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SessionService } from 'src/common/services/session/session.service'
import { BcryptoRepositoryModule } from 'src/core/crypto/bcrypto/BcryptoRepository.module'
import { MailService } from 'src/modules/mail/mail.service'
import { MailRepositoryModule } from 'src/modules/mail/respositories/MailRepository.module'
import { UserRepositoryModule } from 'src/modules/users/repositories/UserRepository.module'
import { AuthRepository } from './AuthRepository'
import { IAuthRepository } from './IAuthRepository'

@Module({
  imports: [
    BcryptoRepositoryModule,
    UserRepositoryModule,
    MailRepositoryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
    SessionService,
    MailService,
  ],
  exports: [IAuthRepository],
})
export class AuthRepositoryModule {}
