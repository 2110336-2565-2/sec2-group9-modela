import { UserType } from '@modela/database'
import { GetUserDto } from '@modela/dtos'

export const mockUser = () => {
  let returnValue: GetUserDto = {
    firstName: 'Ayaka',
    lastName: 'Kamisato',
    type: UserType.ACTOR,
    isVerified: true,
  }

  const useUserSpy = jest.fn().mockReturnValue(returnValue)

  const mockUserType = (type: UserType) => {
    returnValue = { ...returnValue, type }
    if (type === UserType.CASTING)
      returnValue = { ...returnValue, companyName: 'Yashiro Commission' }
    useUserSpy.mockReturnValue(returnValue)
  }

  const mockVerify = (isVerified: boolean) => {
    returnValue = { ...returnValue, isVerified }
    useUserSpy.mockReturnValue(returnValue)
  }

  const mockNotLoggedIn = () => {
    useUserSpy.mockReturnValue(null)
  }

  jest.doMock('common/context/UserContext', () => ({
    useUser: useUserSpy,
  }))

  return { mockUserType, mockVerify, mockNotLoggedIn }
}
