import { GetJobDto, mock } from '@modela/dtos'
import { render, waitFor } from '@testing-library/react'
import { mockAndSpy, mockApiClient } from 'common/utils/testing'
import React from 'react'

describe('<JobDetailPage />', () => {
  jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }))
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  const JobCardMock = mockAndSpy('modules/job/components/JobCard')
  const { mockGetReturn } = mockApiClient()

  const mockData: GetJobDto = {
    ...mock('job').get(),
    companyName: mock('casting').get().companyName,
    jobCastingImageUrl: mock('user').get().profileImageUrl || '',
    shooting: mock('shooting').get(1),
  }

  const { default: JobDetailPage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render correctly when API return correct data', async () => {
      useRouter.mockImplementation(() => ({
        query: { jid: 1 },
        isReady: true,
      }))
      mockGetReturn(mockData)
      render(<JobDetailPage />)
      await waitFor(() => {
        expect(JobCardMock).toBeCalledTimes(1)
      })
    })

    it('should render correctly when API not return', async () => {
      useRouter.mockImplementation(() => ({
        query: { jid: 1 },
        isReady: true,
      }))
      mockGetReturn(undefined)

      render(<JobDetailPage />)
      await waitFor(() => {
        expect(JobCardMock).toBeCalledTimes(0)
      })
    })
  })
})
