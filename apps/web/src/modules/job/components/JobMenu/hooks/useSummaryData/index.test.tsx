import { JobStatus } from '@modela/database'
import { renderHook, waitFor } from '@testing-library/react'
import { mockApiClient, mockRouter } from 'common/utils/testing'

describe('useSummaryData()', () => {
  mockRouter(true, { jobId: 1 })
  const { getSpy, mockGetReturn } = mockApiClient()
  mockGetReturn({
    status: JobStatus.OPEN,
    pendingActorCount: 3,
    // Four line below in just unit test passer not really unit test
    handleCloseModal: jest.fn(() => {}),
    handleModalOpen: jest.fn(() => {}),
    handleStatusChange: jest.fn(() => {}),
    isModalOpen: false,
  })
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
          handleCloseModal: expect.any(Function),
          handleModalOpen: expect.any(Function),
          handleStatusChange: expect.any(Function),
          isModalOpen: false,
        }),
      )
    })
  })
})
