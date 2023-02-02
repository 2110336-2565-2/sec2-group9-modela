import { renderHook } from '@testing-library/react'

describe('useHeaderFocus()', () => {
  const MOCK_FOCUS = 'jobs'

  const setHeaderFocusSpy = jest.fn()
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: () => ({ setHeaderFocus: setHeaderFocusSpy }),
  }))

  const { default: useHeaderFocus } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', () => {
      renderHook(() => useHeaderFocus(MOCK_FOCUS))

      expect(setHeaderFocusSpy).toBeCalledWith(MOCK_FOCUS)
    })

    it('should cleanup value correctly', () => {
      const { unmount } = renderHook(useHeaderFocus)
      unmount()
      expect(setHeaderFocusSpy).toBeCalledWith(null)
    })
  })
})
