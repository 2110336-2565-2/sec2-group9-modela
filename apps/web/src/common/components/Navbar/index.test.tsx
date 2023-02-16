import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<Navbar />', () => {
  const NavbarDesktopSpy = mockAndSpy(
    'common/components/Navbar/components/NavbarDesktop',
  )
  const NavbarMobileSpy = mockAndSpy(
    'common/components/Navbar/components/NavbarMobile',
  )

  const useMediaQuerySpy = jest.fn().mockReturnValue(false)
  jest.doMock('@mui/material', () => ({ useMediaQuery: useMediaQuerySpy }))

  const { default: Navbar } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('desktop', () => {
    describe('display', () => {
      it('should render Navbar correctly', () => {
        render(<Navbar />)

        expect(NavbarDesktopSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('mobile', () => {
    describe('display', () => {
      it('should render Navbar correctly', () => {
        useMediaQuerySpy.mockReturnValueOnce(true)

        render(<Navbar />)

        expect(NavbarMobileSpy).toBeCalledTimes(1)
      })
    })
  })
})
