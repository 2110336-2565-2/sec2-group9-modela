import { Actor, Casting, Gender, User, UserType } from '@modela/database'
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  refs,
} from '@nestjs/swagger'
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class EditUserProfileDto implements Partial<User> {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  profileImageUrl?: string

  @ApiPropertyOptional()
  @IsPhoneNumber('TH')
  @IsOptional()
  phoneNumber?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bankName?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bankAccount?: string
}

export class EditCastingProfileDto extends EditUserProfileDto {}

export class EditActorProfileDto extends EditUserProfileDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nickname?: string

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  height?: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  weight?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  eyeColor?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hairColor?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  waist?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  bust?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  hips?: number

  // assume that it is EU format
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  shoeSize?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  skinShade?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ethnicity?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  religion?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birthDate?: Date
}

export class GetProfileForEditingDto {
  @ApiProperty({ enum: UserType, example: UserType.ACTOR })
  type: UserType

  @ApiProperty({
    oneOf: refs(EditActorProfileDto, EditCastingProfileDto),
  })
  data: EditActorProfileDto | EditCastingProfileDto
}
export class GetUserProfileDto implements Partial<User> {
  @ApiPropertyOptional()
  profileImageUrl?: string

  @ApiPropertyOptional()
  phoneNumber?: string

  @ApiProperty()
  firstName: string

  @ApiPropertyOptional()
  middleName?: string

  @ApiProperty()
  lastName: string

  @ApiPropertyOptional()
  description?: string
}

export class GetCastingProfileDto extends GetUserProfileDto {
  @ApiProperty()
  companyName: string
}
export class GetActorProfileDto
  extends GetUserProfileDto
  implements EditActorProfileDto
{
  @ApiPropertyOptional()
  prefix?: string

  @ApiPropertyOptional()
  nationality?: string

  @ApiPropertyOptional({ enum: Gender })
  gender?: Gender

  @ApiPropertyOptional()
  ethnicity?: string

  @ApiPropertyOptional()
  age?: number

  @ApiPropertyOptional()
  religion?: string

  @ApiPropertyOptional()
  nickname?: string

  @ApiPropertyOptional()
  height?: number

  @ApiPropertyOptional()
  weight?: number

  @ApiPropertyOptional()
  eyeColor?: string

  @ApiPropertyOptional()
  hairColor?: string

  @ApiPropertyOptional()
  waist?: number

  @ApiPropertyOptional()
  bust?: number

  @ApiPropertyOptional()
  hips?: number

  // assume that it is EU format
  @ApiPropertyOptional()
  shoeSize?: number

  @ApiPropertyOptional()
  skinShade?: string

  @ApiPropertyOptional()
  rating?: number
}

@ApiExtraModels(GetActorProfileDto, GetCastingProfileDto)
export class GetProfileForViewingDto {
  @ApiProperty({ enum: UserType, example: UserType.ACTOR })
  type: UserType

  @ApiProperty({
    oneOf: refs(GetActorProfileDto, GetCastingProfileDto),
  })
  data: GetActorProfileDto | GetCastingProfileDto
}
