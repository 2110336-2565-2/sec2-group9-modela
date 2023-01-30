import { UserType } from 'common/types/prisma'

export interface UserData {
  firstName: string
  isVerified: boolean
  type: UserType
}
