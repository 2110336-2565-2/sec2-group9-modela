import { JobStatus, mock, UserType } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpyMany } from 'common/utils/testing'
import { mockUser } from 'common/utils/testing'
import React from 'react'

describe('<JobCardFooter />', () => {
  const MOCK_ACTOR_COUNT = mock('job').get().actorCount
  const MOCK_WAGE = mock('job').get().wage
  const MOCK_GENDER = mock('job').get().gender
  const MOCK_DUE_DATE = mock('job').get().applicationDeadline
  const footerProps = {
    actorCount: MOCK_ACTOR_COUNT,
    wage: MOCK_WAGE,
    dueDate: MOCK_DUE_DATE,
    gender: MOCK_GENDER,
  }

  mockAndSpyMany('@mui/icons-material', [
    'EventBusy',
    'Money',
    'PersonOutlined',
  ])
  mockUser(UserType.ACTOR)

  jest.spyOn(window, 'alert').mockImplementation(() => {})

  const { default: JobCardFooter } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render correctly', () => {
      const { getByText } = render(
        <JobCardFooter status={JobStatus.OPEN} {...footerProps} />,
      )
      expect(getByText(MOCK_ACTOR_COUNT)).toBeDefined()
      expect(getByText(MOCK_WAGE.toLocaleString())).toBeDefined()
      expect(getByText('สมัครงาน')).toBeDefined()
    })

    it('should render correctly when status is closed', () => {
      const { getByText } = render(
        <JobCardFooter status={JobStatus.FINISHED} {...footerProps} />,
      )
      expect(getByText(MOCK_ACTOR_COUNT)).toBeDefined()
      expect(getByText(MOCK_WAGE.toLocaleString())).toBeDefined()
    })

    it('should call apply function correctly', () => {
      //TODO: refactor this after apply function is implemented
    })
  })
})
