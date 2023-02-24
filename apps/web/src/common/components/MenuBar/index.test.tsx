import { render } from '@testing-library/react'
import {
  expectToBeCalledWith,
  mockAndSpyMany,
  mockComponent,
} from 'common/utils/testing'
import React from 'react'

describe('<MenuBar />', () => {
  const [AboutIconSpy, MockAboutIcon] = mockComponent()
  const [BlogIconSpy, MockBlogIcon] = mockComponent()
  const MOCK_MENU = [
    { icon: <MockAboutIcon />, label: 'About', href: '/about' },
    { icon: <MockBlogIcon />, label: 'Blog', href: '/blog' },
  ]
  const [MenuItemSpy] = mockAndSpyMany('common/components/MenuBar/styled', [
    'MenuItem',
  ])

  const useMediaQuerySpy = jest.fn().mockReturnValue(false)
  jest.doMock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: useMediaQuerySpy,
  }))

  const { default: MenuBar } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render MenuBar correctly', () => {
        render(<MenuBar menu={MOCK_MENU} focus="About" />)

        expect(MenuItemSpy).toBeCalledTimes(2)
        expectToBeCalledWith(MenuItemSpy, { isFocused: true }, 0)
        expectToBeCalledWith(MenuItemSpy, { isFocused: false }, 1)
        expect(AboutIconSpy).toBeCalledTimes(1)
        expect(BlogIconSpy).toBeCalledTimes(1)
      })

      it('should not render icon on tablet', () => {
        useMediaQuerySpy.mockReturnValue(true)

        render(<MenuBar menu={MOCK_MENU} focus="About" />)

        expect(AboutIconSpy).not.toBeCalled()
        expect(BlogIconSpy).not.toBeCalled()
      })
    })

    describe('event', () => {
      it('should redirect correctly when clicking on a menu item', () => {
        render(<MenuBar menu={MOCK_MENU} focus="About" />)
        expectToBeCalledWith(MenuItemSpy, { href: '/about' }, 0)
        expectToBeCalledWith(MenuItemSpy, { href: '/blog' }, 1)
      })
    })
  })
})
