import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './app/app.module'
import { Configuration } from './config/configuration'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const config = app.get<ConfigService<Configuration>>(ConfigService)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Modela API')
    .setDescription('Modela API Documentation')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(config.get('port'))
}
bootstrap()
