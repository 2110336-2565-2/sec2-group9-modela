import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator'
const maxInt32 = 2147483647 //max int32

export class PostResumeDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty()
    resumeUrl: string

}