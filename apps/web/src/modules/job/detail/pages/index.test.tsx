import { UserStatus } from '@modela/database'
import { GetJobDto, mock, UserType } from '@modela/dtos'
import { render, waitFor } from '@testing-library/react'
import {
  mockAndSpy,
  mockApiClient,
  mockRouter,
  mockUser,
} from 'common/utils/testing'
import React from 'react'

describe('<JobDetailPage />', () => {
  mockRouter(true, { jobId: 1 })
  const JobDetailCardMock = mockAndSpy(
    'modules/job/detail/components/JobDetailCard',
  )
  const JobMenuSpy = mockAndSpy('modules/job/components/JobMenu')
  const { mockGetReturn } = mockApiClient()

  const { mockUserType } = mockUser(UserType.CASTING, UserStatus.ACCEPTED)

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
        expect(JobDetailCardMock).toBeCalledTimes(1)
        expect(JobMenuSpy).toBeCalledTimes(1)
      })
    })

    it('should render correctly when API not return', async () => {
      mockGetReturn(undefined)

      render(<JobDetailPage />)
      await waitFor(() => {
        expect(JobDetailCardMock).not.toBeCalled()
        expect(JobMenuSpy).not.toBeCalled()
      })
    })
  })

  describe('user is actor', () => {
    it('should not render job menu', async () => {
      mockUserType(UserType.ACTOR)
      mockGetReturn(mockData)
      render(<JobDetailPage />)
      await waitFor(() => {
        expect(JobDetailCardMock).toBeCalledTimes(1)
        expect(JobMenuSpy).not.toBeCalled()
      })
    })
  })
})
