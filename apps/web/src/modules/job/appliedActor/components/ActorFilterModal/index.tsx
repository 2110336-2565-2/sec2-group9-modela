import useBackNavbar from 'common/hooks/useBackNavbar'
import React, { useMemo } from 'react'

import ActorFilter from '../ActorFilter'
import { ModalContainer } from './styled'
import { ActorFilterModalProps } from './types'

const ActorFilterModal = ({ onClose, control }: ActorFilterModalProps) => {
  const override = useMemo(
    () => ({
      title: 'ค้นหานักแสดง',
      onBack: onClose,
    }),
    [onClose],
  )
  useBackNavbar(override)

  return (
    <ModalContainer>
      <ActorFilter control={control} />
    </ModalContainer>
  )
}

export default ActorFilterModal
