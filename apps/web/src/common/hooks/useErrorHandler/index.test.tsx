import { renderHook } from '@testing-library/react'
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { mockRouter } from 'common/utils/testing/mockRouter'

describe('useErrorHandler()', () => {
  const { replaceSpy } = mockRouter()

  const displaySnackbarSpy = jest.fn()
  jest.doMock('common/context/SnackbarContext', () => ({
    useSnackbar: () => ({
      displaySnackbar: displaySnackbarSpy,
    }),
  }))
  jest.dontMock('common/hooks/useErrorHandler')

  const { useErrorHandler } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it.each`
      errorCode | link
      ${401}    | ${'/login'}
      ${404}    | ${'/404'}
      ${500}    | ${'/500'}
      ${403}    | ${'/'}
    `(
      'should redirect correctly when error code is $errorCode',
      ({ errorCode, link }) => {
        const { result } = renderHook(() => useErrorHandler())
        result.current.handleError(
          new AxiosError('', '', {} as InternalAxiosRequestConfig, '', {
            status: errorCode,
          } as AxiosResponse),
        )

        expect(replaceSpy).toBeCalledWith(link)
      },
    )

    it.each`
      errorCode | message
      ${400}    | ${'กรุณากรอกข้อมูลให้ถูกต้อง'}
      ${409}    | ${'เกิดข้อขัดแย้งกับข้อมูลที่มีอยู่'}
    `(
      'should redirect correctly when error code is $errorCode',
      ({ errorCode, message }) => {
        const { result } = renderHook(() => useErrorHandler())
        result.current.handleError(
          new AxiosError('', '', {} as InternalAxiosRequestConfig, '', {
            status: errorCode,
          } as AxiosResponse),
        )

        expect(displaySnackbarSpy).toBeCalledWith(message, 'error')
      },
    )
  })

  describe('override error message', () => {
    it('should override error message correctly', () => {
      const { result } = renderHook(() => useErrorHandler())
      result.current.handleError(
        new AxiosError('', '', {} as InternalAxiosRequestConfig, '', {
          status: 404,
        } as AxiosResponse),
        { 404: 'override message' },
      )

      expect(displaySnackbarSpy).toBeCalledWith('override message', 'error')
    })
  })
})
