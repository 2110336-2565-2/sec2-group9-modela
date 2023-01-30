import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { SignupCastingDto } from './auth.dto'
import { AuthRepository } from './auth.repository'

@Injectable()
export class AuthService {
  constructor(private repository: AuthRepository) {}

  async createCasting(signupCastingDto: SignupCastingDto) {
    const hashedPassword = await hash(signupCastingDto.password, 10)

    await this.repository.createCasting({
      ...signupCastingDto,
      password: hashedPassword,
    })
  }
}
