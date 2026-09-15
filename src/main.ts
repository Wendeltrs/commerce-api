import 'dotenv/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ACCESS_TOKEN, EMAIL_QUEUE } from './consts'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  })

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Commerce API')
    .setDescription(
      'REST API for e-commerce and order management built with NestJS, TypeScript, Prisma and PostgreSQL.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
      },
      'jwt',
    )
    .addCookieAuth(ACCESS_TOKEN)
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  })

  //Validation
  app.useGlobalPipes(new ValidationPipe())

  //Cookie
  app.use(cookieParser())

  //Microservices
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: EMAIL_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  })

  await app.startAllMicroservices()

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
