import { GetJobDto, mock, UserType } from '@modela/dtos'
import { render, waitFor } from '@testing-library/react'
import { mockAndSpy, mockApiClient, mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('<JobDetailPage />', () => {
  mockRouter(true, { jobId: 1 })
  const JobCardMock = mockAndSpy('modules/job/detail/components/JobCard')
  const { mockGetReturn } = mockApiClient()

  mockUser(UserType.ACTOR, true)

  const mockData: GetJobDto = {
    ...mock('job').get(),
    companyName: mock('casting').get().companyName,
    jobCastingImageUrl: mock('user').get().profileImageUrl || '',
    shooting: mock('shooting').get(1),
    castingName: mock('user').get().firstName,
  }

  const { default: JobDetailPage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render correctly when API return correct data', async () => {
      mockGetReturn(mockData)
      render(<JobDetailPage />)
      await waitFor(() => {
        expect(JobCardMock).toBeCalledTimes(1)
      })
    })

    it('should render correctly when API not return', async () => {
      mockGetReturn(undefined)

      render(<JobDetailPage />)
      await waitFor(() => {
        expect(JobCardMock).not.toBeCalled()
      })
    })
  })
})
