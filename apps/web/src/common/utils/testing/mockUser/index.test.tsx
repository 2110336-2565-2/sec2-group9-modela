import { UserStatus } from '@modela/database'
import { UserType } from '@modela/dtos'
import { renderHook } from '@testing-library/react'

import { mockUser } from '.'

describe('mockUser()', () => {
  const { mockUserType, mockVerify, mockNotLoggedIn, MOCK_USER } = mockUser()

  const { useUser } =
    require('common/context/UserContext') as typeof import('common/context/UserContext')

  it('should mock user correctly', () => {
    const { result } = renderHook(() => useUser())

    expect(result.current).toEqual({
      user: {
        ...MOCK_USER,
        companyName: undefined,
        type: UserType.ACTOR,
        status: UserStatus.ACCEPTED,
      },
      refetch: expect.any(Function),
      reset: expect.any(Function),
    })
  })

  it('should mock admin correctly', () => {
    mockUserType(UserType.ADMIN)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      user: {
        type: UserType.ADMIN,
      },
    })
  })

  it('should mock casting correctly', () => {
    mockUserType(UserType.CASTING)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      user: {
        type: UserType.CASTING,
        companyName: MOCK_USER.companyName,
      },
    })
  })

  it('should mock user verification correctly', () => {
    mockVerify(UserStatus.REJECTED)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      user: {
        status: UserStatus.REJECTED,
      },
    })
  })

  it('should mock not logged in correctly', () => {
    mockNotLoggedIn()
    const { result } = renderHook(() => useUser())

    expect(result.current.user).toBeNull()
  })
})
