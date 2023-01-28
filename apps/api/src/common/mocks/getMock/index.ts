import { BaseModel } from 'src/common/types'

import { getBaseMock } from '../getBaseMock'

export const getMocks = (
  model: BaseModel,
  number = 1,
  override?: { [key: string]: any },
) => {
  const MOCKS = []
  for (let i = 1; i <= number; i++) {
    const MOCK = getBaseMock(model, i, true)
    MOCKS.push({ ...MOCK, ...override })
  }

  return MOCKS
}

export const getMock = (model: BaseModel, override?: { [key: string]: any }) =>
  getMocks(model, 1, override)[0]
