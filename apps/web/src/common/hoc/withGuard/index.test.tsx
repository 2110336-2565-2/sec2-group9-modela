import { UserStatus } from '@modela/database'
import { UserType } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockComponent, mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('withGuard', () => {
  const { mockNotLoggedIn, mockUserType, mockVerify } = mockUser()

  const { replaceSpy } = mockRouter()

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
      mockNotLoggedIn()

      const WithGuard = withGuard(MockChildren, [UserType.ACTOR])
      render(<WithGuard />)

      expect(replaceSpy).toBeCalledWith('/login')
    })
  })

  describe('user is not verified', () => {
    it('should redirect to waiting page', () => {
      mockVerify(UserStatus.PENDING)

      const WithGuard = withGuard(MockChildren, [UserType.ACTOR])
      render(<WithGuard />)

      expect(replaceSpy).toBeCalledWith('/waiting')
    })
  })

  describe('user is not allowed', () => {
    it('should render not allowed page', () => {
      mockUserType(UserType.ACTOR)
      mockVerify(UserStatus.ACCEPTED)

      const WithGuard = withGuard(MockChildren, [UserType.ADMIN])
      render(<WithGuard />)

      // TODO fix this test when 403 page is implemented
      expect(ChildrenSpy).toBeCalledTimes(0)
    })
  })
})
