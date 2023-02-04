import { mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpyMany } from 'common/utils/testing'
import React from 'react'

describe('<Footer />', () => {
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
  jest.spyOn(window, 'alert').mockImplementation(() => {})

  const { default: Footer } = require('./index') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render correctly', () => {
      const { getByText } = render(<Footer {...footerProps} />)
      expect(getByText(MOCK_ACTOR_COUNT)).toBeDefined()
      expect(getByText(MOCK_WAGE.toLocaleString())).toBeDefined()
      expect(getByText('สมัครงาน')).toBeDefined()
    })
    it('should call apply function corecttly', () => {
      const { getByText } = render(<Footer {...footerProps} />)
      getByText('สมัครงาน').click()
      expect(window.alert).toBeCalledTimes(1)
    })
  })
})
