import { mock } from '@modela/dtos'
import { renderHook, waitFor } from '@testing-library/react'
import { mockApiClient } from 'common/utils/testing/mockApiClient'

describe('useUserData()', () => {
  const { getSpy, mockGetReturn } = mockApiClient()

  const MOCK_USER_DATA = mock('user')
    .pick(['firstName', 'status', 'type'])
    .get()

  mockGetReturn({ user: MOCK_USER_DATA })

  const { default: useUserData } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', async () => {
      const { result } = renderHook(useUserData)

      expect(result.current.isLoading).toBe(true)
      expect(result.current.user).toBe(null)

      await waitFor(() => expect(result.current.isLoading).toBe(false))
    })

    it('should fetch user data correctly', async () => {
      const { result } = renderHook(useUserData)

      expect(getSpy).toBeCalledWith('/users/me')

      await waitFor(() => expect(result.current.isLoading).toBe(false))
      expect(result.current.user).toEqual({ user: MOCK_USER_DATA })
    })
  })
})
