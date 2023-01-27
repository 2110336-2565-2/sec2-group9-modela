import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const NUMBER_OF_EXAMPLE = 10

async function seedExample() {
  for (let i = 0; i < NUMBER_OF_EXAMPLE; ++i) {
    await prisma.example.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        name: faker.name.firstName(),
      },
    })
  }

  console.log('seed example done')
}

async function main() {
  await Promise.all([seedExample()])
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
