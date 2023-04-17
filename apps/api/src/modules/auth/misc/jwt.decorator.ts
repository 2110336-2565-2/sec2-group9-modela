import { UserType } from '@modela/database'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { JwtAuthGuard, JwtUnverifyGuard } from './jwt-auth.guard'
import { TypesGuard } from './type.guard'

export const UseAuthGuard = (...types: UserType[]) => {
  return applyDecorators(
    SetMetadata('types', types),
    UseGuards(JwtAuthGuard, TypesGuard),
  )
}

export const UseUnverifyGuard = (...types: UserType[]) => {
  return applyDecorators(
    SetMetadata('types', types),
    UseGuards(JwtUnverifyGuard, TypesGuard),
  )
}
