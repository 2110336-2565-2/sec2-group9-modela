import { ApiProperty } from '@nestjs/swagger'
import { Casting, User, UserType } from '@modela/database'

export class GetUserDto implements Partial<User & Casting> {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  isVerified: boolean

  @ApiProperty()
  type: UserType

  @ApiProperty()
  profileImageUrl?: string

  @ApiProperty()
  companyName?: string
}
