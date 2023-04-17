import { render } from '@testing-library/react'
import React from 'react'

describe('<ProfileImage />', () => {
  const defaultProps = {
    src: 'https://picsum.photos/200',
    userId: 1,
    firstName: 'John',
  }

  const { default: ProfileImage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render ProfileImage correctly', () => {
        render(<ProfileImage {...defaultProps} />)

        // TODO: expect image to be rendered after changed to next image
      })
    })
  })

  describe('src is undefined', () => {
    describe('display', () => {
      it('should render fallback image correctly', () => {
        const { getByText } = render(
          <ProfileImage {...defaultProps} src={undefined} />,
        )

        expect(getByText('J')).toBeDefined()
      })
    })
  })
})
