import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { AppService } from './app.service'

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    description: 'Health check',
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  healthCheack() {
    return this.appService.healthCheack()
  }
}
