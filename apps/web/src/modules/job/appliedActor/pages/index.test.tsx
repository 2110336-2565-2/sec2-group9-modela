import { UserType } from '@modela/database'
import { render } from '@testing-library/react'
import {
  expectToBeCalledWith,
  mockAndSpy,
  mockComponent,
  mockUser,
} from 'common/utils/testing'
import React from 'react'

describe('<AppliedActorPage />', () => {
  mockUser(UserType.CASTING)

  const closeSpy = jest.fn()
  const onSubmitSpy = jest.fn()
  const MOCK_QUERY = 'query'
  const USE_FILTER_RETURN = {
    modal: {
      isOpen: false,
      close: closeSpy,
    },
    control: {},
    onSubmit: onSubmitSpy,
    query: MOCK_QUERY,
  }
  const useFilterSpy = jest.fn().mockReturnValue(USE_FILTER_RETURN)
  jest.doMock('./hooks/useFilter', () => useFilterSpy)

  const MOCK_ACTOR_DATA = [{ applicationId: 1 }, { applicationId: 2 }]
  const useActorDataSpy = jest.fn().mockReturnValue(MOCK_ACTOR_DATA)
  jest.doMock('./hooks/useActorData', () => useActorDataSpy)

  const ActorFilterModalSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorFilterModal',
  )
  const JobMenuSpy = mockAndSpy('modules/job/components/JobMenu')
  const ActorCardSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorCard',
  )
  const SearchFieldSpy = mockAndSpy(
    'modules/job/appliedActor/components/SearchField',
  )
  const ActorFilterSpy = mockAndSpy(
    'modules/job/appliedActor/components/ActorFilter',
  )

  const useMediaQuerySpy = jest.fn().mockReturnValue(false)
  const [CircularProgressSpy, MockCircularProgress] = mockComponent()
  jest.doMock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: useMediaQuerySpy,
    CircularProgress: MockCircularProgress,
  }))

  const { default: AppliedActorPage } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('display', () => {
      it('should render AppliedActorPage correctly', () => {
        render(<AppliedActorPage />)

        expectToBeCalledWith(JobMenuSpy, { focus: 'actor' })
        expectToBeCalledWith(SearchFieldSpy, {
          onSubmit: onSubmitSpy,
        })
        expect(ActorCardSpy).toBeCalledTimes(2)
        expect(ActorFilterSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('still fetching actor data', () => {
    it('should render loading', () => {
      useActorDataSpy.mockReturnValue(null)

      render(<AppliedActorPage />)

      expect(CircularProgressSpy).toBeCalledTimes(1)
      expect(ActorCardSpy).not.toBeCalled()
    })
  })

  describe('there is no actor', () => {
    it('should render no actor text', () => {
      useActorDataSpy.mockReturnValue([])
      const { getByText } = render(<AppliedActorPage />)
      expect(getByText('ไม่พบนักแสดง')).toBeDefined()
    })
  })

  describe('modal is open in mobile', () => {
    it('should render modal correctly', () => {
      useMediaQuerySpy.mockReturnValue(true)
      useFilterSpy.mockReturnValue({
        ...USE_FILTER_RETURN,
        modal: {
          isOpen: true,
          close: closeSpy,
        },
      })

      render(<AppliedActorPage />)

      expectToBeCalledWith(ActorFilterModalSpy, {
        onClose: closeSpy,
      })

      expect(ActorFilterSpy).not.toBeCalled()
      expect(SearchFieldSpy).not.toBeCalled()
    })
  })
})
