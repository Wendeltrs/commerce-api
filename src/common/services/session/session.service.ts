import { Injectable, Scope } from '@nestjs/common'
import { User } from 'prisma/generated/prisma/client'

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
  private userId: string
  private role: string

  public setUser(user: User) {
    this.userId = user.id
    this.role = user.role
  }

  public getUserId() {
    return this.userId
  }

  public getRole() {
    return this.role
  }
}
