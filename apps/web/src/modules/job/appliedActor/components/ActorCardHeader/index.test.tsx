import { ApplicationStatus } from '@modela/database'
import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<ActorCardHeader />', () => {
  const MOCK_PROPS = {
    firstName: 'firstName',
    lastName: 'lastName',
    profileImageUrl: 'www.google.com',
    middleName: 'middleName',
    actorId: 1,
    status: ApplicationStatus.OFFER_ACCEPTED,
  }

  const ProfileImageSpy = mockAndSpy('common/components/ProfileImage')
  const ChipSpy = mockAndSpy('common/components/Chip')

  const { default: ActorCardHeader } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render ActorCardHeader correctly', () => {
        render(<ActorCardHeader {...MOCK_PROPS} />)

        expect(ProfileImageSpy).toBeCalledTimes(1)
        expect(ChipSpy).toBeCalledTimes(1)
      })
    })
  })
})
