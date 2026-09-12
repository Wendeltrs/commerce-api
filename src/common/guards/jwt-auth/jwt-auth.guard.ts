import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { SessionService } from 'src/common/services/session/session.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private session: SessionService) {
    super()
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = (await super.canActivate(context)) as boolean

    if (isAuthenticated) {
      const request = context.switchToHttp().getRequest()
      this.session.setUser(request.user)
    }

    return isAuthenticated
  }
}
