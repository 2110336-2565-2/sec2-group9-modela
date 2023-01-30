import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtDto } from './auth.dto'

const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['token']
  }
  return token
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
