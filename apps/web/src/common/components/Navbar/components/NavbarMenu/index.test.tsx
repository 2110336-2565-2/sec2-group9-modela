import { render } from '@testing-library/react'
import {
  callPropsFunction,
  expectToBeCalledWith,
  mockAndSpy,
  mockAndSpyMany,
} from 'common/utils/testing'
import React from 'react'

describe('<NavbarMenu />', () => {
  const onCloseSpy = jest.fn()
  const defaultProps = {
    isOpen: true,
    onClose: onCloseSpy,
  }

  const onClickSpy = jest.fn()
  const MOCK_FOCUS = 'focus'
  const MOCK_MENU = {
    label: 'Menu',
    onClick: onClickSpy,
    focusKey: MOCK_FOCUS,
    icon: <div>icon</div>,
  }

  const mockUseNavMenu = jest.fn().mockReturnValue([MOCK_MENU])
  jest.doMock('../../hooks/useNavMenu', () => mockUseNavMenu)

  const mockUseLayout = jest.fn().mockReturnValue({ navbarFocus: 'mafumafu' })
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: mockUseLayout,
  }))

  const NavbarProfileSpy = mockAndSpy(
    'common/components/Navbar/components/NavbarProfile',
  )
  const [MenuItemSpy] = mockAndSpyMany(
    'common/components/Navbar/components/NavbarMenu/styled',
    ['MenuItem'],
  )
  const [DrawerSpy] = mockAndSpyMany('@mui/material', ['Drawer'])
  const { default: NavbarMenu } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render NavbarMenu correctly', () => {
        render(<NavbarMenu {...defaultProps} />)

        expectToBeCalledWith(DrawerSpy, { open: true, onClose: onCloseSpy })
        expect(NavbarProfileSpy).toBeCalledTimes(1)
        expectToBeCalledWith(MenuItemSpy, {
          sx: { backgroundColor: 'white' },
        })
      })
    })

    describe('event', () => {
      it('should perform menu item click correctly', () => {
        render(<NavbarMenu {...defaultProps} />)

        callPropsFunction(MenuItemSpy, 'onClick')

        expect(onClickSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('focus key is matched', () => {
    describe('display', () => {
      it('should change menu item color to white', () => {
        mockUseLayout.mockReturnValue({ navbarFocus: MOCK_FOCUS })
        render(<NavbarMenu {...defaultProps} />)

        expectToBeCalledWith(MenuItemSpy, {
          sx: { backgroundColor: '#C3DCF14D' },
        })
      })
    })
  })

  describe('label is divider', () => {
    describe('display', () => {
      it('should render divider correctly', () => {
        mockUseNavMenu.mockReturnValue([
          {
            ...MOCK_MENU,
            label: 'divider',
          },
        ])
        render(<NavbarMenu {...defaultProps} />)

        expect(MenuItemSpy).not.toBeCalled()
      })
    })
  })
})
