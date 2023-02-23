import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'
import { FileModule } from 'src/modules/file/file.module'

import { InfoController } from './info.controller'
import { InfoRepository } from './info.repository'
import { InfoService } from './info.service'

@Module({
  imports: [PrismaModule, FileModule],
  controllers: [InfoController],
  providers: [InfoService, InfoRepository],
})
export class InfoModule {}
