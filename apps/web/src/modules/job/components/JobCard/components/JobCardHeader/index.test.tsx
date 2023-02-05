import { mock } from '@modela/dtos'
import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'
import React from 'react'

describe('<Header />', () => {
  const ImageSpy = mockAndSpy('next/image')
  const MOCK_TITLE = mock('job').get().title
  const MOCK_COMPANY_NAME = mock('casting').get().companyName
  const MOCK_CASTING_IMAGE = mock('user').get().profileImageUrl || ''
  const headerProps = {
    castingImage: MOCK_CASTING_IMAGE,
    companyName: MOCK_COMPANY_NAME,
    title: MOCK_TITLE,
  }
  const reportButtonSpy = mockAndSpy('@mui/icons-material/ReportOutlined')

  const { default: Header } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should render Header correctly', () => {
      const { getByText } = render(<Header {...headerProps} />)
      expect(ImageSpy).toBeCalledTimes(1)
      expect(getByText(MOCK_TITLE)).toBeDefined()
      expect(getByText(MOCK_COMPANY_NAME)).toBeDefined()
      expect(reportButtonSpy).toBeCalledTimes(1)
    })

    it('should call report function correctly', () => {
      // TODO: write this test after implement report function properly
    })
  })
})