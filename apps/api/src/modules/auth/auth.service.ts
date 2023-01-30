import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { SignupCastingDto } from './auth.dto'
import { AuthRepository } from './auth.repository'

@Injectable()
export class AuthService {
  constructor(private repository: AuthRepository) {}

  async createCasting(signupCastingDto: SignupCastingDto) {
    const { password, email } = signupCastingDto

    if (await this.repository.getUserByEmail(email))
      throw new ConflictException('This email is already used')

    try {
      const hashedPassword = await hash(password, 10)

      await this.repository.createCasting({
        ...signupCastingDto,
        password: hashedPassword,
      })
    } catch (e) {
      console.log(e)
    }
  }
}
