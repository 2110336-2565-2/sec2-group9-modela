import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator'
const maxInt32 = 2147483647 //max int32

export class ResumeDto{

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    resumeId: number

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

export class PostResumeDto extends OmitType(ResumeDto, ['resumeId']) {}

export class GetResumeDto extends ResumeDto {}

export class GetResumesDto {
    @ApiProperty({ type: ResumeDto, isArray: true })
    resumes: ResumeDto[]
}

export class ResumeIdDto {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    resumeId: number
}