import { JwtDto } from '@modela/dtos'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/database/prisma.service'

import { AuthService } from '../auth.service'

const cookieExtractor = function (req) {
  if (req && req.cookies) {
    return req.cookies['token']
  }
  return null
}

@Injectable()
export class JwtAnyStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: configService.get<string>('jwt.secret'),
      passReqToCallback: true,
    })
  }

  async validate(req, payload: JwtDto): Promise<JwtDto> {
    if (!payload.isVerified) {
      const user = await this.prismaService.user.findUnique({
        where: {
          userId: payload.userId,
        },
      })
      if (!user || !user.isVerified) return payload
      this.authService.createJwtToken(user, req.res)
      return {
        isVerified: user.isVerified,
        ...payload,
      }
    }
    return payload
  }
}

@Injectable()
export class JwtVerifiedStrategy extends PassportStrategy(
  Strategy,
  'jwt-verified',
) {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: configService.get<string>('jwt.secret'),
      passReqToCallback: true,
    })
  }
  async validate(req, payload: JwtDto): Promise<JwtDto> {
    if (!payload.isVerified) {
      const user = await this.prismaService.user.findUnique({
        where: {
          userId: payload.userId,
        },
      })
      if (!user || !user.isVerified)
        throw new ForbiddenException('Not verified')
      this.authService.createJwtToken(user, req.res)
      return {
        isVerified: user.isVerified,
        ...payload,
      }
    }
    return payload
  }
}
