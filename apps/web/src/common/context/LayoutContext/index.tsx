import Layout from 'common/components/Layout'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { HeaderFocus, ILayoutContext } from './types'

const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext)

export const useLayout = () => useContext(LayoutContext)

export const LayoutProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [headerFocus, setHeaderFocus] = useState<HeaderFocus>(null)
  const [isHideHeader, setHideHeader] = useState<boolean>(false)

  const value = useMemo(
    () => ({
      headerFocus,
      setHeaderFocus,
      isHideHeader,
      setHideHeader,
    }),
    [headerFocus, setHeaderFocus, isHideHeader, setHideHeader],
  )

  return (
    <LayoutContext.Provider value={value}>
      <Layout>{children}</Layout>
    </LayoutContext.Provider>
  )
}
