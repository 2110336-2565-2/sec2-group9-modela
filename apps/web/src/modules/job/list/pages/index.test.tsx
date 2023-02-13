import { GetJobCardWithMaxPageDto, mock } from '@modela/dtos'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { render, waitFor } from '@testing-library/react'
import { mockAndSpy, mockApiClient } from 'common/utils/testing'
import React from 'react'
describe('<JobListlPage />', () => {
  jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }))
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
  const useJobListDataSpy = jest.fn(() => ({
    job: { someData: 'data' },
    hasMore: true,
    fetchData: fetchDataSpy,
    filterData: [{ someFilterData: 'data' }],
  }))
  const useFilterDataSpy = jest.fn(() => ({
    state: {},
    setState: jest.fn(),
  }))
  jest.doMock('./hooks/useJobListData', () => useJobListDataSpy)
  jest.doMock('./hooks/useFilterData', () => useFilterDataSpy)
  jest.doMock('common/hooks/useNavbarSearch', () => jest.fn())
  const { default: JobListPage } = require('.') as typeof import('.')

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
  })
})
