import React from 'react'

import NotiCard from './components/NotiCard'
import { CardBoxContainer } from './styled'
import { CardArray } from './type'

export default function NotiCardContainer(prop: CardArray) {
  const { cardData } = prop

  return (
    <CardBoxContainer>
      {cardData.map((item, index) => {
        return (
          <div
            key={`Noti-${index}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '20vw',
              gap: '1rem',
            }}
          >
            <NotiCard
              title={item.title}
              companyName={item.companyName}
              offer={item.offer}
              castingImage={item.castingImage}
            />
          </div>
        )
      })}
    </CardBoxContainer>
  )
}
