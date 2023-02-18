import {
  GetUserDto,
  UpdateUserVerificationDto,
  UserUpdateVerificationStatus,
} from '@modela/dtos'
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

  async updateUserVerification(
    userId: number,
    updateUserVerificationDto: UpdateUserVerificationDto,
  ): Promise<GetUserDto> {
    //check if user exist
    const user = await this.repository.getUserById(userId)
    if (!user) throw new NotFoundException()

    //accept user
    if (
      updateUserVerificationDto.status === UserUpdateVerificationStatus.ACCEPT
    ) {
      const user = await this.repository.updateUserVerification(userId)
      return user
    }
    //TODO : reject user
    else {
      //throw bad request response
      throw new BadRequestException('Wrong format')
    }
  }
}
