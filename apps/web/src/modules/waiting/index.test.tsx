import { render } from '@testing-library/react'

describe('<Waiting />', () => {
  const { default: Waiting } = require('.') as typeof import('.')

  test('default behavior', () => {
    const { getByText } = render(<Waiting />)

    expect(getByText('Modela')).toBeDefined()
    expect(getByText('สมัครสมาชิกเสร็จสิ้น')).toBeDefined()
    expect(
      getByText(
        'ขณะนี้แอดมินกำลังตรวจสอบความถูกต้องของข้อมูลของคุณ กรุณาลองใหม่ภายหลัง',
      ),
    ).toBeDefined()
  })
})
