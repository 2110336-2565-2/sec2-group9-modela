import Layout from 'common/components/Layout'
import React, { createContext, useContext, useState } from 'react'

import { ILayoutContext, NavbarFocus } from './types'

const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext)

export const useLayout = () => useContext(LayoutContext)

export const LayoutProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [navbarFocus, setNavbarFocus] = useState<NavbarFocus>(null)
  const [isHideNavbar, setHideNavbar] = useState<boolean>(false)
  const [onSearch, setOnSearch] = useState<(() => void) | null>(null)
  const [override, setOverride] = useState<{
    title: string
    onBack: () => void
  } | null>(null)

  return (
    <LayoutContext.Provider
      value={{
        navbarFocus,
        setNavbarFocus,
        isHideNavbar,
        setHideNavbar,
        onSearch,
        setOnSearch,
        override,
        setOverride,
      }}
    >
      <Layout>{children}</Layout>
    </LayoutContext.Provider>
  )
}
