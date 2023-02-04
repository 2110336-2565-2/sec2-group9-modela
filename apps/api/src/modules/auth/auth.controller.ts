import { LoginDto, SignupActorDto, SignupCastingDto } from '@modela/dtos'
import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response } from 'express'

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
  signupActor(
    @Body() signupActorDto: SignupActorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.createActor(signupActorDto, res)
  }

  @Post('signup/casting')
  @ApiOperation({ summary: 'signup for casting' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'This email is already used' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupCasting(
    @Body() signupCastingDto: SignupCastingDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.createCasting(signupCastingDto, res)
  }

  @Post('login')
  @ApiOperation({ summary: 'login for user' })
  @ApiCreatedResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.verfyPassword(loginDto, res)
  }

  @Get('logout')
  @ApiOperation({ summary: 'login for user' })
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.removeJwtToken(res)
  }
}
