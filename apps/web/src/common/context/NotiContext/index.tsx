import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { createContext } from 'react'

import { INotiContext, NotiType } from './types'

const NotiContext = createContext<INotiContext>({} as INotiContext)

export const useNoti = () => React.useContext(NotiContext)

export const NotiProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [notiMessage, setNotiMessage] = React.useState('')
  const [showNoti, setShowNoti] = React.useState(false)
  const [duration, setDuration] = React.useState(3000)
  const [type, setType] = React.useState<NotiType>('success')

  const handleClose = () => setShowNoti(false)

  const displayNoti = (message: string, type: NotiType, duration?: number) => {
    setNotiMessage(message)
    setType(type)
    duration && setDuration(duration)
    setShowNoti(true)
  }

  return (
    <NotiContext.Provider value={{ handleClose, displayNoti }}>
      {children}
      {showNoti && (
        <Snackbar
          open={showNoti}
          autoHideDuration={duration}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {notiMessage}
          </Alert>
        </Snackbar>
      )}
    </NotiContext.Provider>
  )
}
