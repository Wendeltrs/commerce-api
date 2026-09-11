import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  healthCheack() {
    return {
      message: 'API is running!',
    }
  }
}
