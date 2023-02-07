export interface CardProps {
  title: string
  companyName: string
  description: string
  castingImage: string
  status: string
  gender: string
  actorCount: number
  wage: number
  applicationDeadline: Date
  jobId: number
}
export interface CardArray {
  job: CardProps[]
  maxPage: number
}
