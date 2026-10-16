import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { SessionService } from 'src/common/services/session/session.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthRepositoryModule } from './repositories/AuhtRepository.module'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [AuthRepositoryModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, SessionService, GoogleStrategy],
})
export class AuthModule {}
