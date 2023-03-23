import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { CreditController } from './credit.controller'
import { CreditRepository } from './credit.repository'
import { CreditService } from './credit.service'

@Module({
  imports: [PrismaModule],
  controllers: [CreditController],
  providers: [CreditService, CreditRepository],
})
export class CreditModule {}
