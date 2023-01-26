export const callPropsFunction = (
  spy: jest.Mock,
  functionName: string,
  index: number = 0,
  props?: any[],
) => {
  if (!props) spy.mock.calls[index][0][functionName]()
  else spy.mock.calls[index][0][functionName](...props)
}
