import { UserType } from '@modela/database'
import { renderHook } from '@testing-library/react'

import { mockUser } from '.'

describe('mockUser()', () => {
  const { mockUserType, mockVerify } = mockUser()

  const { useUser } =
    require('common/context/UserContext') as typeof import('common/context/UserContext')

  it('should mock user correctly', () => {
    const { result } = renderHook(() => useUser())

    expect(result.current).toEqual({
      firstName: 'Ayaka',
      type: UserType.ACTOR,
      isVerified: true,
    })
  })

  it('should mock user type correctly', () => {
    mockUserType(UserType.ADMIN)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      type: UserType.ADMIN,
    })
  })

  it('should mock user verification correctly', () => {
    mockVerify(false)
    const { result } = renderHook(() => useUser())

    expect(result.current).toMatchObject({
      isVerified: false,
    })
  })
})
