import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { MailerService } from '@nestjs-modules/mailer'
import { SEND_EMAIL } from 'src/consts'
import { MailSendDto } from '../../mail-template/mail-template.dto'
import { MailTemplateProvider } from '../../mail-template/mail-template.provider'
import { HandlebarsMailTemplateStrategy } from '../../mail-template/strategies/handlebars.strategy'

@Controller()
export class MailConsumer {
  constructor(
    private readonly mailer: MailerService,
    private readonly templates: MailTemplateProvider,
    private readonly handlebars: HandlebarsMailTemplateStrategy,
  ) {}

  @EventPattern(SEND_EMAIL)
  async handleSendEmail(@Payload() data: MailSendDto) {
    const html = await this.handlebars.parse(data.template, data.variables)

    await this.mailer.sendMail({
      to: data.to,
      subject: this.templates.getSubject(data.template),
      html,
    })
  }
}
