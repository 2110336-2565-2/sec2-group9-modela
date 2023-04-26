import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Casting, User, UserStatus, UserType } from '@modela/database'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class GetUserDto implements Partial<User & Casting> {
  @ApiProperty()
  firstName: string

  @ApiPropertyOptional()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiProperty({ enum: UserStatus })
  status: UserStatus

  @ApiProperty({ enum: UserType })
  type: UserType

  @ApiPropertyOptional()
  profileImageUrl?: string

  @ApiPropertyOptional()
  companyName?: string

  @ApiProperty()
  userId: number
}

export class UpdateUserStatusDto {
  @IsNotEmpty()
  @IsEnum(UserStatus)
  @ApiProperty({ enum: UserStatus })
  status: UserStatus

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  rejectedReason?: string
}

export class PendingUserDataDto {
  @ApiProperty()
  userId: number

  @ApiProperty()
  firstName: string

  @ApiPropertyOptional()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiPropertyOptional()
  rejectedReason?: string

  // Casting
  @ApiPropertyOptional()
  companyName?: string

  @ApiPropertyOptional()
  companyId?: string

  @ApiPropertyOptional()
  employmentCertUrl?: string

  // Actor
  @ApiPropertyOptional()
  idCardImageUrl?: string

  @ApiPropertyOptional()
  ssn?: string
}

export class PendingUserDto {
  @ApiProperty({ enum: UserType })
  type: UserType

  @ApiProperty({ type: PendingUserDataDto })
  data: PendingUserDataDto
}
