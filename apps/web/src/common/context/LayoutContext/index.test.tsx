import { render } from '@testing-library/react'
import { mockAndSpy, mockComponent } from 'common/utils/testing'
import React from 'react'

describe('<LayoutProvider />', () => {
  const [ChildrenSpy, MockChildren] = mockComponent()
  const LayoutSpy = mockAndSpy('common/components/Layout')

  const { LayoutProvider } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render children correctly', () => {
      render(
        <LayoutProvider>
          <MockChildren />
        </LayoutProvider>,
      )
      expect(LayoutSpy).toBeCalledTimes(1)
      expect(ChildrenSpy).toBeCalledTimes(1)
    })
  })
})
