import {
  LoginDto,
  SignupActorWithFileDto,
  SignupCastingWithFileDto,
} from '@modela/dtos'
import { Body, Controller, Post, Res } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Express, Response } from 'express'

import { CheckedFile, UseFileUpload } from '../file/file.decorator'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/actor')
  @UseFileUpload()
  @ApiOperation({ summary: 'signup for actor' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'This email is already used' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupActor(
    @Body() signupActorDto: SignupActorWithFileDto,
    @CheckedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    delete signupActorDto.file
    return this.authService.createActor(signupActorDto, file, res)
  }

  @Post('signup/casting')
  @UseFileUpload()
  @ApiOperation({ summary: 'signup for casting' })
  @ApiCreatedResponse({ description: 'Signup successful' })
  @ApiConflictResponse({ description: 'This email is already used' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  signupCasting(
    @Body() signupCastingDto: SignupCastingWithFileDto,
    @CheckedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    delete signupCastingDto.file
    return this.authService.createCasting(signupCastingDto, file, res)
  }

  @Post('login')
  @ApiOperation({ summary: 'login for user' })
  @ApiCreatedResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.verfyPassword(loginDto, res)
  }

  @Post('logout')
  @ApiOperation({ summary: 'logout for user' })
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.removeJwtToken(res)
  }
}
