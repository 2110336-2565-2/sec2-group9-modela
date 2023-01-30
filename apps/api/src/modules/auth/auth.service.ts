import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { SignupActorDto, SignupCastingDto } from './auth.dto'
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

  async createActor(signupActorDto: SignupActorDto) {
    const { password, email } = signupActorDto

    if (await this.repository.getUserByEmail(email))
      throw new ConflictException('This email is already used')

    try {
      const hashedPassword = await hash(password, 10)

      await this.repository.createActor({
        ...signupActorDto,
        password: hashedPassword,
      })
    } catch (e) {
      console.log(e)
    }
  }
}
