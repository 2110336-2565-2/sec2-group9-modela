import { GetUserDto } from '@modela/dtos'

export interface IUserContext {
  user: GetUserDto | null
  refetch: () => Promise<void>
  reset: () => void
}
