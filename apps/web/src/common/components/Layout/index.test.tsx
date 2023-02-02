import { render } from '@testing-library/react'
import { expectToBeCalledWith, mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<Layout />', () => {
  const MOCK_FOCUS = 'job'
  const useLayoutSpy = jest.fn(() => ({
    isHideHeader: false,
    headerFocus: MOCK_FOCUS,
  }))

  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: useLayoutSpy,
  }))

  const HeaderSpy = mockAndSpy('common/components/Header')

  const { default: Layout } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render Layout correctly', () => {
        render(<Layout />)

        expectToBeCalledWith(HeaderSpy, { focus: MOCK_FOCUS })
      })
    })
  })

  describe('isHideHeader is true', () => {
    describe('display', () => {
      it('should not render header', () => {
        useLayoutSpy.mockReturnValue({
          isHideHeader: true,
          headerFocus: MOCK_FOCUS,
        })
        render(<Layout />)

        expect(HeaderSpy).not.toBeCalled()
      })
    })
  })
})
