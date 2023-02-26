import React from 'react'

import Footer from './components/NotiCardFooter'
import Header from './components/NotiCardHeader'
import OfferDetail from './components/OfferDetail'
import { CardContainer } from './styled'
import { CardProps } from './types'

export default function NotiCard(prop: CardProps) {
  const { title, companyName, offer, castingImage } = prop

  return (
    <CardContainer>
      <Header
        title={title}
        companyName={companyName}
        castingImage={castingImage}
      />
      <OfferDetail offer={offer} />
      <Footer />
    </CardContainer>
  )
}
