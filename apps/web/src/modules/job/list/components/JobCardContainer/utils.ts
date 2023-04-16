import { UserType } from '@modela/dtos'

export const getCardType = (userType: UserType, isHistory?: boolean) => {
  if (isHistory) return 'history'
  else if (userType === UserType.ADMIN) return 'reported'
  else if (userType === UserType.ACTOR) return 'reportWithApply'
  else if (userType === UserType.CASTING) return 'edit'
  return 'base'
}
