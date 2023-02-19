import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'

import { ProfileModule } from './profile/profile.module'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
  imports: [PrismaModule, ProfileModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
