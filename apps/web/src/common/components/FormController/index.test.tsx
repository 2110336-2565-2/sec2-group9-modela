import { render, renderHook } from '@testing-library/react'
import { mockAndSpy, mockAndSpyMany } from 'common/utils/testing'
import { useForm } from 'react-hook-form'

describe('FormController', () => {
  const { result } = renderHook(() => useForm({}))
  const mockTextField = mockAndSpy('common/components/TextField')
  const [DesktopDatePickerSpy, TimePickerSpy] = mockAndSpyMany(
    '@mui/x-date-pickers',
    ['DesktopDatePicker', 'TimePicker'],
  )

  const [mockDivider, mockMenuItem] = mockAndSpyMany('@mui/material', [
    'Divider',
    'MenuItem',
  ])
  const mockHandleUploadFile = jest.fn()
  const mockUploadFile = jest.fn()
  const mockPasswordTextField = mockAndSpy(
    'common/components/PasswordTextField',
  )

  jest.doMock('common/components/UploadFile', () => mockUploadFile)

  test('should render TextField if type is textField', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        fullWidth={false}
        sm={12}
        xs={12}
        name="Hello"
        type="textField"
      />,
    )

    expect(mockTextField).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
        required: true,
        fullWidth: false,
      }),
    )
  })
  test('should render TextField if type is textField', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        fullWidth={false}
        sm={12}
        xs={12}
        name="Hello"
        type="textField"
      />,
    )

    expect(mockTextField).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
        required: true,
        fullWidth: false,
      }),
    )
  })

  test('should render TextField with type number if type is number', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        fullWidth={false}
        sm={12}
        xs={12}
        name="Hello"
        type="number"
      />,
    )

    expect(mockTextField).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
        required: true,
        fullWidth: false,
        type: 'number',
      }),
    )
  })
  test('should render Divider if type is divider', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(<FormController sm={12} xs={12} type="divider" />)

    expect(mockDivider).toBeCalled()
  })

  test('should render UploadFile if type is uploadFile', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        sm={12}
        xs={12}
        name="Hello"
        type="uploadFile"
        handleUploadFile={mockHandleUploadFile}
      />,
    )

    expect(mockUploadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Hello',
        handleSelectFile: mockHandleUploadFile,
      }),
      {},
    )
  })

  test('should render Select if type is select', () => {
    const { default: FormController } = require('.') as typeof import('.')
    const MOCK_SELECT = [
      {
        label: 'a',
        value: 'a',
      },
      {
        label: 'b',
        value: 'b',
      },
    ]

    render(
      <FormController
        control={result.current.control}
        label="Hello"
        sm={12}
        xs={12}
        fullWidth={false}
        optional={true}
        name="Hello"
        type="select"
        selectProps={MOCK_SELECT}
      />,
    )

    expect(mockTextField).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
        select: true,
        required: false,
        fullWidth: false,
      }),
    )

    MOCK_SELECT.forEach((val) => {
      expect(mockMenuItem).toHaveBeenCalledWith(expect.objectContaining(val))
    })
  })

  test('should render PasswordTextField if type is password', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        sm={12}
        xs={12}
        name="Hello"
        type="password"
        fullWidth={false}
      />,
    )

    expect(mockPasswordTextField).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
        required: true,
        fullWidth: false,
      }),
    )
  })

  test('should render PasswordTextField if type is password', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        sm={12}
        xs={12}
        name="Hello"
        type="password"
        fullWidth={false}
      />,
    )

    expect(mockPasswordTextField).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
        required: true,
        fullWidth: false,
      }),
    )
  })

  test('should render DatePicker if type is date', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        name="Hello"
        type="date"
      />,
    )

    expect(DesktopDatePickerSpy).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
      }),
    )
  })

  test('should render TimePicker if type is time', () => {
    const { default: FormController } = require('.') as typeof import('.')
    render(
      <FormController
        control={result.current.control}
        label="Hello"
        name="Hello"
        type="time"
      />,
    )

    expect(TimePickerSpy).toBeCalledWith(
      expect.objectContaining({
        label: 'Hello',
      }),
    )
  })
})
