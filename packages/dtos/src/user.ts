import { ApiProperty } from '@nestjs/swagger'
import { User, UserType } from '@modela/database'

export class GetUserDto implements Partial<User> {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  isVerified: boolean

  @ApiProperty()
  type: UserType
}
