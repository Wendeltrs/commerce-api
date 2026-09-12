import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthRepositoryModule } from './repositories/AuhtRepository.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [AuthRepositoryModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
