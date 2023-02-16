import { CircularProgress } from '@mui/material'
import { PageContainer } from 'common/components/Layout/styled'
import React, { createContext } from 'react'

import useUserData from './hooks/useUserData'
import { IUserContext } from './types'

const UserContext = createContext<IUserContext>({} as IUserContext)

export const useUser = () => React.useContext(UserContext)

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { user, isLoading, refetch, reset } = useUserData()

  if (isLoading)
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    )

  return (
    <UserContext.Provider value={{ user, refetch, reset }}>
      {children}
    </UserContext.Provider>
  )
}
