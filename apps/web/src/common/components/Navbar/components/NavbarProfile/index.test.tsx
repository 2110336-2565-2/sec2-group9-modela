import { UserType } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockUser } from 'common/utils/testing'
import React from 'react'

describe('<NavbarProfile />', () => {
  const { mockUserType, MOCK_USER } = mockUser()
  const { default: NavbarProfile } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render NavbarProfile correctly', () => {
        const { getByText } = render(<NavbarProfile />)

        expect(
          getByText(
            `คุณ${MOCK_USER.firstName} ${MOCK_USER.middleName} ${MOCK_USER.lastName}`,
          ),
        ).toBeDefined()
      })
    })
  })

  describe('company name is defined', () => {
    describe('display', () => {
      it('should render NavbarProfile correctly', () => {
        mockUserType(UserType.CASTING)

        const { getByText } = render(<NavbarProfile />)

        expect(getByText(MOCK_USER.companyName)).toBeDefined()
      })
    })
  })
})
