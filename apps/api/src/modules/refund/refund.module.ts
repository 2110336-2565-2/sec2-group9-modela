import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { RefundController } from './refund.controller'
import { RefundRepository } from './refund.repository'
import { RefundService } from './refund.service'

@Module({
  imports: [PrismaModule],
  controllers: [RefundController],
  providers: [RefundService, RefundRepository],
})
export class RefundModule {}
