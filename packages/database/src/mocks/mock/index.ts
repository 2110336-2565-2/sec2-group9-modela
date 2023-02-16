import { BaseModel, BaseModelType } from '../../types'
import { getBaseMock } from '../getBaseMock'

export const mock = <T extends keyof BaseModelType>(model: T) => {
  return new MockConstructor<BaseModelType[T], BaseModelType[T]>(model)
}

class MockConstructor<T, R> {
  private model: BaseModel
  private pickFields: (keyof T)[] = null
  private overrides: Partial<{ [key in keyof T]: any }>
  private omitFields: (keyof T)[] = []

  constructor(
    model: BaseModel,
    overrides?: Partial<{ [key in keyof T]: any }>,
    omitFields?: (keyof T)[],
    pickFields?: (keyof T)[],
  ) {
    this.model = model
    if (overrides) this.overrides = overrides
    if (omitFields) this.omitFields = omitFields
    if (pickFields) this.pickFields = pickFields
    return this
  }

  public override(overrides: Partial<{ [key in keyof T]: any }>) {
    this.overrides = { ...this.overrides, ...overrides }
    return this
  }

  public omit<K extends keyof T>(omitFields: K[]) {
    return new MockConstructor<T, Omit<T, K>>(
      this.model,
      this.overrides,
      [...this.omitFields, ...omitFields],
      this.pickFields,
    )
  }

  public pick<K extends keyof T>(pickFields: K[]) {
    return new MockConstructor<T, Pick<T, K>>(
      this.model,
      this.overrides,
      this.omitFields,
      this.pickFields ? [...this.pickFields, ...pickFields] : pickFields,
    )
  }

  public get(): R
  public get(number: number): R[]

  public get(number?: number) {
    let MOCKS = []
    for (let i = 1; i <= (number || 1); i++) {
      const MOCK = getBaseMock(this.model, i, true)
      MOCKS.push({ ...MOCK, ...this.overrides })
    }

    MOCKS.map((mock) => this.omitFields.forEach((field) => delete mock[field]))
    if (this.pickFields)
      MOCKS = MOCKS.map((mock) => {
        const MOCK: any = {}
        this.pickFields.forEach((field) => (MOCK[field] = mock[field]))
        return MOCK
      })

    return number ? MOCKS : MOCKS[0]
  }
}
