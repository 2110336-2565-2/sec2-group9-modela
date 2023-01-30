import { render } from '@testing-library/react'
import { UserType } from 'common/types/prisma'
import { mockComponent } from 'common/utils/testing'
import React from 'react'

describe('withGuard', () => {
  const MOCK_USER = {
    firstName: 'John',
    isVerified: true,
    type: UserType.ACTOR,
  }

  const useUserSpy = jest.fn().mockReturnValue(MOCK_USER)
  jest.doMock('common/context/UserContext', () => ({ useUser: useUserSpy }))

  const replaceSpy = jest.fn()
  const useRouterSpy = jest.fn(() => ({ replace: replaceSpy }))
  jest.doMock('next/router', () => ({ useRouter: useRouterSpy }))

  const [ChildrenSpy, MockChildren] = mockComponent()

  const { default: withGuard } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render children correctly', () => {
      const WithGuard = withGuard(MockChildren, [UserType.ACTOR])
      render(<WithGuard />)

      expect(ChildrenSpy).toBeCalledTimes(1)
    })
  })

  describe('user is not loggedin', () => {
    it('should redirect to login page', () => {
      const WithGuard = withGuard(MockChildren, [UserType.ACTOR])
      useUserSpy.mockReturnValue(null)
      render(<WithGuard />)

      expect(replaceSpy).toBeCalledWith('/login')
    })
  })

  describe('user is not verified', () => {
    it('should redirect to waiting page', () => {
      const WithGuard = withGuard(MockChildren, [UserType.ACTOR])
      useUserSpy.mockReturnValue({ ...MOCK_USER, isVerified: false })
      render(<WithGuard />)

      expect(replaceSpy).toBeCalledWith('/waiting')
    })
  })

  describe('user is not allowed', () => {
    it('should render not allowed page', () => {
      const WithGuard = withGuard(MockChildren, [UserType.ADMIN])
      render(<WithGuard />)

      // TODO fix this test when 403 page is implemented
      expect(ChildrenSpy).toBeCalledTimes(0)
    })
  })
})
