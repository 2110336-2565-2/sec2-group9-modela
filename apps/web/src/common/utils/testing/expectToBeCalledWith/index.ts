export const expectToBeCalledWith = (
  spy: jest.Mock,
  expected: Record<string, any>,
  index: number = 0,
) => {
  expect(spy.mock.calls[index][0]).toMatchObject(expected)
}
