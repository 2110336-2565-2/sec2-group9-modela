import { render } from '@testing-library/react'
import {
  callPropsFunction,
  expectToBeCalledWith,
  mockAndSpy,
  mockAndSpyMany,
  mockUser,
  mockUseSwitch,
} from 'common/utils/testing'
import React from 'react'

describe('<NavbarMobile />', () => {
  const ArrowBackIosSpy = mockAndSpy('@mui/icons-material/ArrowBackIos')
  const LoginSpy = mockAndSpy('@mui/icons-material/Login')
  const MenuSpy = mockAndSpy('@mui/icons-material/Menu')
  const SearchSpy = mockAndSpy('@mui/icons-material/Search')
  const [LoginButtonSpy] = mockAndSpyMany(
    'common/components/Navbar/components/NavbarMobile/styled',
    ['LoginButton'],
  )

  const ImageSpy = mockAndSpy('next/image')
  const NavbarManuSpy = mockAndSpy(
    'common/components/Navbar/components/NavbarMenu',
  )

  const { switchCloseSpy, switchOpenSpy } = mockUseSwitch(false)
  const MOCK_LAYOUT_RETURN = {
    override: null,
    onSearch: null,
  }

  const { mockNotLoggedIn } = mockUser()

  const useLayoutSpy = jest.fn().mockReturnValue(MOCK_LAYOUT_RETURN)
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: useLayoutSpy,
  }))

  const pushSpy = jest.fn()
  const useRouterSpy = jest.fn().mockReturnValue({ push: pushSpy })
  jest.doMock('next/router', () => ({ useRouter: useRouterSpy }))

  const { default: NavbarMobile } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render NavbarMobile correctly', () => {
        render(<NavbarMobile />)

        expect(ImageSpy).toBeCalledTimes(1)
        expect(MenuSpy).toBeCalledTimes(1)
        expectToBeCalledWith(NavbarManuSpy, {
          isOpen: false,
          onClose: switchCloseSpy,
        })
      })
    })

    describe('event', () => {
      it('should open menu correctly', () => {
        render(<NavbarMobile />)
        callPropsFunction(MenuSpy, 'onClick')
        expect(switchOpenSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('onSearch is not null', () => {
    const onSearchSpy = jest.fn()
    describe('display', () => {
      it('should render NavbarMobile correctly', () => {
        useLayoutSpy.mockReturnValue({
          ...MOCK_LAYOUT_RETURN,
          onSearch: onSearchSpy,
        })

        render(<NavbarMobile />)
        expect(SearchSpy).toBeCalledTimes(1)
      })
    })

    describe('event', () => {
      it('should perform search click correctly', () => {
        useLayoutSpy.mockReturnValue({
          ...MOCK_LAYOUT_RETURN,
          onSearch: onSearchSpy,
        })

        render(<NavbarMobile />)
        callPropsFunction(SearchSpy, 'onClick')
        expect(onSearchSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('user is not logged in', () => {
    describe('display', () => {
      it('should render login icon', () => {
        mockNotLoggedIn()
        render(<NavbarMobile />)

        expect(LoginButtonSpy).toBeCalledTimes(1)
        expect(LoginSpy).toBeCalledTimes(1)
      })
    })

    describe('event', () => {
      it('should perform login click correctly', () => {
        mockNotLoggedIn()
        render(<NavbarMobile />)

        callPropsFunction(LoginButtonSpy, 'onClick')
        expect(pushSpy).toBeCalledTimes(1)
        expect(pushSpy).toBeCalledWith('/login')
      })
    })
  })

  describe('override is not null', () => {
    describe('display', () => {
      const onBackSpy = jest.fn()
      const MOCK_TITLE = 'Mafumafu'

      it('should render back icon', () => {
        useLayoutSpy.mockReturnValue({
          ...MOCK_LAYOUT_RETURN,
          override: {
            onBack: onBackSpy,
            title: MOCK_TITLE,
          },
        })
        const { getByText } = render(<NavbarMobile />)

        expect(ArrowBackIosSpy).toBeCalledTimes(1)
        expect(getByText(MOCK_TITLE)).toBeDefined()
      })
    })
    describe('event', () => {
      it('should perform back click correctly', () => {
        const onBackSpy = jest.fn()
        useLayoutSpy.mockReturnValue({
          ...MOCK_LAYOUT_RETURN,
          override: {
            onBack: onBackSpy,
            title: 'Mafumafu',
          },
        })
        render(<NavbarMobile />)

        callPropsFunction(ArrowBackIosSpy, 'onClick')
        expect(onBackSpy).toBeCalledTimes(1)
      })
    })
  })
})
