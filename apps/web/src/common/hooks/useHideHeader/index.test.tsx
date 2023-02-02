import { renderHook } from '@testing-library/react'

describe('useHideHeader()', () => {
  const setHideHeaderSpy = jest.fn()
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: () => ({ setHideHeader: setHideHeaderSpy }),
  }))

  const { default: useHideHeader } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', () => {
      renderHook(useHideHeader)

      expect(setHideHeaderSpy).toBeCalledWith(true)
    })

    it('should cleanup value correctly', () => {
      const { unmount } = renderHook(useHideHeader)
      unmount()
      expect(setHideHeaderSpy).toBeCalledWith(false)
    })
  })
})
