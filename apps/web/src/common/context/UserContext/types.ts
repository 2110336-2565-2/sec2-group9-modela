export interface UserData {
  firstName: string
  isVerified: boolean
  type: UserType
}

// TODO use shared type
export enum UserType {
  ACTOR = 'ACTOR',
  CASTING = 'CASTING',
  ADMIN = 'ADMIN',
}
