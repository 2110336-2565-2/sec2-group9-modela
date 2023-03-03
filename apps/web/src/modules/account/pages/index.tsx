import { PendingUserDto } from '@modela/dtos'
import React from 'react'

import PendingUserCard from '../component/PendingUserCard/Body'

const PendingUserPage = () => {
  const props: PendingUserDto = {
    type: 'CASTING',
    data: {
      userId: 100,
      firstName: 'Pakapol',
      lastName: 'Saleephol',
      companyName: 'P entertainment',
      companyId: '5556-111455',
      employmentCertUrl: 'https://google.com',
      idCardImageUrl: 'https://youtube.com',
      ssn: '1712201036678',
    },
  }
  return <PendingUserCard {...props} />
}

export default PendingUserPage
