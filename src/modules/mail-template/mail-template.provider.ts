import { Injectable } from '@nestjs/common'
import { MailTemplate, mailSubject } from './mail-template.resources'

@Injectable()
export class MailTemplateProvider {
  public readonly subjects: Record<MailTemplate, string> = mailSubject

  public getSubject(template: MailTemplate): string {
    return this.subjects[template]
  }
}
