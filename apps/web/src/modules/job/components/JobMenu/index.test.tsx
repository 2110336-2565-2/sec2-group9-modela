import { JobStatus } from '@modela/database'
import { render } from '@testing-library/react'
import { expectToBeCalledWith, mockAndSpy } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('<JobMenu />', () => {
  mockRouter(true, { jobId: 1 })
  const MenuBar = mockAndSpy('common/components/MenuBar')

  const useSummaryDataSpy = jest.fn().mockReturnValue({
    status: JobStatus.OPEN,
    pendingActorCount: 3,
  })
  jest.doMock('./hooks/useSummaryData', () => useSummaryDataSpy)

  const useMediaQuerySpy = jest.fn().mockReturnValue(false)
  jest.doMock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: useMediaQuerySpy,
  }))

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

  describe('screen size is tablet', () => {
    it('should render JobMenu correctly', () => {
      useMediaQuerySpy.mockReturnValue(true)
      const { container } = render(<JobMenu />)

      expect(container.firstChild).toBeNull()
    })
  })
})
