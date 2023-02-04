export interface CardProps {
  title: string
  companyName: string
  description: string
  castingImage: string
  gender: string
  actorCount: number
  wage: number
  dueDate: Date
}
export interface CardArray {
  cardData: CardProps[]
}
