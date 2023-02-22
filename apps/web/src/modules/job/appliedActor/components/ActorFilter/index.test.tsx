import { render } from '@testing-library/react'
import { mockAndSpyMany } from 'common/utils/testing'
import React from 'react'
import { Control } from 'react-hook-form'

import { ActorQuery } from '../../pages/types'

describe('<ActorFilter />', () => {
  const [ControllerSpy] = mockAndSpyMany('react-hook-form', ['Controller'])
  const { default: ActorFilter } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render ActorFilter correctly', () => {
        render(<ActorFilter control={{} as Control<ActorQuery>} />)

        expect(ControllerSpy).toBeCalledTimes(5)
      })
    })
  })
})
