import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Example } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'

export class getExampleDto implements Partial<Example> {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string
}
export class CreateExampleDto implements Partial<Example> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string
}

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}
