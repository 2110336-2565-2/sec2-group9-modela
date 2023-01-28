import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ExampleModule } from 'src/modules/example/example.module'

import { configuration } from '../config/configuration'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
