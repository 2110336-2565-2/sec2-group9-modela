import { render } from '@testing-library/react'
import { mockComponent, mockUser } from 'common/utils/testing'
import React from 'react'

describe('withGuard', () => {
  const { mockNotLoggedIn, mockVerify } = mockUser()

  const replaceSpy = jest.fn()
  const useRouterSpy = jest.fn(() => ({ replace: replaceSpy }))
  jest.doMock('next/router', () => ({ useRouter: useRouterSpy }))

  const [ChildrenSpy, MockChildren] = mockComponent()

  const { default: withNotLoggedInGuard } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render children correctly', () => {
      mockNotLoggedIn()

      const WithNotLoggedInGuard = withNotLoggedInGuard(MockChildren)
      render(<WithNotLoggedInGuard />)

      expect(ChildrenSpy).toBeCalledTimes(1)
    })
  })

  describe('user is logged in but not verified', () => {
    it('should redirect to waiting page', () => {
      mockVerify(false)

      const WithNotLoggedInGuard = withNotLoggedInGuard(MockChildren)
      render(<WithNotLoggedInGuard />)

      expect(replaceSpy).toBeCalledWith('/waiting')
    })
  })

  describe('user is logged in and is verified', () => {
    it('should redirect to job page', () => {
      mockVerify(true)

      const WithNotLoggedInGuard = withNotLoggedInGuard(MockChildren)
      render(<WithNotLoggedInGuard />)

      expect(replaceSpy).toBeCalledWith('/job')
    })
  })
})