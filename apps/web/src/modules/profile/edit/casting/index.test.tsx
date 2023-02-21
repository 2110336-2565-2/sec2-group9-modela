import { fireEvent, render } from '@testing-library/react'
import { mockAndSpy, mockAndSpyMany } from 'common/utils/testing'

import { FORM_LAYOUT } from './constants'

describe('<EditCastingProfile />', () => {
  const FormControllerSpy = mockAndSpy('common/components/FormController')
  FormControllerSpy.mockImplementation(() => {})

  const handleClickSubmitMock = jest.fn()
  const BASE_MOCK_HOOK = {
    handleClickSubmit: handleClickSubmitMock,
    control: {},
    imageUrl: '',
    isDataLoading: false,
    handleUploadImage: jest.fn(),
    loading: false,
  }
  const editCastingFormMock = jest.fn(() => BASE_MOCK_HOOK)

  jest.doMock('./hooks/useEditCastingForm', () => editCastingFormMock)

  const [CircularProgressSpy] = mockAndSpyMany('@mui/material', [
    'CircularProgress',
  ])
  CircularProgressSpy.mockImplementation(() => {})
  const { default: EditCastingProfile } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(EditCastingProfile).toBeDefined()
  })

  describe('while data fetching', () => {
    test('should render loading', () => {
      editCastingFormMock.mockReturnValueOnce({
        ...BASE_MOCK_HOOK,
        isDataLoading: true,
      })

      const { queryByText } = render(<EditCastingProfile />)
      expect(queryByText('บันทึกข้อมูล')).toBeNull()
      expect(CircularProgressSpy).toBeCalledTimes(1)
    })
  })

  describe('when data fetching finish', () => {
    test('should render form', async () => {
      const { queryByText } = render(<EditCastingProfile />)
      FORM_LAYOUT.forEach((val) => {
        if (!(val as any).label) return
        expect(queryByText((val as any).label)).toBeDefined()
      })

      expect(queryByText('บันทึกข้อมูล')).toBeDefined()
      expect(CircularProgressSpy).toBeCalledTimes(0)
    })

    test('should trigger handleClickSubmit when submit', () => {
      const { getByText } = render(<EditCastingProfile />)
      const el = getByText('บันทึกข้อมูล')

      expect(handleClickSubmitMock).toBeCalledTimes(0)

      fireEvent.submit(el)
      expect(handleClickSubmitMock).toBeCalledTimes(1)
    })
  })
})
