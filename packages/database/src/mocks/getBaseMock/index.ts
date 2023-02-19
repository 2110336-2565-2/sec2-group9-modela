import { faker } from '@faker-js/faker'
import {
  ApplicationStatus,
  Gender,
  JobStatus,
  UserStatus,
  UserType,
} from '@prisma/client'

import {
  NUMBER_OF_ACTOR,
  NUMBER_OF_ADMIN,
  NUMBER_OF_MOCK,
  NUMBER_OF_USER,
} from '../../constants'
import { BaseModel } from '../../types'

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
const getActorByResumeId = (resumeId: number, ignoreIntegrity?: boolean) =>
  ignoreIntegrity ? getId() : resumeActorIdList[resumeId - 1]

export const getBaseMock = (
  model: BaseModel,
  index: number,
  ignoreIntegrity?: boolean,
) => {
  switch (model) {
    case 'example':
      return {
        id: index,
        name: faker.name.firstName(),
      }
    case 'user':
      return {
        userId: index,
        email:
          index <= NUMBER_OF_ADMIN
            ? `admin${((index - 1) % 10) + 1}@gmail.com`
            : index <= NUMBER_OF_ADMIN + NUMBER_OF_ACTOR
            ? `actor${((index - 1) % 10) + 1}@gmail.com`
            : `casting${((index - 1) % 10) + 1}@gmail.com`,
        password:
          '$2a$10$jikY3o7Apw/.NMTQjtLC1OMLUwEM73dpWaM7T5WEmjB5lguG/wZce',
        type:
          index <= NUMBER_OF_ADMIN
            ? UserType.ADMIN
            : index <= NUMBER_OF_ADMIN + NUMBER_OF_ACTOR
            ? UserType.ACTOR
            : UserType.CASTING,
        status: UserStatus.ACCEPTED,
        profileImageUrl: faker.image.avatar(),
        phoneNumber: faker.phone.number(),
        bankName: faker.company.name(),
        bankAccount: faker.finance.account(),
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        createdAt: faker.date.past(),
        description: faker.lorem.paragraph(),
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
          Gender.OTHER,
        ]),
        ethnicity: faker.address.country(),
        birthDate: faker.date.birthdate(),
        religion: faker.word.noun(),
        hairColor: faker.color.human(),
        eyeColor: faker.color.human(),
        height: faker.datatype.number({ min: 100, max: 200 }),
        weight: faker.datatype.number({ min: 30, max: 120 }),
        bust: faker.datatype.number({ min: 20, max: 40 }),
        waist: faker.datatype.number({ min: 20, max: 40 }),
        hips: faker.datatype.number({ min: 20, max: 40 }),
        shoeSize: faker.datatype.number({ min: 40, max: 50 }),
        skinShade: faker.color.human(),
      }
    case 'casting':
      return {
        castingId: index + NUMBER_OF_ADMIN + NUMBER_OF_ACTOR,
        companyName: faker.company.name(),
        companyId: faker.random.numeric(13),
        employmentCertUrl: faker.internet.url(),
      }
    case 'resume': {
      const actorId = getActorId(true)
      resumeActorIdList.push(actorId)
      return {
        resumeId: index,
        actorId,
        name: faker.name.jobType(),
        resumeUrl: faker.internet.url(),
      }
    }
    case 'job':
      return {
        jobId: index,
        castingId: getCastingId(true),
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraphs(),
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
          Gender.OTHER,
          Gender.ANY,
        ]),
        actorCount: faker.datatype.number({ min: 1, max: 10 }),
        wage: faker.datatype.number({ min: 10000, max: 1000000 }),
        applicationDeadline: faker.date.past(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      }
    case 'shooting':
      return {
        shootingId: index,
        jobId: getId(),
        shootingLocation: faker.address.secondaryAddress(),
        startDate: faker.date.soon(),
        endDate: faker.date.soon(),
        startTime: faker.date.soon(),
        endTime: faker.date.soon(),
      }
    case 'application': {
      const resumeId = getId()
      return {
        applicationId: index,
        jobId: getId(),
        actorId: getActorByResumeId(resumeId, ignoreIntegrity),
        resumeId,
        status: faker.helpers.arrayElement([
          ApplicationStatus.OFFER_ACCEPTED,
          ApplicationStatus.OFFER_REJECTED,
          ApplicationStatus.OFFER_SENT,
          ApplicationStatus.PENDING,
          ApplicationStatus.REJECTED,
        ]),
        createdAt: faker.date.past(),
      }
    }
    case 'report':
      return {
        reportId: index,
        reporterId: getActorId(true),
        jobId: getId(),
        reason: faker.lorem.sentence(),
        createdAt: faker.date.past(),
      }
    case 'notification':
      return {
        notificationId: index,
        userId: index % 2 === 0 ? getActorId(true) : getCastingId(true),
        message: faker.lorem.sentence(),
        link: faker.internet.url(),
        isRead: faker.datatype.boolean(),
        createdAt: faker.date.past(),
      }
  }
}
