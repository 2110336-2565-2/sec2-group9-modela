import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'src/modules/auth/auth.module'
import { ExampleModule } from 'src/modules/example/example.module'
import { ApplicationModule } from 'src/modules/job/application/application.module'
import { JobModule } from 'src/modules/job/job.module'
import { ReportModule } from 'src/modules/report/report.module'
import { UserModule } from 'src/modules/user/user.module'

import { configuration } from '../config/configuration'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ExampleModule,
    AuthModule,
    JobModule,
    UserModule,
    ReportModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
