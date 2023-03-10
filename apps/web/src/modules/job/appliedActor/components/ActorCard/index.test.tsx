import { ApplicationStatus } from '@modela/database'
import { render } from '@testing-library/react'
import {
  expectToBeCalledWith,
  mockAndSpy,
  mockAndSpyMany,
} from 'common/utils/testing'
import React from 'react'

describe('<ActorCard />', () => {
  const MOCK_ACTOR = {
    firstName: 'firstName',
    lastName: 'lastName',
    profileImageUrl: 'www.google.com',
    middleName: 'middleName',
    actorId: 1,
    resumeId: 1,
    resumeUrl: 'www.google.com',
    status: ApplicationStatus.PENDING,
    applicationId: 1,
    description: 'description',
  }

  const LinkSpy = mockAndSpy('next/link')
  const ActorCardHeaderSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorCardHeader',
  )
  const [ResumeDownloadButtonSpy] = mockAndSpyMany(
    'modules/job/appliedActor/components/ActorCard/styled',
    ['ResumeDownloadButton'],
  )
  const ActorCardActionSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorCardAction',
  )

  const { default: ActorCard } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render ActorCard correctly', () => {
        const { getByText } = render(<ActorCard {...MOCK_ACTOR} />)

        expect(ActorCardHeaderSpy).toBeCalledTimes(1)
        expect(getByText(MOCK_ACTOR.description)).toBeDefined()
        expect(ActorCardActionSpy).toBeCalledTimes(1)
      })
    })

    describe('event', () => {
      it('should open resume click on ResumeDownloadButton', () => {
        render(<ActorCard {...MOCK_ACTOR} />)

        expectToBeCalledWith(ResumeDownloadButtonSpy, {
          href: MOCK_ACTOR.resumeUrl,
        })
      })

      it('should call redirect to profile page when click on card', () => {
        render(<ActorCard {...MOCK_ACTOR} />)

        expectToBeCalledWith(LinkSpy, {
          href: `/profile/${MOCK_ACTOR.actorId}`,
        })
      })
    })
  })

  describe('status is not pending', () => {
    it('should not render ResumeDownloadButton', () => {
      render(
        <ActorCard {...MOCK_ACTOR} status={ApplicationStatus.OFFER_ACCEPTED} />,
      )

      expect(ActorCardActionSpy).not.toBeCalled()
    })
  })
})
