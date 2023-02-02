import { mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import {
  callPropsFunction,
  expectToBeCalledWith,
  mockAndSpy,
  mockAndSpyMany,
} from 'common/utils/testing'
import React from 'react'

describe('<Navbar />', () => {
  const MOCK_FOCUS = 'jobs'
  const FOCUS = ['jobs', 'notification', 'profile']

  const [NavbarItemSpy] = mockAndSpyMany('common/components/Navbar/styled', [
    'NavbarItem',
  ])
  const ImageSpy = mockAndSpy('next/image')

  const MOCK_NAME = mock('user').get().firstName
  const useUserSpy = jest.fn().mockReturnValue({ firstName: MOCK_NAME })
  jest.doMock('common/context/UserContext', () => ({ useUser: useUserSpy }))

  const pushSpy = jest.fn()
  const useRouterSpy = jest.fn(() => ({ push: pushSpy }))
  jest.doMock('next/router', () => ({ useRouter: useRouterSpy }))

  const { default: Navbar } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render Navbar correctly', () => {
        const { getByText } = render(<Navbar focus={MOCK_FOCUS} />)

        expect(ImageSpy).toBeCalledTimes(1)
        expect(NavbarItemSpy).toBeCalledTimes(5)
        FOCUS.forEach((focus, index) =>
          expectToBeCalledWith(
            NavbarItemSpy,
            { focus: focus == MOCK_FOCUS },
            index,
          ),
        )

        expect(getByText(`สวัสดี คุณ ${MOCK_NAME}`)).toBeDefined()
      })
    })
  })

  describe('user is not logged in', () => {
    describe('display', () => {
      it('should render Navbar correctly', () => {
        useUserSpy.mockReturnValue(null)

        render(<Navbar focus={MOCK_FOCUS} />)

        expect(NavbarItemSpy).toBeCalledTimes(1)
      })
    })

    describe('event', () => {
      it('should perform login button click correctly', () => {
        useUserSpy.mockReturnValue(null)

        render(<Navbar focus={MOCK_FOCUS} />)

        callPropsFunction(NavbarItemSpy, 'onClick')
        expect(pushSpy).toBeCalledWith('/login')
      })
    })
  })
})
