import { mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpyMany } from 'common/utils/testing'
import React from 'react'

describe('UserProvider', () => {
  const [CircularProgressSpy] = mockAndSpyMany('@mui/material', [
    'CircularProgress',
  ])

  const MOCK_USER_DATA = {
    user: mock('user').get(),
    isLoading: true,
  }
  const useUserDataSpy = () => MOCK_USER_DATA
  jest.doMock('./hooks/useUserData', () => useUserDataSpy)

  const { UserProvider } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('user data is loading', () => {
    it('should render loading page', () => {
      render(
        <UserProvider>
          <div>children</div>
        </UserProvider>,
      )

      expect(CircularProgressSpy).toBeCalledTimes(1)
    })
  })
})
