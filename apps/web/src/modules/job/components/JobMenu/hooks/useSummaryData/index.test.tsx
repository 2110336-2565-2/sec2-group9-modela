import { JobStatus } from '@modela/database'
import { renderHook, waitFor } from '@testing-library/react'
import { mockApiClient } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'

describe('useSummaryData()', () => {
  mockRouter(true, { jobId: 1 })
  const { getSpy, mockGetReturn } = mockApiClient()
  mockGetReturn({ status: JobStatus.OPEN, pendingActorCount: 3 })
  const { default: useSummaryData } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should fetch summary data correctly', async () => {
      const { result } = renderHook(useSummaryData)
      await waitFor(() => expect(getSpy).toBeCalledWith('/jobs/1/summary'))
      await waitFor(() =>
        expect(result.current).toEqual({
          status: JobStatus.OPEN,
          pendingActorCount: 3,
        }),
      )
    })
  })
})
