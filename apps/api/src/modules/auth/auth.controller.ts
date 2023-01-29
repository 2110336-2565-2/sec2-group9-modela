import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { LoginDTO, SignupActorDTO, SignupCastingDTO } from './auth.dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/actor')
  @ApiOperation({ summary: 'signup for actor' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'Already signup' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupActor(@Body() signupActorDTO: SignupActorDTO) {
    return 'this will signup Actor'
  }

  @Post('signup/casting')
  @ApiOperation({ summary: 'signup for casting' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'Already signup' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupCasting(@Body() signupCastingDTO: SignupCastingDTO) {
    return 'this will signup Casting'
  }

  @Post('login')
  @ApiOperation({ summary: 'login for user' })
  @ApiCreatedResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  login(@Body() loginDTO: LoginDTO) {
    return 'this will login user'
  }
}
