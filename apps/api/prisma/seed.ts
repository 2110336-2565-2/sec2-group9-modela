import { PrismaClient } from '@prisma/client'

import { NUMBER_OF_MOCK, NUMBER_OF_USER } from '../src/common/constants'
import { getBaseMock } from '../src/common/mocks'
import { BaseModel } from '../src/common/types'

const prisma = new PrismaClient()

const getMock = (model: BaseModel, index: number) => {
  const mock = getBaseMock(model, index)
  delete mock['createdAt']
  delete mock['updatedAt']
  if (model !== 'actor' && model !== 'casting') delete mock[`${model}Id`]
  return mock
}

async function seed(model: BaseModel, mockCount: number = NUMBER_OF_MOCK) {
  for (let i = 1; i <= mockCount; ++i) {
    await prisma[model as string].create({
      data: getMock(model, i),
    })
  }

  console.log(`seed ${model} done`)
}

async function main() {
  await Promise.all([seed('example'), seed('user', NUMBER_OF_USER)])
  await Promise.all([seed('actor'), seed('casting')])
  await Promise.all([seed('resume'), seed('job')])
  await Promise.all([
    seed('application'),
    seed('report'),
    seed('notification'),
    seed('shooting'),
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export {}
