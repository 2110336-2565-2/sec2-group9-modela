import { UserStatus } from '@modela/database'
import { ActorInfoDto, CastingInfoDto, JwtDto } from '@modela/dtos'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Express } from 'express'

import { InfoRepository } from './info.repository'

@Injectable()
export class InfoService {
  constructor(private repository: InfoRepository) {}
  async getActorInfo(user: JwtDto) {
    return await this.repository.getActorInfoById(user.userId)
  }

  async editActorInfo(
    body: ActorInfoDto,
    file: Express.Multer.File,
    user: JwtDto,
  ) {
    if (user.status !== UserStatus.REJECTED) throw new ForbiddenException()
    return await this.repository.editActorInfo(body, file, user.userId)
  }

  async getCastingInfo(user: JwtDto) {
    return await this.repository.getCastingInfoById(user.userId)
  }

  async editCastingInfo(
    body: CastingInfoDto,
    file: Express.Multer.File,
    user: JwtDto,
  ) {
    if (user.status !== UserStatus.REJECTED) throw new ForbiddenException()
    return await this.repository.editCastingInfo(body, file, user.userId)
  }
}
