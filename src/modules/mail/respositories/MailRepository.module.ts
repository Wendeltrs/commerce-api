import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MailerModule } from '@nestjs-modules/mailer'
import { EMAIL_FROM, EMAIL_QUEUE, EMAIL_SERVICE } from 'src/consts'
import { MailTemplateModule } from 'src/modules/mail-template/mail-template.module'
import { IMailRepository } from './IMailRepository'
import { MailRepository } from './MailRepository'
import { MailConsumer } from './mail.consumer'

@Module({
  imports: [
    MailTemplateModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        secure: false,
      },
      defaults: {
        from: EMAIL_FROM,
      },
    }),
    ClientsModule.register([
      {
        name: EMAIL_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: EMAIL_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: IMailRepository,
      useClass: MailRepository,
    },
  ],
  controllers: [MailConsumer],
  exports: [IMailRepository, ClientsModule],
})
export class MailRepositoryModule {}
