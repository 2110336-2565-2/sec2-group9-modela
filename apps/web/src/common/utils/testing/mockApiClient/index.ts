export const mockApiClient = () => {
  const getSpy = jest.fn()
  const mockGetReturn = (value: any) => {
    getSpy.mockReturnValue({ data: value })
  }

  jest.doMock('common/utils/api/axiosInstance', () => ({
    apiClient: {
      get: getSpy,
    },
  }))

  return { getSpy, mockGetReturn }
}
