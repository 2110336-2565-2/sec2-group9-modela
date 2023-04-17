import { render } from '@testing-library/react'
import { expectToBeCalledWith, mockComponent } from 'common/utils/testing'
import React from 'react'

describe('<FallbackPage />', () => {
  const useMediaQuerySpy = jest.fn().mockReturnValue(false)

  const [ButtonSpy, MockButton] = mockComponent()

  jest.doMock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: useMediaQuerySpy,
    Button: MockButton,
  }))

  const { default: FallbackPage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render FallbackPage correctly', () => {
        const { getByText } = render(<FallbackPage />)
        expect(getByText('ขออภัย เราไม่พบหน้าที่คุณต้องการค้นหา')).toBeDefined()
        expect(
          getByText('เกิดความผิดพลาดบางอย่าง หรือหน้าที่คุณต้องการค้นหาถูกลบ'),
        ).toBeDefined()
      })
    })

    describe('event', () => {
      it('should perform back button click correctly', () => {
        render(<FallbackPage />)
        expectToBeCalledWith(ButtonSpy, { href: '/' })
      })
    })
  })
})
