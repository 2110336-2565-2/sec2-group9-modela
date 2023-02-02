import { renderHook } from '@testing-library/react'

describe('useNavbarFocus()', () => {
  const MOCK_FOCUS = 'jobs'

  const setNavbarFocusSpy = jest.fn()
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: () => ({ setNavbarFocus: setNavbarFocusSpy }),
  }))

  const { default: useNavbarFocus } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', () => {
      renderHook(() => useNavbarFocus(MOCK_FOCUS))

      expect(setNavbarFocusSpy).toBeCalledWith(MOCK_FOCUS)
    })

    it('should cleanup value correctly', () => {
      const { unmount } = renderHook(useNavbarFocus)
      unmount()
      expect(setNavbarFocusSpy).toBeCalledWith(null)
    })
  })
})
