import { GetUserDto, UserType } from '@modela/dtos'

export const mockUser = () => {
  const MOCK_USER = {
    firstName: 'Ayaka',
    middleName: '<3',
    lastName: 'Kamisato',
    profileImageUrl: 'https://i.imgur.com/0Z0Z0Z0.jpg',
    companyName: 'Yashiro Commission',
  }

  let returnValue: GetUserDto = {
    ...MOCK_USER,
    companyName: undefined,
    isVerified: true,
    type: UserType.ACTOR,
  }

  const useUserSpy = jest.fn().mockReturnValue(returnValue)

  const mockUserType = (type: UserType) => {
    returnValue = { ...returnValue, type }
    if (type === UserType.CASTING)
      returnValue = { ...returnValue, companyName: MOCK_USER.companyName }
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

  return {
    mockUserType,
    mockVerify,
    mockNotLoggedIn,
    MOCK_USER,
  }
}
