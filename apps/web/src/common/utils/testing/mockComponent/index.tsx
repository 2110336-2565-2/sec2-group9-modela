import React from 'react'

export const mockComponent = (): [jest.Mock, React.FunctionComponent] => {
  const propsSpy = jest.fn()

  const MockComponent: React.FunctionComponent<any> = (props) => {
    propsSpy(props)

    return <div>{props.children}</div>
  }

  return [propsSpy, MockComponent]
}
