import { Input, Output } from '@mui/icons-material'
import Image from 'next/image'
import RefundIcon from 'public/refund.svg'

export const MENU_ITEM = [
  {
    label: 'ผู้กำกับโอนเงินเข้า',
    icon: <Input />,
    href: '/transaction/casting',
  },
  {
    label: 'โอนเงินให้นักแสดง',
    icon: <Output />,
    href: '/transaction',
  },
  {
    label: 'ขอเงินคืน',
    icon: <Image src={RefundIcon} alt="refund" />,
    href: '/transaction/refund',
  },
]
