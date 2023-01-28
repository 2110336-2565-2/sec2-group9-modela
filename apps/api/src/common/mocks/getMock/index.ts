import { BaseModel } from 'src/common/types'

import { getMocks } from '../getMocks'

export const getMock = (model: BaseModel, override?: { [key: string]: any }) =>
  getMocks(model, 1, override)[0]
