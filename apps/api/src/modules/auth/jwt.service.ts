import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtDto } from './auth.dto'

const cookieExtractor = function (req) {
  if (req && req.cookies) {
    return req.cookies['token']
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: configService.get<string>('jwt.secret'),
    })
  }

  validate(payload: JwtDto): JwtDto {
    return payload
  }
}
