export interface cardProps {
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
  shootingList: shooting[]
}

export interface headerProps {
  title: string
  companyName: string
  castingImage: string
}

export interface footerProps {
  gender: string
  actorCount: number
  wage: number
  dueDate: Date
}

export interface shooting {
  startDate: Date
  endDate: Date
  location: string
  startTimes: Date
  endTimes: Date
}
