import { UserStatus } from '@modela/database'
import { render } from '@testing-library/react'
import { mockComponent, mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('withRejectedGuard', () => {
  const { mockNotLoggedIn, mockVerify } = mockUser()

  const { replaceSpy } = mockRouter()

  const [ChildrenSpy, MockChildren] = mockComponent()

  const { default: withRejectedGuard } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('user is not logged in', () => {
    it('should redirect to login page', () => {
      mockNotLoggedIn()

      const WithRejectedGuard = withRejectedGuard(MockChildren)
      render(<WithRejectedGuard />)

      expect(replaceSpy).toBeCalledWith('/login')
    })
  })

  describe('user is logged in and is rejected', () => {
    it('should render children correctly', () => {
      mockVerify(UserStatus.REJECTED)

      const WithRejectedGuard = withRejectedGuard(MockChildren)
      render(<WithRejectedGuard />)

      expect(ChildrenSpy).toBeCalledTimes(1)
    })
  })

  describe('user is logged in and is pending', () => {
    it('should render waiting page', () => {
      mockVerify(UserStatus.PENDING)

      const WithRejectedGuard = withRejectedGuard(MockChildren)
      render(<WithRejectedGuard />)

      expect(replaceSpy).toBeCalledWith('/waiting')
    })
  })

  describe('user is logged in and is verified', () => {
    it('should redirect to job page', () => {
      mockVerify(UserStatus.ACCEPTED)

      const WithRejectedGuard = withRejectedGuard(MockChildren)
      render(<WithRejectedGuard />)

      expect(replaceSpy).toBeCalledWith('/job')
    })
  })
})
