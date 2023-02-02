import { render } from '@testing-library/react'
import { expectToBeCalledWith, mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<Layout />', () => {
  const MOCK_FOCUS = 'job'
  const useLayoutSpy = jest.fn(() => ({
    isHideNavbar: false,
    navbarFocus: MOCK_FOCUS,
  }))

  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: useLayoutSpy,
  }))

  const NavbarSpy = mockAndSpy('common/components/Navbar')

  const { default: Layout } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render Layout correctly', () => {
        render(<Layout />)

        expectToBeCalledWith(NavbarSpy, { focus: MOCK_FOCUS })
      })
    })
  })

  describe('isHideNavbar is true', () => {
    describe('display', () => {
      it('should not render navbar', () => {
        useLayoutSpy.mockReturnValue({
          isHideNavbar: true,
          navbarFocus: MOCK_FOCUS,
        })
        render(<Layout />)

        expect(NavbarSpy).not.toBeCalled()
      })
    })
  })
})
