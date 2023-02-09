import React from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
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
