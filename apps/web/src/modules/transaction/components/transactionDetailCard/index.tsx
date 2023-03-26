import { Divider, Modal, Typography } from '@mui/material'
import theme from 'common/config/theme'
import useSwitch from 'common/hooks/useSwitch'
import ActorCardHeader from 'modules/job/appliedActor/components/ActorCardHeader'
import React, { useCallback } from 'react'

import ConfirmationModal from '../ConfirmationModal'
import { CardContainer } from './styled'
import { transactionDetailCardProps } from './types'

const TransactionDetailCard = (props: transactionDetailCardProps) => {
  const {
    actorId,
    firstName,
    lastName,
    bankAccount,
    bankName,
    middleName,
    profileImageUrl,
  } = props.data
  const { open, close, isOpen } = useSwitch()

  const confirm = useCallback(() => {
    close()
    props.markAccepted(actorId)
  }, [actorId, close, props])

  return (
    <CardContainer>
      <ActorCardHeader
        actorId={actorId}
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        profileImageUrl={profileImageUrl}
      />
      <div style={{ height: '1rem' }} />

      <Typography sx={{ color: 'rgba(0,0,0,0.6)' }}>
        ธนาคาร: {bankName}
      </Typography>
      <Typography sx={{ color: 'rgba(0,0,0,0.6)' }}>
        เลขบัญชี: {bankAccount}
      </Typography>
      <Divider sx={{ width: '100%', margin: '1rem 0' }} />

      <Typography
        sx={{
          color: theme.palette.success.main,
          cursor: 'pointer',
          alignSelf: 'center',
        }}
        onClick={open}
      >
        เสร็จสิ้น
      </Typography>

      <Modal open={isOpen} onClose={close}>
        <ConfirmationModal close={close} confirm={confirm} />
      </Modal>
    </CardContainer>
  )
}

export default TransactionDetailCard
