import { faker } from '@faker-js/faker'
import {
  ApplicationStatus,
  Gender,
  JobStatus,
  NotificationType,
  RefundStatus,
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

const actorResumeDict: { [k: number]: number[] } = {}
const getUniqueActorId = (index: number, ignoreIntegrity?: boolean) => {
  const actorResumeList = Object.keys(actorResumeDict)
  return ignoreIntegrity
    ? getId()
    : parseInt(actorResumeList[index % actorResumeList.length])
}

const getResumeByActorId = (actorId: number, ignoreIntegrity?: boolean) => {
  const resumes = actorResumeDict[actorId]
  return ignoreIntegrity
    ? getId()
    : resumes[faker.datatype.number({ min: 0, max: resumes.length - 1 })]
}

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
      const type =
        index <= NUMBER_OF_ADMIN
          ? UserType.ADMIN
          : index <= NUMBER_OF_ADMIN + NUMBER_OF_ACTOR
          ? UserType.ACTOR
          : UserType.CASTING

      const getType = () => {
        if (type === UserType.ADMIN) return `admin`
        if (type === UserType.ACTOR) return `actor`
        if (type === UserType.CASTING) return `casting`
      }

      const getStatus = () => {
        if (type === UserType.ADMIN) return UserStatus.ACCEPTED
        if (index % 10 === 0) return UserStatus.REJECTED
        if (index % 10 === 9) return UserStatus.PENDING
        return UserStatus.ACCEPTED
      }

      const status = getStatus()

      return {
        userId: index,
        email: `${getType()}${((index - 1) % 10) + 1}@gmail.com`,
        password:
          '$2a$10$jikY3o7Apw/.NMTQjtLC1OMLUwEM73dpWaM7T5WEmjB5lguG/wZce',
        type,
        status,
        rejectedReason:
          status === UserStatus.REJECTED ? faker.lorem.sentence() : null,
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
        idCardImageUrl: `user/credential/${index + NUMBER_OF_ADMIN}`,
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
        employmentCertUrl: `user/credential/${
          index + NUMBER_OF_ADMIN + NUMBER_OF_ACTOR
        }`,
      }
    case 'resume': {
      const actorId = getActorId(true)
      actorResumeDict[actorId] = [
        ...(actorResumeDict[actorId] ? actorResumeDict[actorId] : []),
        index,
      ]
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
        isPaid: index % 2 == 0,
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
      const actorId = getUniqueActorId(index, ignoreIntegrity)
      const applicationStatus = [
        ApplicationStatus.OFFER_ACCEPTED,
        ApplicationStatus.OFFER_REJECTED,
        ApplicationStatus.OFFER_SENT,
        ApplicationStatus.PENDING,
        ApplicationStatus.REJECTED,
      ][index % 5]
      return {
        applicationId: index,
        jobId: Math.ceil(index / 2),
        actorId,
        resumeId: getResumeByActorId(actorId, ignoreIntegrity),
        status: applicationStatus,
        isPaid: index % 10 === 0,
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
      let userId
      let notiType
      if (index % 2 === 0) {
        //Actor
        userId = getActorId(true)
        notiType = faker.helpers.arrayElement([
          NotificationType.REJECT_APPLICATION, //actor
          NotificationType.RECEIVE_OFFER, //actor
          NotificationType.CANCEL_JOB, //use in both
          NotificationType.APPROVE_REFUND, //use in both
        ])
      } else {
        //Casting
        userId = getCastingId(true)
        notiType = faker.helpers.arrayElement([
          NotificationType.ACCEPT_OFFER, //casting
          NotificationType.REJECT_OFFER, //casting
          NotificationType.CANCEL_JOB, //use in both
          NotificationType.APPROVE_REFUND, //use in both
          NotificationType.REJECT_REFUND, //casting
        ])
      }
      return {
        notificationId: index,
        userId,
        applicationId: (index % 2) + 1,
        jobId: (index % 5) + 1,
        type: notiType,
        isRead: faker.datatype.boolean(),
        createdAt: faker.date.past(),
      }
    case 'credit':
      return {
        creditId: index,
        jobId: index,
        proofUrl: faker.internet.url(),
        createdAt: faker.date.past(),
        amount: 5000,
      }
    case 'refund':
      return {
        refundId: index,
        applicationId: index,
        reason: faker.lorem.lines(),
        proofUrl: faker.image.business(),
        refundStatus:
          index % 2 === 0 ? RefundStatus.ACCEPTED : RefundStatus.PENDING,
        createdAt: faker.date.past(),
      }
  }
}
