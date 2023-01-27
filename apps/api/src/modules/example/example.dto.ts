import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Example } from '@prisma/client'

export class CreateExampleDto implements Partial<Example> {
  @ApiProperty()
  name: string
}

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}
