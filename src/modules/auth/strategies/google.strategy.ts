import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ['email', 'profile', 'openid'],
    })
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0].value

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) null

    return user
  }
}
