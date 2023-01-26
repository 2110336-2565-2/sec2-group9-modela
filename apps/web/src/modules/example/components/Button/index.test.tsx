import { render } from '@testing-library/react'
import React from 'react'

describe('<Button />', () => {
  const MOCK_TEXT = 'test'

  const defaultProps = {
    onClick: jest.fn(),
    text: MOCK_TEXT,
  }

  const { default: Button } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render Button correctly', () => {
        const { getByText } = render(<Button {...defaultProps} />)
        expect(getByText(MOCK_TEXT)).toBeDefined()
      })
    })
  })
})
