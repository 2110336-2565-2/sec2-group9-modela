import { UserStatus } from '@modela/database'
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
    if (payload.status !== UserStatus.ACCEPTED) {
      const user = await this.prismaService.user.findUnique({
        where: {
          userId: payload.userId,
        },
      })
      if (!user || user.status !== UserStatus.ACCEPTED) return payload
      this.authService.createJwtToken(user, req.res)
      return {
        status: user.status,
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
    if (payload.status !== UserStatus.ACCEPTED) {
      const user = await this.prismaService.user.findUnique({
        where: {
          userId: payload.userId,
        },
      })
      if (!user || user.status !== UserStatus.ACCEPTED)
        throw new ForbiddenException('Not verified')
      this.authService.createJwtToken(user, req.res)
      return {
        status: user.status,
        ...payload,
      }
    }
    return payload
  }
}
