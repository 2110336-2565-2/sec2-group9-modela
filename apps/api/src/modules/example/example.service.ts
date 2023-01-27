import { Injectable } from '@nestjs/common'

import { CreateExampleDto, UpdateExampleDto } from './example.dto'
import { ExampleRepository } from './example.repository'

@Injectable()
export class ExampleService {
  constructor(private repository: ExampleRepository) {}
  async createExample(createExampleDto: CreateExampleDto) {
    const { name } = createExampleDto
    const example = await this.repository.createExample({
      data: {
        name,
      },
    })

    return example
  }

  async getAllExample() {
    const examples = await this.repository.getExample({})
    return examples
  }
}
