import React, { createContext } from 'react'

import useUserData from './hooks/useUserData'
import { UserData } from './types'

const UserContext = createContext<UserData | null>({} as UserData | null)

export const useUser = () => React.useContext(UserContext)

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const user = useUserData()

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
