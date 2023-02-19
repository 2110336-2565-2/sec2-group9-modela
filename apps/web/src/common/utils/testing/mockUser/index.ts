import { UserStatus } from '@modela/database'
import { GetUserDto, UserType } from '@modela/dtos'

export const mockUser = (
  type: UserType = UserType.ACTOR,
  status: UserStatus = UserStatus.ACCEPTED,
) => {
  const MOCK_USER = {
    userId: 1,
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
    companyName: type === UserType.CASTING ? MOCK_USER.companyName : undefined,
    status,
    type,
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

  const mockVerify = (status: UserStatus) => {
    returnUser = { ...returnUser, status }
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
