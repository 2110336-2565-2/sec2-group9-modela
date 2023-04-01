import { ApplicationStatus } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpy, mockAndSpyMany } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('<ActorCardHeader />', () => {
  const MOCK_PROPS = {
    firstName: 'firstName',
    lastName: 'lastName',
    profileImageUrl: 'www.google.com',
    middleName: 'middleName',
    actorId: 1,
    status: ApplicationStatus.OFFER_ACCEPTED,
    isRefundable: false,
  }

  const ProfileImageSpy = mockAndSpy('common/components/ProfileImage')
  const ChipSpy = mockAndSpy('common/components/Chip')
  const ReportOutlinedSpy = mockAndSpy('@mui/icons-material/ReportOutlined')
  const [IconButtonSpy] = mockAndSpyMany('@mui/material', ['IconButton'])

  mockRouter(true, { jobId: 1 })

  const { default: ActorCardHeader } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should display card header correctly', () => {
        render(<ActorCardHeader {...MOCK_PROPS} />)

        expect(ProfileImageSpy).toBeCalledTimes(1)
        expect(ChipSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('application is refundable', () => {
    describe('display', () => {
      it('should display refund button instead of status chip', () => {
        render(<ActorCardHeader {...MOCK_PROPS} isRefundable />)
        expect(ProfileImageSpy).toBeCalledTimes(1)
        expect(IconButtonSpy).toBeCalledWith(
          expect.objectContaining({
            href: '/job/1/actor/1/refund',
          }),
        )
        expect(ChipSpy).toBeCalledTimes(0)
        expect(ReportOutlinedSpy).toBeCalledTimes(1)
      })
    })
  })
})
