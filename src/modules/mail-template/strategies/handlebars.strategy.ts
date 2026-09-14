import * as fs from 'node:fs/promises'
import path from 'node:path'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import dayjs from 'dayjs'
import handlebars from 'handlebars'

@Injectable()
export class HandlebarsMailTemplateStrategy {
  constructor() {
    this.loadHelpers()
  }

  public async parse(templateName: string, variables: Record<string, unknown>): Promise<string> {
    const templatesPath = path.resolve(__dirname, '..', 'templates')
    const templatePath = path.join(templatesPath, `${templateName}.hbs`)
    const transactionalPath = path.join(templatesPath, 'mail.transactional.hbs')
    const linkPath = path.join(templatesPath, 'mail.link.hbs')

    try {
      const template = await fs.readFile(templatePath, 'utf-8')
      const content = await fs.readFile(transactionalPath, 'utf-8')
      const linkContent = await fs.readFile(linkPath, 'utf-8')

      handlebars.registerPartial('template', content)
      handlebars.registerPartial('link', linkContent)

      const compiled = handlebars.compile(template, {
        strict: true,
      })

      return compiled(variables)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Error loading mail template: ${templateName}`)
    }
  }

  private loadHelpers() {
    handlebars.registerHelper('concat', (prefix, value) => {
      return prefix + value
    })

    handlebars.registerHelper('day', (value, format) => {
      return dayjs(value).format(format)
    })

    handlebars.registerHelper('price', (value) => {
      return (value / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    })
  }
}
