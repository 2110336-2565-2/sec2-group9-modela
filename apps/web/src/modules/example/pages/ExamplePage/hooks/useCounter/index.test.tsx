import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe('useCounter()', () => {
  const { default: useCounter } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init count correctly', () => {
      const { result } = renderHook(() => useCounter())

      expect(result.current.count).toBe(0)
    })

    it('should count up correctly', () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.countUp()
      })
      expect(result.current.count).toBe(1)
    })

    it('should count down correctly', () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.countUp()
        result.current.countUp()
        result.current.countUp()
        result.current.countDown()
      })
      expect(result.current.count).toBe(2)
    })
  })

  describe('count is zero', () => {
    it('should not count down', () => {
      const { result } = renderHook(() => useCounter())

      act(() => {
        result.current.countDown()
      })
      expect(result.current.count).toBe(0)
    })
  })
})
