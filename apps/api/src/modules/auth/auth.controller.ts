import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { LoginDto, SignupActorDto, SignupCastingDto } from './auth.dto'
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
  signupActor(@Body() signupActorDto: SignupActorDto) {
    return 'this will signup Actor'
  }

  @Post('signup/casting')
  @ApiOperation({ summary: 'signup for casting' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'Already signup' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupCasting(@Body() signupCastingDto: SignupCastingDto) {
    return this.authService.createCasting(signupCastingDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'login for user' })
  @ApiCreatedResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  login(@Body() loginDto: LoginDto) {
    return 'this will login user'
  }
}
