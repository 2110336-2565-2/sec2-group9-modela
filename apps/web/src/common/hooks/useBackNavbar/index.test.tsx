import { renderHook } from '@testing-library/react'

describe('useBackNavbar()', () => {
  const setOverrideSpy = jest.fn()
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: () => ({ setOverride: setOverrideSpy }),
  }))

  const MOCK_OVERRIDE = {
    title: 'Mafumafu',
    onBack: jest.fn(),
  }

  const { default: useBackNavbar } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', () => {
      renderHook(() => useBackNavbar(MOCK_OVERRIDE))

      expect(setOverrideSpy).toBeCalledWith(MOCK_OVERRIDE)
    })

    it('should cleanup value correctly', () => {
      const { unmount } = renderHook(() => useBackNavbar(MOCK_OVERRIDE))
      unmount()
      expect(setOverrideSpy).toBeCalledWith(null)
    })
  })
})
