import {
  applyDecorators,
  CanActivate,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'
import { UserType } from '@prisma/client'

import { JwtAuthGuard } from './jwt-auth.guard'

export const UseAuthGuard = () => {
  return applyDecorators(UseGuards(JwtAuthGuard))
}
// TODO
// export const UseTypeAuthGuard = (...types: UserType[]) => {
//     return applyDecorators(
//         SetMetadata('type',types),
//         UseGuards(JwtAuthGuard),
//     )
// }
