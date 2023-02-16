import { render, waitFor } from '@testing-library/react'
import { mockAndSpyMany } from 'common/utils/testing'

describe('UploadFile', () => {
  const { default: UploadFile } = require('.') as typeof import('.')
  const handleUploadFileMock = jest.fn()
  const removeSameFileMock = jest.fn()
  const [muiLinkSpy, muiTypographySpy] = mockAndSpyMany('@mui/material', [
    'Link',
    'Typography',
  ])

  jest.doMock('./hooks/useUploadFile', () => ({
    default: () => ({
      handleUploadFile: handleUploadFileMock,
      name: 'Hello.png',
      removeSameFile: removeSameFileMock,
    }),
  }))

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should show label correctly', async () => {
    const { findByText } = render(
      <UploadFile
        error={false}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        handleSelectFile={(file: Blob) => {}}
        label="Hello World"
      />,
    )

    expect(await findByText('Hello World')).toBeDefined()
  })

  test('should show file name with correct url', () => {
    render(
      <UploadFile
        error={false}
        url="https://google.com"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        handleSelectFile={(file: Blob) => {}}
        label="Hello World"
      />,
    )

    waitFor(() => {
      expect(muiLinkSpy).toBeCalledWith(
        expect.objectContaining({
          children: 'Hello.png',
          url: 'https://google.com',
        }),
      )
    })
  })

  test('should show error if error flag is true', () => {
    render(
      <UploadFile
        error={true}
        errorMessage="Hello Error"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        handleSelectFile={(file: Blob) => {}}
        label="Hello World"
      />,
    )

    waitFor(() => {
      expect(muiTypographySpy).toBeCalledWith(
        expect.objectContaining({
          color: 'error',
          children: 'Hello Error',
        }),
      )
    })
  })
})
