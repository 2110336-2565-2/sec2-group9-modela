import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Example } from 'database'

export class GetExampleDto implements Partial<Example> {
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
