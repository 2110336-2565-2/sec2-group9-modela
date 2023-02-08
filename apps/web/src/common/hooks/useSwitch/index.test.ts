import { act, renderHook } from '@testing-library/react'

describe('useSwitch()', () => {
  const { default: useSwitch } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('default', () => {
    it('should init isOpen correctly', () => {
      const { result } = renderHook(useSwitch)

      expect(result.current.isOpen).toBeFalsy()
    })
  })

  describe('event', () => {
    it('should perform open correctly', () => {
      const { result } = renderHook(useSwitch)

      expect(result.current.isOpen).toBeFalsy()

      act(() => {
        result.current.open()
      })

      expect(result.current.isOpen).toBeTruthy()
    })

    it('should perform close correctly', () => {
      const { result } = renderHook(useSwitch)

      act(() => {
        result.current.open()
      })

      expect(result.current.isOpen).toBeTruthy()

      act(() => {
        result.current.close()
      })

      expect(result.current.isOpen).toBeFalsy()
    })

    it('should perform toggle correctly', () => {
      const { result } = renderHook(useSwitch)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.isOpen).toBeTruthy()

      act(() => {
        result.current.toggle()
      })

      expect(result.current.isOpen).toBeFalsy()
    })
  })
})
