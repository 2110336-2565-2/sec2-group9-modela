import { renderHook, waitFor } from '@testing-library/react'
import { mockApiClient, mockRouter } from 'common/utils/testing'

describe('useActorData()', () => {
  const MOCK_QUERY = {
    name: 'mafumafu',
  }
  const { mockGetReturn, getSpy } = mockApiClient()
  const MOCK_ACTOR_DATA = [{ applicationId: 1 }, { applicationId: 2 }]
  mockGetReturn({ actors: MOCK_ACTOR_DATA })

  mockRouter(true, { jobId: 1 })

  const { default: useActorData } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', async () => {
      const { result } = renderHook(() => useActorData(MOCK_QUERY))

      expect(result.current.actorData).toEqual(null)
    })
    it('should fetch actor data correctly', async () => {
      const { result } = renderHook(() => useActorData(MOCK_QUERY))

      await waitFor(() =>
        expect(getSpy).toBeCalledWith('/jobs/1/actors', { params: MOCK_QUERY }),
      )
      await waitFor(() =>
        expect(result.current.actorData).toEqual(MOCK_ACTOR_DATA),
      )
    })
  })
})
