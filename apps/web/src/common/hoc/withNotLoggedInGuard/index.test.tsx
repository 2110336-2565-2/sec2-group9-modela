import { UserStatus } from '@modela/database'
import { render } from '@testing-library/react'
import { mockComponent, mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('withGuard', () => {
  const { mockNotLoggedIn, mockVerify } = mockUser()

  const { replaceSpy } = mockRouter()

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

  describe('user is logged in but is pending', () => {
    it('should redirect to waiting page', () => {
      mockVerify(UserStatus.PENDING)

      const WithNotLoggedInGuard = withNotLoggedInGuard(MockChildren)
      render(<WithNotLoggedInGuard />)

      expect(replaceSpy).toBeCalledWith('/waiting')
    })
  })

  describe('user is logged in but is rejected', () => {
    it('should redirect to waiting page', () => {
      mockVerify(UserStatus.REJECTED)

      const WithNotLoggedInGuard = withNotLoggedInGuard(MockChildren)
      render(<WithNotLoggedInGuard />)

      expect(replaceSpy).toBeCalledWith('/rejected')
    })
  })

  describe('user is logged in and is verified', () => {
    it('should redirect to job page', () => {
      mockVerify(UserStatus.ACCEPTED)

      const WithNotLoggedInGuard = withNotLoggedInGuard(MockChildren)
      render(<WithNotLoggedInGuard />)

      expect(replaceSpy).toBeCalledWith('/job')
    })
  })
})
