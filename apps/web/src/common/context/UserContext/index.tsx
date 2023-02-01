import { GetUserDto } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { PageContainer } from 'common/components/Layout/styled'
import React, { createContext } from 'react'

import useUserData from './hooks/useUserData'

const UserContext = createContext<GetUserDto | null>({} as GetUserDto | null)

export const useUser = () => React.useContext(UserContext)

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { user, isLoading } = useUserData()

  if (isLoading)
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    )

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
