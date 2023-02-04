import { GetJobDto, mock } from '@modela/dtos'
import { render, waitFor } from '@testing-library/react'
import { mockAndSpy, mockApiClient } from 'common/utils/testing'
import React from 'react'

describe('<JobDetail />', () => {
  jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }))
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  const CardMock = mockAndSpy('modules/job/components/Card')
  const { mockGetReturn } = mockApiClient()

  const mockData: GetJobDto = {
    ...mock('job').get(),
    companyName: mock('casting').get().companyName,
    jobCastingImageUrl: mock('user').get().profileImageUrl || '',
    shooting: [mock('shooting').get()],
  }

  const { default: JobDetail } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render correctly when API return correct data', async () => {
      useRouter.mockImplementation(() => ({
        query: { jid: 1 },
      }))
      mockGetReturn(mockData)
      render(<JobDetail />)
      await waitFor(() => {
        expect(CardMock).toBeCalledTimes(1)
      })
    })

    it('should render correctly when API not return', async () => {
      useRouter.mockImplementation(() => ({
        query: { jid: 1 },
      }))
      mockGetReturn(undefined)

      render(<JobDetail />)
      await waitFor(() => {
        expect(CardMock).toBeCalledTimes(0)
      })
    })
  })
})
