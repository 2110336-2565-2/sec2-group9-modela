import { GetJobDto, mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<JobCard />', () => {
  const cardProps: GetJobDto = {
    ...mock('job').get(),
    companyName: mock('casting').get().companyName,
    jobCastingImageUrl: mock('user').get().profileImageUrl || '',
    shooting: mock('shooting').get(2),
  }

  const ShootingDetailMock = mockAndSpy(
    'modules/job/detail/components/JobCard/components/ShootingDetail',
  )

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
