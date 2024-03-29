import { GetJobDto, mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import {
  mockAndSpy,
  mockComponent,
  mockRouter,
  mockUser,
} from 'common/utils/testing'
import React from 'react'

describe('<JobCard />', () => {
  const cardProps: GetJobDto = {
    ...mock('job').get(),
    companyName: mock('casting').get().companyName,
    jobCastingImageUrl: mock('user').get().profileImageUrl || '',
    shooting: mock('shooting').get(2),
    castingName: mock('user').get().firstName,
  }

  mockRouter(true, { jobId: 1 })
  mockUser()

  const ShootingDetailMock = mockAndSpy(
    'modules/job/detail/components/JobDetailCard/components/ShootingDetail',
  )
  jest.doMock('./utils', () => ({
    getHeader: () => mockComponent()[1],
    getFooter: () => mockComponent()[1],
  }))

  const { default: JobCard } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render JobCard correctly', () => {
      render(<JobCard {...cardProps} />)
      expect(ShootingDetailMock).toBeCalledTimes(2)
    })
  })
})
