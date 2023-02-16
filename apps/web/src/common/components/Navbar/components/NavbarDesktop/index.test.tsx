import { render } from '@testing-library/react'
import {
  callPropsFunction,
  expectToBeCalledWith,
  mockAndSpy,
  mockAndSpyMany,
} from 'common/utils/testing'
import React from 'react'

describe('<NavbarDesktop />', () => {
  const onClickSpy = jest.fn()
  const MOCK_FOCUS = 'focus'
  const MOCK_MENU = {
    label: 'Menu',
    onClick: onClickSpy,
    focusKey: MOCK_FOCUS,
  }

  const mockUseNavMenu = jest.fn().mockReturnValue([MOCK_MENU])
  jest.doMock('../../hooks/useNavMenu', () => mockUseNavMenu)

  const mockUseLayout = jest.fn().mockReturnValue({ navbarFocus: MOCK_FOCUS })
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: mockUseLayout,
  }))

  const ImageSpy = mockAndSpy('next/image')
  const [NavbarItemSpy] = mockAndSpyMany(
    'common/components/Navbar/components/NavbarDesktop/styled',
    ['NavbarItem'],
  )

  const { default: NavbarDesktop } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render NavbarDesktop correctly', () => {
        render(<NavbarDesktop />)

        expect(ImageSpy).toBeCalledTimes(1)
        expect(NavbarItemSpy).toBeCalledTimes(1)
        expectToBeCalledWith(NavbarItemSpy, {
          focus: true,
          sx: { pointerEvents: 'auto' },
        })
      })
    })

    describe('event', () => {
      it('should call onClick when NavbarItem is clicked', () => {
        render(<NavbarDesktop />)

        callPropsFunction(NavbarItemSpy, 'onClick')

        expect(onClickSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('onClick is undefined', () => {
    describe('display', () => {
      it('should set pointerEvents to none', () => {
        mockUseNavMenu.mockReturnValue([{ ...MOCK_MENU, onClick: undefined }])

        render(<NavbarDesktop />)

        expectToBeCalledWith(NavbarItemSpy, {
          sx: { pointerEvents: 'none' },
        })
      })
    })
  })

  describe('navbarFocus is notmatch', () => {
    describe('display', () => {
      it('should set focus to false', () => {
        mockUseLayout.mockReturnValue({ navbarFocus: 'notmatch' })

        render(<NavbarDesktop />)

        expectToBeCalledWith(NavbarItemSpy, {
          focus: false,
        })
      })
    })
  })

  describe('label is divider', () => {
    describe('display', () => {
      it('should render divider', () => {
        mockUseNavMenu.mockReturnValue([{ label: 'divider' }])

        render(<NavbarDesktop />)

        expect(NavbarItemSpy).not.toBeCalled()
      })
    })
  })
})
