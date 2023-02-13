import { GetUserDto, UserType } from '@modela/dtos'

export const mockUser = (
  type: UserType = UserType.ACTOR,
  isVerified: boolean = true,
) => {
  const MOCK_USER = {
    firstName: 'Ayaka',
    middleName: '<3',
    lastName: 'Kamisato',
    profileImageUrl: 'https://i.imgur.com/0Z0Z0Z0.jpg',
    companyName: 'Yashiro Commission',
  }

  const refetchSpy = jest.fn()
  const resetSpy = jest.fn()

  let returnUser: GetUserDto = {
    ...MOCK_USER,
    companyName: undefined,
    isVerified: isVerified,
    type: type,
  }

  const useUserSpy = jest.fn()

  const mockReturn = (user: GetUserDto | null) => {
    useUserSpy.mockReturnValue({ user, refetch: refetchSpy, reset: resetSpy })
  }

  mockReturn(returnUser)

  const mockUserType = (type: UserType) => {
    returnUser = { ...returnUser, type }
    if (type === UserType.CASTING)
      returnUser = { ...returnUser, companyName: MOCK_USER.companyName }
    mockReturn(returnUser)
  }

  const mockVerify = (isVerified: boolean) => {
    returnUser = { ...returnUser, isVerified }
    mockReturn(returnUser)
  }

  const mockNotLoggedIn = () => {
    mockReturn(null)
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
