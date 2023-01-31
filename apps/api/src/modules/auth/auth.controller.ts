import { Body, Controller, Post, Res } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response } from 'express'

import { LoginDto, SignupActorDto, SignupCastingDto } from './auth.dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/actor')
  @ApiOperation({ summary: 'signup for actor' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'This email is already used' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupActor(@Body() signupActorDto: SignupActorDto) {
    return this.authService.createActor(signupActorDto)
  }

  @Post('signup/casting')
  @ApiOperation({ summary: 'signup for casting' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'This email is already used' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupCasting(@Body() signupCastingDto: SignupCastingDto) {
    return this.authService.createCasting(signupCastingDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'login for user' })
  @ApiCreatedResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.verfyPassword(loginDto, res)
  }
}
