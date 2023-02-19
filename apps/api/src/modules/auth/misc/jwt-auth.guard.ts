import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
//TODO: Change to 'jwt-verified' when implement verify feature
export class JwtAuthGuard extends AuthGuard('jwt-verified') {}

@Injectable()
export class JwtUnverifyGuard extends AuthGuard('jwt') {}
