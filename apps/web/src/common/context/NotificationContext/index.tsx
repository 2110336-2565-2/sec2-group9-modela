import { Alert, Snackbar } from '@mui/material'
import React, { createContext, useCallback, useContext, useState } from 'react'

import { INotificationContext, NotificationType } from './types'

const NotiContext = createContext<INotificationContext>(
  {} as INotificationContext,
)

export const useNotification = () => useContext(NotiContext)

export const NotificationProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [notiMessage, setNotiMessage] = useState('')
  const [showNoti, setShowNoti] = useState(false)
  const [duration, setDuration] = useState(3000)
  const [type, setType] = useState<NotificationType>('success')

  const handleClose = useCallback(() => setShowNoti(false), [])

  const displayNotification = useCallback(
    (message: string, type: NotificationType, duration?: number) => {
      setNotiMessage(message)
      setType(type)
      if (duration) setDuration(duration)
      setShowNoti(true)
    },
    [],
  )

  return (
    <NotiContext.Provider value={{ displayNotification }}>
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
