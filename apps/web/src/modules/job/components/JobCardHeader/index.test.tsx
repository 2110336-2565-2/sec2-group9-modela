import { JobStatus, mock, UserType } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('<JobCardHeader />', () => {
  const MOCK_TITLE = mock('job').get().title
  const MOCK_COMPANY_NAME = mock('casting').get().companyName
  const MOCK_CASTING_IMAGE = mock('user').get().profileImageUrl || ''
  const MOCK_STATUS = JobStatus.OPEN
  const headerProps = {
    castingImage: MOCK_CASTING_IMAGE,
    companyName: MOCK_COMPANY_NAME,
    title: MOCK_TITLE,
    status: MOCK_STATUS,
  }
  const { mockUserType } = mockUser()

  mockRouter(true, { jobId: 1 })

  const { default: JobCardHeader } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render Header correctly', () => {
      mockUserType(UserType.CASTING)
      const { getByText } = render(<JobCardHeader {...headerProps} />)
      expect(getByText(MOCK_TITLE)).toBeDefined()
      expect(getByText(MOCK_COMPANY_NAME)).toBeDefined()
    })

    it('should render correctly when user is Actor', () => {
      mockUserType(UserType.ACTOR)
      const { getByText } = render(<JobCardHeader {...headerProps} />)
      expect(getByText(MOCK_TITLE)).toBeDefined()
      expect(getByText(MOCK_COMPANY_NAME)).toBeDefined()
    })
  })
})
