import { Injectable } from '@nestjs/common'
import { Example, Prisma } from '@prisma/client'
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

  async getExample(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ExampleWhereUniqueInput
    where?: Prisma.ExampleWhereInput
    orderBy?: Prisma.ExampleOrderByWithRelationInput
  }): Promise<Example[]> {
    return this.prisma.example.findMany()
  }

  async updateExample(params: {
    where: Prisma.ExampleWhereUniqueInput
    data: Prisma.ExampleUpdateInput
  }): Promise<Example> {
    const { where, data } = params
    return this.prisma.example.update({ where, data })
  }

  async deleteExample(params: {
    where: Prisma.ExampleWhereUniqueInput
  }): Promise<Example> {
    const { where } = params
    return this.prisma.example.delete({ where })
  }
}
