import { faker } from '@faker-js/faker'
import {
  ApplicationStatus,
  Gender,
  JobStatus,
  PrismaClient,
  UserType,
} from '@prisma/client'

const prisma = new PrismaClient()
const NUMBER_OF_MOCK = 10

const NUMBER_OF_ADMIN = 10
const NUMBER_OF_ACTOR = 10
const NUMBER_OF_CASTING = 10
const NUMBER_OF_USER = NUMBER_OF_ADMIN + NUMBER_OF_ACTOR + NUMBER_OF_CASTING

const getId = () => faker.datatype.number({ min: 1, max: NUMBER_OF_MOCK })

const getActorId = (verified?: boolean) => {
  const id = faker.datatype.number({
    min: NUMBER_OF_ADMIN + 1,
    max: NUMBER_OF_ADMIN + NUMBER_OF_ACTOR,
  })
  if (verified && id % 2 === 1) return id + 1
  return id
}

const getCastingId = (verified?: boolean) => {
  const id = faker.datatype.number({
    min: NUMBER_OF_ADMIN + NUMBER_OF_ACTOR + 1,
    max: NUMBER_OF_USER,
  })
  if (verified && id % 2 === 1) return id + 1
  return id
}

const resumeActorIdList: number[] = []
const getActorByResumeId = (resumeId: number) => resumeActorIdList[resumeId - 1]

const getMock = (model: string, index: number) => {
  switch (model) {
    case 'example':
      return {
        name: faker.name.firstName(),
      }
    case 'user':
      return {
        email: faker.helpers.unique(faker.internet.email),
        password: faker.internet.password(),
        type:
          index <= NUMBER_OF_ADMIN
            ? UserType.ADMIN
            : index <= NUMBER_OF_ADMIN + NUMBER_OF_ACTOR
            ? UserType.ACTOR
            : UserType.CASTING,
        isVerified: index % 2 === 0,
        profileImageUrl: faker.image.avatar(),
        phoneNumber: faker.phone.number(),
        bankName: faker.company.name(),
        bankAccount: faker.finance.account(),
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
      }
    case 'actor':
      return {
        actorId: index + NUMBER_OF_ADMIN,
        idCardImageUrl: faker.image.image(640, 480, true),
        age: faker.datatype.number({ min: 10, max: 80 }),
        prefix: faker.name.prefix(),
        nickname: faker.internet.userName(),
        nationality: faker.address.country(),
        ssn: faker.random.numeric(13),
        gender: faker.helpers.arrayElement([
          Gender.MALE,
          Gender.FEMALE,
          Gender.LGBTQ,
        ]),
        ethnicity: faker.address.country(),
        birthDate: faker.date.birthdate(),
        religion: faker.word.noun(),
        description: faker.lorem.paragraph(),
        hairColor: faker.color.human(),
        eyeColor: faker.color.human(),
        height: faker.datatype.number({ min: 100, max: 200 }),
        weight: faker.datatype.number({ min: 30, max: 120 }),
        bust: faker.datatype.number({ min: 20, max: 40 }),
        waist: faker.datatype.number({ min: 20, max: 40 }),
        hips: faker.datatype.number({ min: 20, max: 40 }),
        shoeSize: faker.datatype.number({ min: 40, max: 50 }),
        skinShade: faker.color.human(),
        bodyModifications: faker.lorem.sentence(),
      }
    case 'casting':
      return {
        castingId: index + NUMBER_OF_ADMIN + NUMBER_OF_ACTOR,
        companyId: faker.random.numeric(13),
        employmentCertUrl: faker.internet.url(),
      }
    case 'resume': {
      const actorId = getActorId(true)
      resumeActorIdList.push(actorId)
      return {
        actorId,
        resumeUrl: faker.internet.url(),
      }
    }
    case 'job':
      return {
        castingId: getCastingId(true),
        title: faker.name.jobTitle(),
        description: faker.name.jobDescriptor(),
        status: faker.helpers.arrayElement([
          JobStatus.CANCELLED,
          JobStatus.FINISHED,
          JobStatus.OPEN,
          JobStatus.SELECTING,
          JobStatus.SELECTION_ENDED,
        ]),
        role: faker.name.jobType(),
        minAge: faker.datatype.number({ min: 10, max: 20 }),
        maxAge: faker.datatype.number({ min: 20, max: 30 }),
        gender: faker.helpers.arrayElement([
          Gender.MALE,
          Gender.FEMALE,
          Gender.LGBTQ,
        ]),
        actorCount: faker.datatype.number({ min: 1, max: 10 }),
        wage: faker.datatype.number({ min: 10000, max: 1000000 }),
        workStartDate: faker.date.future(),
        workEndDate: faker.date.future(),
        applicationDeadline: faker.date.past(),
        location: faker.address.secondaryAddress(),
      }
    case 'application': {
      const resumeId = getId()
      return {
        jobId: getId(),
        actorId: getActorByResumeId(resumeId),
        resumeId,
        status: faker.helpers.arrayElement([
          ApplicationStatus.OFFER_ACCEPTED,
          ApplicationStatus.OFFER_REJECTED,
          ApplicationStatus.OFFER_SENT,
          ApplicationStatus.PENDING,
          ApplicationStatus.REJECTED,
        ]),
      }
    }
    case 'report':
      return {
        reporterId: getActorId(true),
        jobId: getId(),
        reason: faker.lorem.sentence(),
      }
    case 'notification':
      return {
        userId: index % 2 === 0 ? getActorId(true) : getCastingId(true),
        message: faker.lorem.sentence(),
        link: faker.internet.url(),
        isRead: faker.datatype.boolean(),
      }
  }
}

async function seed(model: string, mockCount: number = NUMBER_OF_MOCK) {
  for (let i = 1; i <= mockCount; ++i) {
    await prisma[model].create({
      data: getMock(model, i),
    })
  }

  console.log(`seed ${model} done`)
}

async function main() {
  await Promise.all([seed('example'), seed('user', NUMBER_OF_USER)])
  await Promise.all([seed('actor'), seed('casting')])
  await Promise.all([seed('resume'), seed('job')])
  await Promise.all([seed('application'), seed('report'), seed('notification')])
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
