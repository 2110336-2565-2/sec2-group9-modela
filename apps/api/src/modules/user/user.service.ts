import { Injectable } from '@nestjs/common'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUserData(userId: number) {
    const { firstName, isVerified, type } = await this.repository.getUserById(
      userId,
    )
    return { firstName, isVerified, type }
  }
}
