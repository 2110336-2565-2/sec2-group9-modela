import { ApiProperty } from '@nestjs/swagger'
import { User, UserType } from '@prisma/client'

export class GetUserDto implements Partial<User> {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  isVerified: boolean

  @ApiProperty()
  type: UserType
}
