import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'
import { Control } from 'react-hook-form'

import { ActorQuery } from '../../pages/types'

describe('<ActorFilterModal />', () => {
  const useBackNavbarSpy = jest.fn()
  jest.doMock('common/hooks/useBackNavbar', () => useBackNavbarSpy)

  const ActorFilterSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorFilter',
  )

  const { default: ActorFilterModal } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render ActorFilterModal correctly', () => {
        render(
          <ActorFilterModal
            control={{} as Control<ActorQuery>}
            onClose={jest.fn()}
          />,
        )

        expect(useBackNavbarSpy).toBeCalledTimes(1)
        expect(ActorFilterSpy).toBeCalledTimes(1)
      })
    })
  })
})
