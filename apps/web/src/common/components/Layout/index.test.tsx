import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<Layout />', () => {
  const useLayoutSpy = jest.fn(() => ({
    isHideNavbar: false,
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

        expect(NavbarSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('isHideNavbar is true', () => {
    describe('display', () => {
      it('should not render navbar', () => {
        useLayoutSpy.mockReturnValue({
          isHideNavbar: true,
        })
        render(<Layout />)

        expect(NavbarSpy).not.toBeCalled()
      })
    })
  })
})
