import { Module } from "@nestjs/common";
import { MailTemplateProvider } from "./mail-template.provider";
import { HandlebarsMailTemplateStrategy } from "./strategies/handlebars.strategy";

@Module({
    providers: [MailTemplateProvider, HandlebarsMailTemplateStrategy],
    exports: [MailTemplateProvider, HandlebarsMailTemplateStrategy]
})
export class MailTemplateModule {}