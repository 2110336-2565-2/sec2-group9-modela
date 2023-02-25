import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { ResumeController } from './resume.controller'
import { ResumeRepository } from './resume.respository'
import { ResumeService } from './resume.service'

@Module({
  imports: [PrismaModule],
  controllers: [ResumeController],
  providers: [ResumeService, ResumeRepository],
  exports: [ResumeRepository],
})
export class ResumeModule {}
