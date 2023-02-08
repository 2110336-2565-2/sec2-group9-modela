import { renderHook } from '@testing-library/react'

describe('useNavbarSearch()', () => {
  const setOnSearchSpy = jest.fn()
  jest.doMock('common/context/LayoutContext', () => ({
    useLayout: () => ({ setOnSearch: setOnSearchSpy }),
  }))

  const MOCK_CALLBACK = jest.fn()

  const { default: useNavbarSearch } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    it('should init value correctly', () => {
      renderHook(() => useNavbarSearch(MOCK_CALLBACK))

      // this can't be tested directly because it is anonymous function
      expect(setOnSearchSpy).toBeCalledWith(expect.any(Function))
    })

    it('should cleanup value correctly', () => {
      const { unmount } = renderHook(() => useNavbarSearch(MOCK_CALLBACK))
      unmount()
      expect(setOnSearchSpy).toBeCalledWith(null)
    })
  })
})
