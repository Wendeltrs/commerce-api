import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailRepositoryModule } from './respositories/MailRepository.module'

@Module({
  imports: [MailRepositoryModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
