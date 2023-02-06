import { mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpyMany } from 'common/utils/testing'
import React from 'react'

describe('<ShootingDetail />', () => {
  const MOCK_INDEX = 1
  const MOCK_JOB = mock('shooting').get()

  mockAndSpyMany('@mui/icons-material', [
    'CalendarMonthOutlined',
    'LocationOnOutlined',
    'QueryBuilderOutlined',
  ])

  const { default: ShootingDetail } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render correctly', () => {
      const { getByText } = render(
        <ShootingDetail idx={MOCK_INDEX} data={MOCK_JOB} />,
      )
      expect(getByText('ถ่ายครั้งที่: ' + (MOCK_INDEX + 1))).toBeDefined()
    })
  })
})
