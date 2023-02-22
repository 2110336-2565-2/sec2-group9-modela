import { render } from '@testing-library/react'
import { expectToBeCalledWith, mockAndSpyMany } from 'common/utils/testing'
import React from 'react'

import { TEXT_COLOR } from './constants'

describe('<Chip />', () => {
  const [ChipContainerSpy] = mockAndSpyMany('common/components/Chip/styled', [
    'ChipContainer',
  ])
  const MOCK_LABEL = 'Listen to Mafumafu :)'
  const MOCK_VARIANT = 'orange'
  const { default: Chip } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render Chip correctly', () => {
        const { getByText } = render(
          <Chip label={MOCK_LABEL} variant={MOCK_VARIANT} />,
        )

        expect(getByText(MOCK_LABEL)).toBeDefined()
      })
    })
  })

  describe('outlined', () => {
    describe('display', () => {
      it('should render Chip correctly', () => {
        render(<Chip label={MOCK_LABEL} variant={MOCK_VARIANT} outlined />)

        expectToBeCalledWith(ChipContainerSpy, {
          sx: {
            border: `1px solid ${TEXT_COLOR[MOCK_VARIANT]}`,
          },
        })
      })
    })
  })
})
