import { render, waitFor } from '@testing-library/react'
import { mockAndSpy, mockAndSpyMany } from 'common/utils/testing'

describe('<ChooseSignup />', () => {
  const LinkMock = mockAndSpy('next/link')
  mockAndSpy('next/image')

  const [mediaQuerySpy] = mockAndSpyMany('@mui/material', ['useMediaQuery'])
  mediaQuerySpy.mockImplementation(() => true)

  const { default: ChooseSignup } = require('.') as typeof import('.')
  const HREF_TARGET: Record<string, string> = {
    '/signup/actor': 'นักแสดง',
    '/signup/casting': 'ผู้คัดเลือก',
    '/login': 'เข้าสู่ระบบ',
  }

  test('should navigate to correct path', () => {
    render(<ChooseSignup />)

    waitFor(() => {
      LinkMock.mock.calls.forEach((args) => {
        const arg = args[0]
        const targetText = HREF_TARGET[arg.href]

        expect(arg.children.props.children).toStrictEqual(targetText)
      })
    })
  })
})
