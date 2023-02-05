import { UserType } from '@modela/database'
import { GetUserDto } from '@modela/dtos'

export const mockUser = () => {
  let returnValue: GetUserDto = {
    firstName: 'Ayaka',
    type: UserType.ACTOR,
    isVerified: true,
  }

  const useUserSpy = jest.fn().mockReturnValue(returnValue)

  const mockUserType = (type: UserType) => {
    returnValue = { ...returnValue, type }
    useUserSpy.mockReturnValue(returnValue)
  }

  const mockVerify = (isVerified: boolean) => {
    returnValue = { ...returnValue, isVerified }
    useUserSpy.mockReturnValue(returnValue)
  }

  jest.doMock('common/context/UserContext', () => ({
    useUser: useUserSpy,
  }))

  return { mockUserType, mockVerify }
}
