import { JobStatus } from '@modela/database'
import { render } from '@testing-library/react'
import {
  expectToBeCalledWith,
  mockAndSpy,
  mockRouter,
} from 'common/utils/testing'
import React from 'react'

describe('<JobMenu />', () => {
  mockRouter(true, { jobId: 1 })
  const MenuBar = mockAndSpy('common/components/MenuBar')

  const useSummaryDataSpy = jest.fn().mockReturnValue({
    status: JobStatus.OPEN,
    pendingActorCount: 3,
  })
  jest.doMock('./hooks/useSummaryData', () => useSummaryDataSpy)

  const { default: JobMenu } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render JobMenu correctly', () => {
        const { getByText } = render(<JobMenu focus="detail" />)

        expectToBeCalledWith(MenuBar, {
          menu: [{ href: '/job/1' }, { href: '/job/1/actor' }],
          focus: 'ข้อมูลงาน',
        })

        expect(getByText('มีนักแสดงที่กำลังรออยู่ 3 คน')).toBeDefined()
        expect(getByText('เปิดรับสมัคร')).toBeDefined()
      })
    })
  })
})
