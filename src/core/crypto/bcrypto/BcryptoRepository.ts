import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { IBcryptoRepository } from './IBcryptoRepository'

@Injectable()
export class BcryptoRepository implements IBcryptoRepository {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
