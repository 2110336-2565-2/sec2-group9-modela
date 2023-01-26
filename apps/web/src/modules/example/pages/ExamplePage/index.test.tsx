import { render } from '@testing-library/react'
import {
  callPropsFunction,
  expectToBeCalledWith,
  mockAndSpy,
} from 'common/utils/testing'
import React from 'react'

describe('<ExamplePage />', () => {
  const ButtonSpy = mockAndSpy('modules/example/components/Button')

  const MOCK_COUNT = 10
  const countUpSpy = jest.fn()
  const countDownSpy = jest.fn()

  const useCounterSpy = jest.fn(() => ({
    countUp: countUpSpy,
    countDown: countDownSpy,
    count: MOCK_COUNT,
  }))

  jest.doMock('./hooks/useCounter', () => useCounterSpy)

  const { default: ExamplePage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render ExamplePage correctly', () => {
        render(<ExamplePage />)

        expect(ButtonSpy).toBeCalledTimes(2)
        expectToBeCalledWith(ButtonSpy, { text: 'Up' })
        expectToBeCalledWith(ButtonSpy, { text: 'Down' }, 1)
      })
    })

    describe('event', () => {
      it('should count up correctly', () => {
        render(<ExamplePage />)

        callPropsFunction(ButtonSpy, 'onClick')
        expect(countUpSpy).toBeCalledTimes(1)
      })

      it('should count down correctly', () => {
        render(<ExamplePage />)

        callPropsFunction(ButtonSpy, 'onClick', 1)
        expect(countDownSpy).toBeCalledTimes(1)
      })
    })
  })
})
