import { UserStatus } from '@modela/database'
import { GetUserDto, PendingUserDto, UpdateUserStatusDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUserData(userId: number): Promise<GetUserDto> {
    const { firstName, middleName, lastName, profileImageUrl, status, type } =
      await this.repository.getUserById(userId)

    const userData = {
      firstName,
      middleName,
      lastName,
      profileImageUrl,
      status,
      type,
      userId,
    }

    const company = await this.repository.getCastingById(userId)
    if (company)
      return {
        ...userData,
        companyName: company.companyName,
      }
    return userData
  }

  async getPendingUsers(): Promise<PendingUserDto[]> {
    const users = await this.repository.getPendingUsers({})
    return users
  }
  async updateUserStatus(
    userId: number,
    updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<GetUserDto> {
    //check if user exist
    const user = await this.repository.getUserById(userId)
    if (!user) throw new NotFoundException()

    //accept user
    if (updateUserStatusDto.status === UserStatus.ACCEPTED) {
      const user = await this.repository.updateUserStatus(
        userId,
        updateUserStatusDto,
      )
      return user
    }
    //TODO : reject user
    else {
      //throw bad request response
      throw new BadRequestException('Wrong format')
    }
  }
}
