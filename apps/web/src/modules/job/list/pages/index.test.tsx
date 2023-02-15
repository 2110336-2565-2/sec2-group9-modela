import { GetJobCardWithMaxPageDto, mock, UserType } from '@modela/dtos'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockAndSpy, mockApiClient, mockUser } from 'common/utils/testing'
import { mockRouter } from 'common/utils/testing/mockRouter'
import React from 'react'

describe('<JobListlPage />', () => {
  const { mockUserType, mockVerify } = mockUser()
  mockRouter()

  const JobCardContainerMock = mockAndSpy(
    'modules/job/list/components/JobCardContainer',
  )
  const { mockGetReturn } = mockApiClient()
  const mockData: GetJobCardWithMaxPageDto = {
    maxPage: 1,
    jobs: mock('job')
      .get(5)
      .map((job) => ({
        companyName: mock('casting').get().companyName,
        jobCastingImageUrl: mock('user').get().profileImageUrl || '',
        ...job,
      })),
  }
  const fetchDataSpy = jest.fn()
  const createPostPageSpy = jest.fn()
  const useJobListDataSpy = jest.fn(() => ({
    job: { someData: 'data' },
    hasMore: true,
    fetchData: fetchDataSpy,
    filterData: [{ someFilterData: 'data' }],
    createPostPage: createPostPageSpy,
    state: {},
    setState: jest.fn(),
  }))
  jest.doMock('./hooks/useJobListData', () => useJobListDataSpy)
  jest.doMock('common/hooks/useNavbarSearch', () => jest.fn())
  const { default: JobListPage } = require('.') as typeof import('.')

  beforeEach(() => {
    mockUserType(UserType.CASTING)
    mockVerify(true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render correctly when API return correct data', async () => {
      mockGetReturn(mockData)
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <JobListPage />
        </LocalizationProvider>,
      )
      await waitFor(() => {
        expect(JobCardContainerMock).toBeCalledTimes(1)
        expect(useJobListDataSpy).toBeCalledTimes(1)
      })
    })
    it('should call page correctly when button is click', async () => {
      const { getByText } = render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <JobListPage />
        </LocalizationProvider>,
      )
      const createJobPostButton = getByText('สร้างโพสต์')
      fireEvent.click(createJobPostButton)
      expect(createJobPostButton).toBeDefined()
      expect(createPostPageSpy).toHaveBeenCalled()
    })
  })
})
