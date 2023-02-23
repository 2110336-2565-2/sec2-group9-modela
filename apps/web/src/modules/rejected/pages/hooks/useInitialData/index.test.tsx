import { UserType } from '@modela/database'
import { renderHook, waitFor } from '@testing-library/react'
import { mockApiClient } from 'common/utils/testing'

describe('useInitialData()', () => {
  const MOCK_INITIAL_DATA = {
    reason: 'reason',
    data: {
      firstName: 'firstName',
    },
  }

  const { getSpy, mockGetReturn } = mockApiClient()

  mockGetReturn(MOCK_INITIAL_DATA)

  const { default: useInitialData } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('user is actor', () => {
    it('should init value correctly', () => {
      const { result } = renderHook(() => useInitialData(UserType.ACTOR))

      expect(result.current).toBeNull()
    })

    it('should fetch initial data correctly', async () => {
      const { result } = renderHook(() => useInitialData(UserType.ACTOR))

      await waitFor(() => {
        expect(getSpy).toBeCalledWith('/info/actor')
        expect(result.current).toEqual(MOCK_INITIAL_DATA)
      })
    })
  })
})
