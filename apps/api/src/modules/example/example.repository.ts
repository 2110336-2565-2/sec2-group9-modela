import { Injectable } from '@nestjs/common'
import { Example, Prisma } from 'database'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ExampleRepository {
  constructor(private prisma: PrismaService) {}
  async createExample(params: {
    data: Prisma.ExampleCreateInput
  }): Promise<Example> {
    const { data } = params
    return this.prisma.example.create({ data })
  }

  async getExampleById(id: number): Promise<Example> {
    return this.prisma.example.findUnique({
      where: { id },
    })
  }

  async getExample(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ExampleWhereUniqueInput
    where?: Prisma.ExampleWhereInput
    orderBy?: Prisma.ExampleOrderByWithRelationInput
  }): Promise<Example[]> {
    return this.prisma.example.findMany(params)
  }

  async updateExample(params: {
    where: Prisma.ExampleWhereUniqueInput
    data: Prisma.ExampleUpdateInput
  }): Promise<Example> {
    const { where, data } = params
    return this.prisma.example.update({ where, data })
  }

  async deleteExample(id: number): Promise<Example> {
    return this.prisma.example.delete({ where: { id } })
  }
}
