import { User } from '@modela/database'
import { LoginDto, SignupActorDto, SignupCastingDto } from '@modela/dtos'
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'
import { Response } from 'express'

import { AuthRepository } from './auth.repository'

@Injectable()
export class AuthService {
  constructor(
    private repository: AuthRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async createCasting(signupCastingDto: SignupCastingDto, res: Response) {
    const { password, email } = signupCastingDto
    if (await this.repository.getUserByEmail(email))
      throw new ConflictException('This email is already used')
    try {
      const hashedPassword = await hash(password, 10)
      const user = await this.repository.createCasting({
        ...signupCastingDto,
        password: hashedPassword,
      })
      return this.createJwtToken(user, res)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }

  async createActor(signupActorDto: SignupActorDto, res: Response) {
    const { password, email } = signupActorDto
    if (await this.repository.getUserByEmail(email))
      throw new ConflictException('This email is already used')
    try {
      const hashedPassword = await hash(password, 10)
      const user = await this.repository.createActor({
        ...signupActorDto,
        password: hashedPassword,
      })
      return this.createJwtToken(user, res)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }

  async verfyPassword(loginDto: LoginDto, res: Response) {
    const { password, email } = loginDto
    const user = await this.repository.getUserByEmail(email)
    if (!user) throw new UnauthorizedException('Wrong email or password')
    if (!(await compare(password, user.password)))
      throw new UnauthorizedException('Wrong email or password')
    return this.createJwtToken(user, res)
  }

  createJwtToken(user: User, res: Response) {
    const { userId, type, status } = user
    const token: string = this.jwtService.sign({ userId, type, status })
    res.cookie('token', token, {
      httpOnly: true,
      secure: this.configService.get<boolean>('cookie.secure'),
    })
    return { message: 'Login Successful' }
  }

  removeJwtToken(res: Response) {
    res.clearCookie('token')
  }
}
