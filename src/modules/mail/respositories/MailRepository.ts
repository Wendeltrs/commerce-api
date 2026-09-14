import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { EMAIL_SERVICE, SEND_EMAIL } from 'src/consts'
import { MailSendDto } from '../../mail-template/mail-template.dto'
import { IMailRepository } from './IMailRepository'

@Injectable()
export class MailRepository implements IMailRepository {
  constructor(@Inject(EMAIL_SERVICE) private client: ClientProxy) {}

  send(data: MailSendDto) {
    this.client.emit(SEND_EMAIL, data)
  }
}
