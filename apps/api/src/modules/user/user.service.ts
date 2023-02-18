import { GetUserDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'

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
}
