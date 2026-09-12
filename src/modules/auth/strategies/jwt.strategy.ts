import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { RESET_PASSWORD } from 'src/consts'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_SECRET!,
      ignoreExpiration: false,
    })
  }

  async validate(payload: { sub: string; purpose: string }) {
    if (payload.purpose === RESET_PASSWORD) {
      throw new UnauthorizedException('Invalid token')
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    })

    if (!user) {
      return null
    }

    return user
  }
}
