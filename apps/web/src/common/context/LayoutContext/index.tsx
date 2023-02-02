import Layout from 'common/components/Layout'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { ILayoutContext, NavbarFocus } from './types'

const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext)

export const useLayout = () => useContext(LayoutContext)

export const LayoutProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [navbarFocus, setNavbarFocus] = useState<NavbarFocus>(null)
  const [isHideNavbar, setHideNavbar] = useState<boolean>(false)

  const value = useMemo(
    () => ({
      navbarFocus,
      setNavbarFocus,
      isHideNavbar,
      setHideNavbar,
    }),
    [navbarFocus, setNavbarFocus, isHideNavbar, setHideNavbar],
  )

  return (
    <LayoutContext.Provider value={value}>
      <Layout>{children}</Layout>
    </LayoutContext.Provider>
  )
}
