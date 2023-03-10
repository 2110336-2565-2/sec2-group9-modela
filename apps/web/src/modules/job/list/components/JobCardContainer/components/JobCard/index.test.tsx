import { GetJobCardDto, mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<JobCard/>', () => {
  const cardProps: GetJobCardDto = {
    ...mock('job').override({ description: 'hello world' }).get(),
    companyName: mock('casting').get().companyName,
    jobCastingImageUrl: mock('user').get().profileImageUrl || '',
    castingName: mock('user').get().firstName,
  }

  const jobCardFooterMock = mockAndSpy('modules/job/components/JobCardFooter')
  const jobCardHeaderMock = mockAndSpy('modules/job/components/JobCardHeader')

  const { default: JobCard } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('normal behavior', () => {
    it('should render JobCard correctly', () => {
      const { getByText } = render(<JobCard {...cardProps} />)
      expect(jobCardFooterMock).toBeCalledTimes(1)
      expect(jobCardHeaderMock).toBeCalledTimes(1)
      expect(getByText(cardProps.description)).toBeDefined()
    })
  })
})
