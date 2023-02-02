import { mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpyMany, mockComponent } from 'common/utils/testing'
import React from 'react'

describe('UserProvider', () => {
  const [CircularProgressSpy] = mockAndSpyMany('@mui/material', [
    'CircularProgress',
  ])

  const MOCK_USER_DATA = {
    user: mock('user').get(),
    isLoading: false,
  }
  const useUserDataSpy = jest.fn(() => MOCK_USER_DATA)
  jest.doMock('./hooks/useUserData', () => useUserDataSpy)

  const [ChildrenSpy, MockChildren] = mockComponent()

  const { UserProvider } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render children correctly', () => {
      render(
        <UserProvider>
          <MockChildren />
        </UserProvider>,
      )

      expect(ChildrenSpy).toBeCalledTimes(1)
    })
  })

  describe('user data is loading', () => {
    it('should render loading page', () => {
      useUserDataSpy.mockReturnValue({ ...MOCK_USER_DATA, isLoading: true })
      render(
        <UserProvider>
          <MockChildren />
        </UserProvider>,
      )

      expect(CircularProgressSpy).toBeCalledTimes(1)
      expect(ChildrenSpy).not.toBeCalled()
    })
  })
})
