import { UserStatus, UserType } from '@modela/database'
import { render } from '@testing-library/react'
import {
  expectToBeCalledWith,
  mockAndSpy,
  mockAndSpyMany,
  mockUser,
} from 'common/utils/testing'
import React from 'react'

describe('<RejectedPage />', () => {
  const MOCK_REASON = 'reason'
  const MOCK_INITIAL_DATA = {
    hello: 'world',
  }
  const { mockUserType } = mockUser(UserType.ACTOR, UserStatus.REJECTED)

  const useInitialDataSpy = jest.fn().mockReturnValue({
    reason: MOCK_REASON,
    data: MOCK_INITIAL_DATA,
  })
  jest.doMock('./hooks/useInitialData', () => useInitialDataSpy)

  const [CircularProgressSpy] = mockAndSpyMany('@mui/material', [
    'CircularProgress',
  ])

  const EditActorInfoFormSpy = mockAndSpy('modules/rejected/actor')

  const { default: RejectedPage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('user is actor', () => {
    describe('display', () => {
      it('should render reject page correctly', () => {
        mockUserType(UserType.ACTOR)
        const { getByText } = render(<RejectedPage />)

        expect(useInitialDataSpy).toBeCalledWith(UserType.ACTOR)
        expect(getByText(`เหตุผล: ${MOCK_REASON}`)).toBeDefined()
        expectToBeCalledWith(EditActorInfoFormSpy, {
          initialData: MOCK_INITIAL_DATA,
        })
      })
    })
  })

  describe('initial data is null', () => {
    describe('display', () => {
      it('should render loading component', () => {
        useInitialDataSpy.mockReturnValue(null)
        render(<RejectedPage />)

        expect(CircularProgressSpy).toBeCalledTimes(1)
      })
    })
  })
})
