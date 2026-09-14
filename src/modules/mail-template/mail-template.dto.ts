import { MailTemplate } from "./mail-template.resources"

export class MailSendDto {
  to: string
  template: MailTemplate
  variables: Record<string, unknown>
}
