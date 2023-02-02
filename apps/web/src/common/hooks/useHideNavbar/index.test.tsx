import { renderHook } from '@testing-library/react'

describe('useHideNavbar()', () => {
  const setHideNavbarSpy = jest.fn()
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: () => ({ setHideNavbar: setHideNavbarSpy }),
  }))

  const { default: useHideNavbar } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', () => {
      renderHook(useHideNavbar)

      expect(setHideNavbarSpy).toBeCalledWith(true)
    })

    it('should cleanup value correctly', () => {
      const { unmount } = renderHook(useHideNavbar)
      unmount()
      expect(setHideNavbarSpy).toBeCalledWith(false)
    })
  })
})
