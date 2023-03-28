import { UserStatus, UserType } from '@modela/database'
import {
  GetJobCardDto,
  GetUserDto,
  PendingUserDto,
  UpdateUserStatusDto,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import {
  BadRequestException,
  ForbiddenException,
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
    const users = await this.repository.getPendingUsers()
    return users
  }
  async updateUserStatus(
    userId: number,
    updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<PendingUserDto> {
    //check if user exist
    const user = await this.repository.getUserById(userId)
    if (!user) throw new NotFoundException()

    if (user.status !== UserStatus.PENDING)
      throw new BadRequestException('User is not pending')

    if (updateUserStatusDto.status === UserStatus.PENDING)
      throw new BadRequestException('Cannot set user status to pending')

    if (updateUserStatusDto.status === UserStatus.REJECTED) {
      if (!updateUserStatusDto.rejectedReason)
        throw new BadRequestException('Reason is required')
    } else {
      //UserStatus.ACCEPTED
      updateUserStatusDto.rejectedReason = null
    }

    const updatedUser = await this.repository.updateUserStatus(
      userId,
      updateUserStatusDto,
    )
    return updatedUser
  }

  async getUsersWorkHistory(
    paramId: number,
    userId: number,
    userType: UserType,
  ): Promise<GetJobCardDto[]> {
    //check if user exist
    const targetUser = await this.repository.getUserById(paramId)
    if (!targetUser) throw new NotFoundException()

    let result: GetJobCardDto[] = []
    if (targetUser.type === UserType.ACTOR) {
      if (userType === UserType.ACTOR && userId !== paramId)
        throw new ForbiddenException('Cannot get other actor work history')

      result = await this.repository.getActorsWorkHistory(paramId)
    } else if (targetUser.type === UserType.CASTING) {
      if (userId !== paramId)
        throw new ForbiddenException('Cannot get other casting work history')

      result = await this.repository.getCastingWorkHistory(paramId)
    } else {
      throw new ForbiddenException('Invalid user type')
    }

    return result
  }
}
