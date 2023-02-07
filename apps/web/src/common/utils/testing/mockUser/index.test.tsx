import { UserType } from '@modela/database'
import { renderHook } from '@testing-library/react'

import { mockUser } from '.'

describe('mockUser()', () => {
  const { mockUserType, mockVerify, mockNotLoggedIn, MOCK_USER } = mockUser()

  const { useUser } =
    require('common/context/UserContext') as typeof import('common/context/UserContext')

  it('should mock user correctly', () => {
    const { result } = renderHook(() => useUser())

    expect(result.current).toEqual({
      ...MOCK_USER,
      companyName: undefined,
      type: UserType.ACTOR,
      isVerified: true,
    })
  })

  it('should mock admin correctly', () => {
    mockUserType(UserType.ADMIN)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      type: UserType.ADMIN,
    })
  })

  it('should mock casting correctly', () => {
    mockUserType(UserType.CASTING)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      type: UserType.CASTING,
      companyName: MOCK_USER.companyName,
    })
  })

  it('should mock user verification correctly', () => {
    mockVerify(false)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      isVerified: false,
    })
  })

  it('should mock not logged in correctly', () => {
    mockNotLoggedIn()
    const { result } = renderHook(() => useUser())

    expect(result.current).toBeNull()
  })
})
