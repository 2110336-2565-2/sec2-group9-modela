import { act, renderHook, waitFor } from '@testing-library/react'
import { mockApiClient } from 'common/utils/testing'

describe('useRefundForm', () => {
  const setErrorSpy = jest.fn()
  const setValueSpy = jest.fn()
  const MOCK_USE_FORM_RETURN = {
    control: {},
    setError: setErrorSpy,
    setValue: jest.fn(),
    handleSubmit: jest.fn(),
  }

  const MOCK_FETCH_REFUND = {
    title: 'งานทดสอบ',
    user: {
      firstname: 'ชื่อ',
      middlename: 'ชื่อกลาง',
      lastname: 'นามสกุล',
    },
  }

  const useFormSpy = jest.fn()
  useFormSpy.mockReturnValue(MOCK_USE_FORM_RETURN)

  jest.doMock('react-hook-form', () => ({
    useForm: useFormSpy,
  }))

  const { mockGetReturn } = mockApiClient()
  mockGetReturn(MOCK_FETCH_REFUND)

  global.URL.createObjectURL = jest.fn()

  const { default: useRefundForm } = require('.') as typeof import('.')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should fetch refund details', async () => {
      const { result } = renderHook(
        ({ jobId, actorId }: { jobId: number; actorId: number }) =>
          useRefundForm(jobId, actorId),
        { initialProps: { jobId: 1, actorId: 1 } },
      )

      waitFor(() => {
        expect(result.current.refundDetails).toEqual(MOCK_FETCH_REFUND)
      })
    })
  })

  describe('upload file', () => {
    it('file size is less than 5MB', () => {
      const { result } = renderHook(
        ({ jobId, actorId }: { jobId: number; actorId: number }) =>
          useRefundForm(jobId, actorId),
        { initialProps: { jobId: 1, actorId: 1 } },
      )
      const file = new File([new ArrayBuffer(10)], 'hello')

      act(() => {
        result.current.handleUploadFile(file)
      })

      waitFor(() => {
        expect(setErrorSpy).not.toHaveBeenCalled()
        expect(setValueSpy).toHaveBeenCalled()
      })
    })

    it('file size is more than 5MB', () => {
      const { result } = renderHook(
        ({ jobId, actorId }: { jobId: number; actorId: number }) =>
          useRefundForm(jobId, actorId),
        { initialProps: { jobId: 1, actorId: 1 } },
      )
      const file = new File([new ArrayBuffer(10 * 1024 * 1024)], 'hello')
      act(() => {
        result.current.handleUploadFile(file)
      })

      waitFor(() => {
        expect(setErrorSpy).toHaveBeenCalled()
        expect(setValueSpy).not.toHaveBeenCalled()
      })
    })
  })
})
