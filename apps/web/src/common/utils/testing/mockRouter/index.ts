export const mockRouter = (isReady = true, query = {}) => {
  const pushSpy = jest.fn()
  const replaceSpy = jest.fn()

  let mockValue = {
    query,
    isReady,
  }

  const useRouterSpy = jest.fn()

  const mockReturn = () => {
    useRouterSpy.mockReturnValue({
      push: pushSpy,
      replace: replaceSpy,
      ...mockValue,
    })
  }

  const mockQuery = (query: { [key: string]: any }) => {
    mockValue = {
      ...mockValue,
      query,
    }
    mockReturn()
  }

  const mockIsReady = (isReady: boolean) => {
    mockValue = {
      ...mockValue,
      isReady,
    }
    mockReturn()
  }

  mockReturn()

  jest.doMock('next/router', () => ({ useRouter: useRouterSpy }))

  return { pushSpy, replaceSpy, mockQuery, mockIsReady }
}
