import { GetJobCardWithMaxPageDto, mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<JobCardContainer/>', () => {
  const cardProps: GetJobCardWithMaxPageDto = {
    maxPage: 1,
    jobs: mock('job')
      .get(2)
      .map((job) => ({
        companyName: mock('casting').get().companyName,
        jobCastingImageUrl: mock('user').get().profileImageUrl || '',
        ...job,
      })),
  }

  jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }))

  const jobCardMock = mockAndSpy(
    'modules/job/list/components/JobCardContainer/components/JobCard',
  )

  const { default: JobCardContainer } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('normal behavior', () => {
    it('should render JobCardContainer correctly', () => {
      render(<JobCardContainer {...cardProps} />)
      expect(jobCardMock).toBeCalledTimes(2)
    })
  })
})
