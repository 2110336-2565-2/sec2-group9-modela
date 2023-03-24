import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'src/modules/auth/auth.module'
import { InfoModule } from 'src/modules/auth/info/info.module'
import { CreditModule } from 'src/modules/credit/credit.module'
import { DebitModule } from 'src/modules/debit/debit.module'
import { ExampleModule } from 'src/modules/example/example.module'
import { FileModule } from 'src/modules/file/file.module'
import { ApplicationModule } from 'src/modules/job/application/application.module'
import { JobModule } from 'src/modules/job/job.module'
import { NotificationModule } from 'src/modules/notification/notification.module'
import { ReportModule } from 'src/modules/report/report.module'
import { ResumeModule } from 'src/modules/resume/resume.module'
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
    ResumeModule,
    FileModule,
    InfoModule,
    CreditModule,
    DebitModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
