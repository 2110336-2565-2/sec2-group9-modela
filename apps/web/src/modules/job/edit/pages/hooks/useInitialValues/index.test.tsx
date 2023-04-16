import { mock } from '@modela/dtos'
import { renderHook, waitFor } from '@testing-library/react'
import { mockApiClient, mockRouter } from 'common/utils/testing'
import dayjs from 'dayjs'

describe('useInitialValues()', () => {
  const MOCK_JOB_ID = 1
  const MOCK_JOB = {
    ...mock('job').get(),
    shooting: mock('shooting').omit(['shootingId', 'jobId']).get(1),
  }

  mockRouter(true, { jobId: MOCK_JOB_ID })

  const { getSpy, mockGetReturn } = mockApiClient()
  mockGetReturn(MOCK_JOB)

  const { default: useInitialValues } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should fetch initial post data correctly', async () => {
      const { result } = renderHook(() => useInitialValues())
      expect(result.current).toBeNull()

      expect(getSpy).toBeCalledWith(`/jobs/${MOCK_JOB_ID}`)
      const correctValue = {
        ...MOCK_JOB,
        applicationDeadline: dayjs(MOCK_JOB.applicationDeadline),
        shooting: [
          {
            ...MOCK_JOB.shooting[0],
            startDate: dayjs(MOCK_JOB.shooting[0].startDate),
            endDate: dayjs(MOCK_JOB.shooting[0].endDate),
            startTime: dayjs(MOCK_JOB.shooting[0].startTime),
            endTime: dayjs(MOCK_JOB.shooting[0].endTime),
          },
        ],
      }

      await waitFor(() => expect(result.current).toEqual(correctValue))
    })
  })
})
