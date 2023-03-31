import { act, renderHook, waitFor } from '@testing-library/react'
import { mockApiClient } from 'common/utils/testing'

describe('usePendingRefundList', () => {
  const { putSpy, getSpy, mockGetReturn } = mockApiClient()

  const { default: usePendingList } = require('.') as typeof import('.')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render initial correctly', async () => {
    mockGetReturn([
      {
        jobId: 1,
        actor: {
          actorId: 1,
        },
      },
    ])
    const { result } = renderHook(() => usePendingList())

    await waitFor(() => {
      expect(getSpy).toBeCalled()
      expect(result.current.pendingRefunds).toStrictEqual([
        {
          jobId: 1,
          actor: {
            actorId: 1,
          },
        },
      ])
    })
  })

  describe('jobModalDetails value', () => {
    it('should be null when initial', () => {
      mockGetReturn([])
      const { result } = renderHook(() => usePendingList())

      expect(result.current.refundModalDetails).toBeNull()
    })

    it('should be set when handleClickFinish is called', () => {
      mockGetReturn([])
      const { result } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickReject(1, 1)
      })

      expect(result.current.refundModalDetails).toStrictEqual({
        jobId: 1,
        actorId: 1,
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

      expect(result.current.refundModalDetails).toStrictEqual({
        jobId: 1,
        actorId: 1,
        modalType: 'reject',
      })
      expect(result.current.isOpen).toBeTruthy()
    })
  })

  describe('handleCloseModal', () => {
    it('should set refundModalDetails to null', () => {
      mockGetReturn([])
      const { result } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickReject(1, 1)
      })

      expect(result.current.refundModalDetails).toStrictEqual({
        jobId: 1,
        actorId: 1,
        modalType: 'reject',
      })

      act(() => {
        result.current.handleCloseModal()
      })

      expect(result.current.refundModalDetails).toBeNull()
    })
  })

  describe('handleConfirmModal', () => {
    it('should call accept api when modalType is accept', async () => {
      mockGetReturn([
        {
          jobId: 1,
          actor: {
            actorId: 1,
          },
        },
      ])
      const { result, rerender } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickFinish(1, 1)
      })

      expect(result.current.refundModalDetails).toStrictEqual({
        jobId: 1,
        actorId: 1,
        modalType: 'accept',
      })

      await result.current.handleConfirmModal()
      rerender()

      await waitFor(() => {
        expect(putSpy).toBeCalledWith('/refunds/jobs/1/actors/1/accept')
        expect(result.current.refundModalDetails).toBeNull()
        expect(result.current.pendingRefunds).toStrictEqual([])
      })
    })

    it('should call reject api when modalType is reject', async () => {
      mockGetReturn([
        {
          jobId: 1,
          actor: {
            actorId: 1,
          },
        },
      ])
      const { result, rerender } = renderHook(() => usePendingList())

      act(() => {
        result.current.handleClickReject(1, 1)
      })

      expect(result.current.refundModalDetails).toStrictEqual({
        jobId: 1,
        actorId: 1,
        modalType: 'reject',
      })

      await result.current.handleConfirmModal()
      rerender()

      expect(putSpy).toBeCalledWith('/refunds/jobs/1/actors/1/reject')
      expect(result.current.refundModalDetails).toBeNull()
      expect(result.current.pendingRefunds).toStrictEqual([])
    })
  })
})
