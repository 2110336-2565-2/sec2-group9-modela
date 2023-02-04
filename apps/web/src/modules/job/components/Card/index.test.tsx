import { GetJobDto, mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<Card />', () => {
  const cardProps: GetJobDto = {
    ...mock('job').get(),
    companyName: mock('casting').get().companyName,
    jobCastingImageUrl: mock('user').get().profileImageUrl || '',
    shooting: [mock('shooting').get(), mock('shooting').get()],
  }

  const ShootingDetailMock = mockAndSpy(
    'modules/job/components/Card/components/ShootingDetail',
  )

  const { default: Card } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render Card correctly', () => {
      render(<Card {...cardProps} />)
      expect(ShootingDetailMock).toBeCalledTimes(2)
    })
  })
})
