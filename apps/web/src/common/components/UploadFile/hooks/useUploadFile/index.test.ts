import { act, renderHook } from '@testing-library/react'
import { ChangeEvent, MouseEvent } from 'react'

describe('useUploadFile', () => {
  const { default: useUploadFile } = require('.') as typeof import('.')
  const MOCK_File = new File([], 'HelloWorld.png')

  const setUploadFileMock = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('default behavior', () => {
    const { result } = renderHook(() => useUploadFile(setUploadFileMock))

    expect(result.current.name).toStrictEqual('')
    expect(result.current.removeSameFile).toBeDefined()
    expect(result.current.handleUploadFile).toBeDefined()
  })

  test('trigger handle upload file should set correctly', () => {
    const { result, rerender } = renderHook(() =>
      useUploadFile(setUploadFileMock),
    )

    act(() => {
      result.current.handleUploadFile({
        target: {
          files: [MOCK_File],
        },
      } as unknown as ChangeEvent<HTMLInputElement>)
    })

    rerender()

    expect(setUploadFileMock).toBeCalledWith(MOCK_File)
    expect(result.current.name).toStrictEqual('HelloWorld.png')
  })

  test('trigger removeSameFile should reset event value', () => {
    const { result } = renderHook(() => useUploadFile(setUploadFileMock))

    const ev = {
      currentTarget: {
        value: 'Hello',
      },
    }

    act(() => {
      result.current.removeSameFile(ev as MouseEvent<HTMLInputElement>)
    })

    expect(ev.currentTarget.value).toStrictEqual('')
  })
})
