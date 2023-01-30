import { Injectable } from '@nestjs/common'

import { AuthRepository } from '../auth/auth.repository'

@Injectable()
export class UserService {
  constructor(private authRepository: AuthRepository) {}

  async getUserData(email: string) {
    const { firstName, isVerified, type } =
      await this.authRepository.getUserByEmail(email)
    return { firstName, isVerified, type }
  }
}
