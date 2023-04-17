import { render } from '@testing-library/react'

describe('<ConfirmModalBody />', () => {
  const handleCancel = jest.fn()
  const handleConfirm = jest.fn()
  const { default: ConfirmModalBody } = require('.') as typeof import('.')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('normal behavior', () => {
    describe('should render text correctly when', () => {
      it('modal state is accepts', () => {
        const { queryByText } = render(
          <ConfirmModalBody
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            modalType="accept"
          />,
        )
        expect(queryByText('ทำเครื่องหมายว่าเสร็จสิ้นแล้ว')).toBeDefined()
        expect(queryByText('จัดการเสร็จสิ้น')).toBeDefined()
      })

      it('modal state is rejects', () => {
        const { queryByText } = render(
          <ConfirmModalBody
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            modalType="reject"
          />,
        )
        expect(queryByText('ปฏิเสธคำขอธุรกรรม')).toBeDefined()
        expect(queryByText('ถูกปฏิเสธ')).toBeDefined()
      })
    })

    describe('should calls', () => {
      it('handleCancel when clicked cancel button', () => {
        const { queryByText } = render(
          <ConfirmModalBody
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            modalType="reject"
          />,
        )

        const el = queryByText('ยกเลิก') as HTMLButtonElement
        expect(el).toBeDefined()

        el.click()
        expect(handleCancel).toBeCalledTimes(1)
      })
    })

    it('handleConfirm when clicked confirm button', () => {
      const { queryByText } = render(
        <ConfirmModalBody
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          modalType="reject"
        />,
      )

      const el = queryByText('ยืนยัน') as HTMLButtonElement
      expect(el).toBeDefined()

      el.click()
      expect(handleConfirm).toBeCalledTimes(1)
    })
  })
})
