import { renderHook, waitFor } from '@testing-library/react'
import { UserType } from 'common/types/prisma'
import { mockApiClient } from 'common/utils/testing/mockApiClient'

describe('useUserData()', () => {
  const { getSpy, mockGetReturn } = mockApiClient()

  const MOCK_USER_DATA = {
    firstName: 'firstname',
    isVerified: false,
    type: UserType.ACTOR,
  }
  mockGetReturn(MOCK_USER_DATA)

  const { default: useUserData } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', () => {
      const { result } = renderHook(useUserData)

      expect(result.current.isLoading).toBe(true)
      expect(result.current.user).toBe(null)
    })

    it('should fetch user data correctly', async () => {
      const { result } = renderHook(useUserData)

      expect(getSpy).toBeCalledWith('/user/me')

      await waitFor(() => expect(result.current.isLoading).toBe(false))
      expect(result.current.user).toEqual(MOCK_USER_DATA)
    })
  })
})
