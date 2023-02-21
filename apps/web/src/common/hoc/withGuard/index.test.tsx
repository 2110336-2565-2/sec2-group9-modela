import { UserStatus } from '@modela/database'
import { UserType } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockComponent, mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

import { GuardType } from './types'

describe('withGuard', () => {
  const { mockNotLoggedIn, mockUserType, mockVerify } = mockUser()

  const { replaceSpy } = mockRouter()

  const [ChildrenSpy, MockChildren] = mockComponent()

  const { default: withGuard } = require('.') as typeof import('.')

  const userType: { [key in GuardType]: { status: UserStatus } | null } = {
    notLoggedIn: null,
    pending: { status: UserStatus.PENDING },
    rejected: { status: UserStatus.REJECTED },
    verified: { status: UserStatus.ACCEPTED },
  }

  const replaceKey: { [key in GuardType]: string } = {
    notLoggedIn: '/login',
    pending: '/waiting',
    rejected: '/rejected',
    verified: '/job',
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it.each`
      guardType
      ${'notLoggedIn'}
      ${'pending'}
      ${'rejected'}
    `(
      'should render children correctly when guardType is $guardType',
      ({ guardType }) => {
        for (const [key, value] of Object.entries(userType)) {
          if (value) mockVerify(value?.status)
          else mockNotLoggedIn()

          const WithGuard = withGuard(MockChildren, guardType)
          render(<WithGuard />)

          if (key === guardType) {
            expect(ChildrenSpy).toBeCalledTimes(1)
          } else {
            expect(replaceSpy).toBeCalledWith(replaceKey[key as GuardType])
          }

          jest.clearAllMocks()
        }
      },
    )
  })

  describe('user is not allowed', () => {
    it('should redirect to job page', () => {
      mockUserType(UserType.ACTOR)
      mockVerify(UserStatus.ACCEPTED)

      const WithGuard = withGuard(MockChildren, 'verified', [UserType.ADMIN])
      render(<WithGuard />)

      expect(replaceSpy).toBeCalledWith('/')
    })
  })
})
