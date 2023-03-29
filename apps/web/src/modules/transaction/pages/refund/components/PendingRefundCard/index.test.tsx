import { render } from '@testing-library/react'
import { mockAndSpy } from 'common/utils/testing'

import { PendingRefundCardProps } from './types'

describe('<PendingCastingCard />', () => {
  const handleClickFinish = jest.fn()
  const handleClickReject = jest.fn()

  const MOCK_CARD_PROPS: PendingRefundCardProps = {
    title: 'title',
    wage: 1000,
    jobId: 10,
    proofUrl: 'proofUrl',
    casting: {
      castingId: 1,
      firstName: 'firstName',
      middleName: 'middleName',
      lastName: 'lastName',
      companyName: 'companyName',
      bankAccount: 'bankAccount',
      bankName: 'bankName',
      profileImageUrl: 'profileImageUrl',
    },
    actor: {
      actorId: 2,
      firstName: 'actorFirstName',
      middleName: 'actorMiddleName',
      lastName: 'actorLastName',
    },

    reason: 'reason',
    handleClickFinish,
    handleClickReject,
  }

  const LinkSpy = mockAndSpy('next/link')

  const { default: PendingCastingCard } = require('.') as typeof import('.')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const { queryByText } = render(<PendingCastingCard {...MOCK_CARD_PROPS} />)

    expect(queryByText('title')).toBeDefined()
    expect(queryByText('firstName')).toBeDefined()
    expect(queryByText('middleName')).toBeDefined()
    expect(queryByText('lastName')).toBeDefined()
    expect(queryByText('actorFirstName')).toBeDefined()
    expect(queryByText('actorMiddleName')).toBeDefined()
    expect(queryByText('actorLastName')).toBeDefined()
    expect(queryByText('companyName')).toBeDefined()
    expect(queryByText('เหตุผลที่ขอเงินคืน: reason')).toBeDefined()
    expect(queryByText('จำนวนเงินที่ต้องจ่าย: 1000')).toBeDefined()
    expect(queryByText('เลขบัญชี: bankAccount')).toBeDefined()
    expect(queryByText('ธนาคาร: bankName')).toBeDefined()
    expect(queryByText('รูปถ่ายหลักฐานการขอเงินคืน')).toBeDefined()
    expect(LinkSpy).toBeCalled()
    expect(LinkSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/job/10',
      }),
    )
    expect(LinkSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/profile/1',
      }),
    )
    expect(LinkSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        href: 'proofUrl',
      }),
    )
    expect(LinkSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/profile/2',
      }),
    )
  })

  describe('button should function correctly', () => {
    it('should call handleClickFinish when finish button is clicked', () => {
      const { getByText } = render(<PendingCastingCard {...MOCK_CARD_PROPS} />)

      getByText('อนุมัติ').click()

      expect(handleClickFinish).toBeCalledWith(10, 2)
    })

    it('should call handleClickReject when reject button is clicked', () => {
      const { getByText } = render(<PendingCastingCard {...MOCK_CARD_PROPS} />)

      getByText('ไม่อนุมัติ').click()

      expect(handleClickReject).toBeCalledWith(10, 2)
    })
  })
})
