import {
  Actor,
  Application,
  Casting,
  Credit,
  Example,
  Job,
  Notification,
  Refund,
  Report,
  Resume,
  Shooting,
  User,
} from '@prisma/client'

export type BaseModel = keyof BaseModelType

export type BaseModelType = {
  example: Example
  user: User
  actor: Actor
  casting: Casting
  resume: Resume
  job: Job
  application: Application
  report: Report
  notification: Notification
  shooting: Shooting
  credit: Credit
  refund: Refund
}
