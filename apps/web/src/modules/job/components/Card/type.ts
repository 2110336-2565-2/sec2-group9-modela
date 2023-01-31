export interface CardProps {
  title: string
  companyName: string
  description: string
  castingImage: string
  role: string
  gender: string
  minAge: number
  maxAge: number
  actorCount: number
  wage: number
  dueDate: Date
  shootingList: Shooting[]
}

export interface Shooting {
  startDate: Date
  endDate: Date
  location: string
  startTimes: Date
  endTimes: Date
}
