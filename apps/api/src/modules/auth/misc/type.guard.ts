import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class TypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchType(types: string[], userType): boolean {
    return types.includes(userType)
  }

  canActivate(context: ExecutionContext): boolean {
    const types = this.reflector.get<string[]>('types', context.getHandler())
    if (!types || types.length === 0) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchType(types, user.type)
  }
}
