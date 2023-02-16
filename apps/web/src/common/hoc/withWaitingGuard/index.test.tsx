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

  describe('user is logged in and is verified', () => {
    it('should render waiting page', () => {
      mockVerify(false)

      const WithWaitingGuard = withWaitingGuard(MockChildren)
      render(<WithWaitingGuard />)

      expect(ChildrenSpy).toBeCalledTimes(1)
    })
  })

  describe('user is logged in and is not verified', () => {
    it('should redirect to job page', () => {
      mockVerify(true)

      const WithWaitingGuard = withWaitingGuard(MockChildren)
      render(<WithWaitingGuard />)

      expect(replaceSpy).toBeCalledWith('/job')
    })
  })
})
