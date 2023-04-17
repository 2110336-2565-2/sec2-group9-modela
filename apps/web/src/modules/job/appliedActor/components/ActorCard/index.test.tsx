import { ApplicationStatus, JobStatus } from '@modela/dtos'
import { render } from '@testing-library/react'
import {
  expectToBeCalledWith,
  mockAndSpy,
  mockRouter,
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

  const JOB_STATUS = JobStatus.SELECTING

  const LinkSpy = mockAndSpy('next/link')
  const ActorCardHeaderSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorCardHeader',
  )
  const ResumeDownloadButtonSpy = mockAndSpy(
    'modules/job/appliedActor/components/ResumeDownloadButton',
  )
  const ActorCardActionSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorCardAction',
  )

  const { mockQuery } = mockRouter()

  const { default: ActorCard } = require('.') as typeof import('.')

  beforeEach(() => {
    mockQuery({ jobId: 1 })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render ActorCard correctly', () => {
        const { getByText } = render(
          <ActorCard jobStatus={JOB_STATUS} {...MOCK_ACTOR} />,
        )

        expect(ActorCardHeaderSpy).toBeCalledTimes(1)
        expect(getByText(MOCK_ACTOR.description)).toBeDefined()
        expect(ActorCardActionSpy).toBeCalledTimes(1)
      })
    })

    describe('event', () => {
      it('should open resume when click on ResumeDownloadButton', () => {
        render(<ActorCard jobStatus={JOB_STATUS} {...MOCK_ACTOR} />)

        expectToBeCalledWith(ResumeDownloadButtonSpy, {
          resumeUrl: MOCK_ACTOR.resumeUrl,
        })
      })

      it('should call redirect to profile page when click on card', () => {
        render(<ActorCard jobStatus={JOB_STATUS} {...MOCK_ACTOR} />)

        expectToBeCalledWith(LinkSpy, {
          href: `/profile/${MOCK_ACTOR.actorId}`,
        })
      })
    })
  })

  describe('status is not pending', () => {
    it('should not render ResumeDownloadButton', () => {
      render(
        <ActorCard
          jobStatus={JOB_STATUS}
          {...MOCK_ACTOR}
          status={ApplicationStatus.OFFER_ACCEPTED}
        />,
      )

      expect(ActorCardActionSpy).not.toBeCalled()
    })
  })
})
