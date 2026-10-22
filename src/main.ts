import 'dotenv/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { doubleCsrf } from 'csrf-csrf'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { ACCESS_TOKEN, EMAIL_QUEUE } from './consts'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true })

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

  //CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
    credentials: true,
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  //CSRF
  const { doubleCsrfProtection } = doubleCsrf({
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 30 * 24,
    },
    getSecret: () => process.env.CSRF_SECRET as string,
    getSessionIdentifier: (req) => req.cookies.access_token as string,
  })

  app.use(doubleCsrfProtection)

  //Rate Limit
  app.set('trust proxy', 'loopback')

  //Helmet
  app.use(
    helmet({
      crossOriginOpenerPolicy: false,
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
      originAgentCluster: false,
      permittedCrossDomainPolicies: false,
      referrerPolicy: false,
      strictTransportSecurity: false,
      xContentTypeOptions: false,
      xDownloadOptions: false,
      xFrameOptions: false,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
