import { mock, UserType } from '@modela/dtos'
import { render } from '@testing-library/react'
import {
  expectToBeCalledWith,
  mockAndSpy,
  mockAndSpyMany,
  mockUser,
} from 'common/utils/testing'
import React from 'react'

describe('<EditPage />', () => {
  const MOCK_INITIAL_VALUES = mock('job').get()
  const useInitialValuesSpy = jest.fn().mockReturnValue(MOCK_INITIAL_VALUES)
  jest.doMock('./hooks/useInitialValues', () => useInitialValuesSpy)

  const [CircularProgressSpy] = mockAndSpyMany('@mui/material', [
    'CircularProgress',
  ])
  const JobFormSpy = mockAndSpy('modules/job/components/JobForm')

  mockUser(UserType.CASTING)

  const replaceSpy = jest.fn()
  const useRouterSpy = jest.fn().mockReturnValue({ replace: replaceSpy })
  jest.doMock('next/router', () => ({ useRouter: useRouterSpy }))

  const { default: EditPage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render EditPage correctly', () => {
        render(<EditPage />)

        expectToBeCalledWith(JobFormSpy, {
          initialValues: MOCK_INITIAL_VALUES,
          edit: true,
        })
      })
    })
  })

  describe('still fetching initial values', () => {
    describe('display', () => {
      it('should render Loading', () => {
        useInitialValuesSpy.mockReturnValue(null)

        render(<EditPage />)

        expect(CircularProgressSpy).toBeCalledTimes(1)
        expect(JobFormSpy).not.toBeCalled()
      })
    })
  })
})
