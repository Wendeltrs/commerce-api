import { MailSendDto } from '../../mail-template/mail-template.dto'

export abstract class IMailRepository {
  abstract send(data: MailSendDto): void
}
