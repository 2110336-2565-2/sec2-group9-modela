import { CreateExampleDto, UpdateExampleDto } from '@modela/dtos'
import { Injectable, NotFoundException } from '@nestjs/common'

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

  async getExampleById(id: number) {
    const example = await this.repository.getExampleById(id)
    if (!example) throw new NotFoundException()

    return example
  }

  async updateExample(id: number, updateExampleDto: UpdateExampleDto) {
    const { name } = updateExampleDto

    if (!(await this.repository.getExampleById(id)))
      throw new NotFoundException()

    const example = await this.repository.updateExample({
      where: { id },
      data: {
        name,
      },
    })

    return example
  }

  async deleteExample(id: number) {
    if (!(await this.repository.getExampleById(id)))
      throw new NotFoundException()

    const example = await this.repository.deleteExample(id)

    return example
  }
}
