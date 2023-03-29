export const mockApiClient = () => {
  const getSpy = jest.fn()
  const postSpy = jest.fn()
  const putSpy = jest.fn()
  const mockGetReturn = (value: any) => {
    getSpy.mockResolvedValue({ data: value })
  }

  jest.doMock('common/utils/api/axiosInstance', () => ({
    apiClient: {
      get: getSpy,
      post: postSpy,
      put: putSpy,
    },
  }))

  return { getSpy, postSpy, putSpy, mockGetReturn }
}
