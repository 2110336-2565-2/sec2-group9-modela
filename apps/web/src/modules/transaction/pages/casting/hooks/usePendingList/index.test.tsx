import { act, renderHook, waitFor } from '@testing-library/react'
import { mockApiClient } from 'common/utils/testing'

describe('usePendingList', () => {
  const { putSpy, getSpy, mockGetReturn } = mockApiClient()

  const { default: usePendingList } = require('.') as typeof import('.')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render initial correctly', async () => {
    mockGetReturn([
      {
        jobId: 1,
      },
    ])
    const { result } = renderHook(() => usePendingList())

    await waitFor(() => {
      expect(getSpy).toBeCalled()
      expect(result.current.pendingTransaction).toStrictEqual([
        {
          jobId: 1,
        },
      ])
    })
  })

  describe('jobModalDetails value', () => {
    it('should be null when initial', () => {
      mockGetReturn([])
      const { result } = renderHook(() => usePendingList())

      expect(result.current.jobModalDetails).toBeNull()
    })

    it('should be set when handleClickFinish is called', () => {
      mockGetReturn([])
      const { result } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickReject(1, 1)
      })

      expect(result.current.jobModalDetails).toStrictEqual({
        jobId: 1,
        castingId: 1,
        modalType: 'reject',
      })
      expect(result.current.isOpen).toBeTruthy()
    })

    it('should be set when handleClickReject is called', () => {
      mockGetReturn([])
      const { result } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickReject(1, 1)
      })

      expect(result.current.jobModalDetails).toStrictEqual({
        jobId: 1,
        castingId: 1,
        modalType: 'reject',
      })
      expect(result.current.isOpen).toBeTruthy()
    })
  })

  describe('handleCloseModal', () => {
    it('should set jobModalDetails to null', () => {
      mockGetReturn([])
      const { result } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickReject(1, 1)
      })

      expect(result.current.jobModalDetails).toStrictEqual({
        jobId: 1,
        castingId: 1,
        modalType: 'reject',
      })

      act(() => {
        result.current.handleCloseModal()
      })

      expect(result.current.jobModalDetails).toBeNull()
    })
  })

  describe('handleConfirmModal', () => {
    it('should call accept api when modalType is accept', async () => {
      mockGetReturn([
        {
          jobId: 1,
        },
      ])
      const { result } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickFinish(1, 1)
      })

      expect(result.current.jobModalDetails).toStrictEqual({
        jobId: 1,
        castingId: 1,
        modalType: 'accept',
      })

      await act(async () => {
        await result.current.handleConfirmModal()
      })

      await waitFor(() => {
        expect(putSpy).toBeCalledWith('/credits/jobs/1/accept')
        expect(result.current.jobModalDetails).toBeNull()
        expect(result.current.pendingTransaction).toStrictEqual([])
      })
    })

    it('should call reject api when modalType is reject', async () => {
      mockGetReturn([
        {
          jobId: 1,
        },
      ])
      const { result } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickReject(1, 1)
      })

      expect(result.current.jobModalDetails).toStrictEqual({
        jobId: 1,
        castingId: 1,
        modalType: 'reject',
      })

      await act(async () => {
        await result.current.handleConfirmModal()
      })

      expect(putSpy).toBeCalledWith('/credits/jobs/1/reject')
      expect(result.current.jobModalDetails).toBeNull()
      expect(result.current.pendingTransaction).toStrictEqual([])
    })
  })
})
