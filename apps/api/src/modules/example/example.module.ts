import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { ExampleController } from './example.controller'
import { ExampleRepository } from './example.repository'
import { ExampleService } from './example.service'

@Module({
  imports: [PrismaModule],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleRepository],
})
export class ExampleModule {}
