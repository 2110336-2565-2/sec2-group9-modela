import { UserType } from '@modela/database'
import {
  applyDecorators,
  CanActivate,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from './jwt-auth.guard'
import { TypesGuard } from './type.guard'

export const UseAuthGuard = () => {
  return applyDecorators(UseGuards(JwtAuthGuard))
}

export const UseTypeAuthGuard = (...types: UserType[]) => {
  return applyDecorators(
    SetMetadata('types', types),
    UseGuards(JwtAuthGuard, TypesGuard),
  )
}
