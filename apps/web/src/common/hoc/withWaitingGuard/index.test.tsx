import { UserStatus } from '@modela/database'
import { render } from '@testing-library/react'
import { mockComponent, mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('withWaitingGuard', () => {
  const { mockNotLoggedIn, mockVerify } = mockUser()

  const { replaceSpy } = mockRouter()

  const [ChildrenSpy, MockChildren] = mockComponent()

  const { default: withWaitingGuard } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('user is not logged in', () => {
    it('should redirect to login page', () => {
      mockNotLoggedIn()

      const WithWaitingGuard = withWaitingGuard(MockChildren)
      render(<WithWaitingGuard />)

      expect(replaceSpy).toBeCalledWith('/login')
    })
  })

  describe('user is logged in and is pending', () => {
    it('should render children correctly', () => {
      mockVerify(UserStatus.PENDING)

      const WithWaitingGuard = withWaitingGuard(MockChildren)
      render(<WithWaitingGuard />)

      expect(ChildrenSpy).toBeCalledTimes(1)
    })
  })

  describe('user is logged in and is verified', () => {
    it('should redirect to job page', () => {
      mockVerify(UserStatus.ACCEPTED)

      const WithWaitingGuard = withWaitingGuard(MockChildren)
      render(<WithWaitingGuard />)

      expect(replaceSpy).toBeCalledWith('/job')
    })
  })

  describe('user is logged in and is rejected', () => {
    it('should redirect to rejected page', () => {
      mockVerify(UserStatus.REJECTED)

      const WithWaitingGuard = withWaitingGuard(MockChildren)
      render(<WithWaitingGuard />)

      expect(replaceSpy).toBeCalledWith('/rejected')
    })
  })
})
