import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'

import { PendingCastingCardProps } from './types'

describe('<PendingCastingCard />', () => {
  const handleClickFinish = jest.fn()
  const handleClickReject = jest.fn()

  const MOCK_CARD_PROPS: PendingCastingCardProps = {
    title: 'title',
    amount: 1000,
    bankAccount: 'bankAccount',
    bankName: 'bankName',
    castingId: 1,
    companyName: 'companyName',
    firstName: 'firstName',
    jobId: 1,
    lastName: 'lastName',
    middleName: 'middleName',
    proofUrl: 'proofUrl',
    handleClickFinish,
    handleClickReject,
  }

  const LinkSpy = mockAndSpy('next/link')

  const { default: PendingCastingCard } = require('.') as typeof import('.')

  it('should render correctly', () => {
    const { queryByText } = render(<PendingCastingCard {...MOCK_CARD_PROPS} />)

    expect(queryByText('title')).toBeDefined()
    expect(queryByText('firstName')).toBeDefined()
    expect(queryByText('middleName')).toBeDefined()
    expect(queryByText('lastName')).toBeDefined()
    expect(queryByText('companyName')).toBeDefined()
    expect(queryByText('จำนวนเงินที่ต้องจ่าย: 1000')).toBeDefined()
    expect(queryByText('เลขบัญชี: bankAccount')).toBeDefined()
    expect(queryByText('ธนาคาร: bankName')).toBeDefined()
    expect(LinkSpy).toBeCalled()
    expect(LinkSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/job/1',
      }),
    )
    expect(LinkSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        href: 'proofUrl',
      }),
    )
  })

  describe('button should function correctly', () => {
    it('should call handleClickFinish when finish button is clicked', () => {
      const { getByText } = render(<PendingCastingCard {...MOCK_CARD_PROPS} />)

      getByText('เสร็จสิ้น').click()

      expect(handleClickFinish).toBeCalledWith(1, 1)
    })

    it('should call handleClickReject when reject button is clicked', () => {
      const { getByText } = render(<PendingCastingCard {...MOCK_CARD_PROPS} />)

      getByText('ไม่อนุมัติ').click()

      expect(handleClickReject).toBeCalledWith(1, 1)
    })
  })
})
