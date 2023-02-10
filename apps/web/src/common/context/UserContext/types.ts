import { GetUserDto } from '@modela/dtos'

export interface IUserContext {
  user: GetUserDto | null
  refetch: () => void
  reset: () => void
}
