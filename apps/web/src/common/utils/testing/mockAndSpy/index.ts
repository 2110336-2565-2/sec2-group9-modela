import React from 'react'

import { mockComponent } from '../mockComponent'

export const mockAndSpy = (path: string): jest.Mock => {
  const [propsSpy, MockComponent] = mockComponent()

  jest.doMock(path, () => MockComponent)
  return propsSpy
}

export const mockAndSpyMany = (
  path: string,
  components: string[],
): jest.Mock[] => {
  const MockComponents: Record<string, React.FunctionComponent> = {}

  const propsSpies: jest.Mock[] = []

  components.forEach((component) => {
    const [propsSpy, MockComponent] = mockComponent()
    MockComponents[component] = MockComponent
    propsSpies.push(propsSpy)
  })

  jest.doMock(path, () => ({ ...jest.requireActual(path), ...MockComponents }))

  return propsSpies
}
