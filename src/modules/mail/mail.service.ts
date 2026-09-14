import { Injectable } from '@nestjs/common'
import { MailSendDto } from '../mail-template/mail-template.dto'
import { IMailRepository } from './respositories/IMailRepository'

@Injectable()
export class MailService {
  constructor(private mailRepository: IMailRepository) {}

  public send(data: MailSendDto) {
    this.mailRepository.send(data)
  }
}
