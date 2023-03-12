import { PendingUserDto } from '@modela/dtos'

export interface cardProps {
  data: PendingUserDto
  accept: Function
  reject: Function
  setId: Function
}
