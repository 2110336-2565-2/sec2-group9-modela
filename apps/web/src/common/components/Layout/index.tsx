import { useLayout } from 'common/context/LayoutContext'
import React from 'react'

import Navbar from '../Navbar'
import { PageContainer } from './styled'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { isHideNavbar, navbarFocus } = useLayout()
  return (
    <PageContainer>
      {!isHideNavbar && <Navbar focus={navbarFocus} />}
      <div style={{ flex: 1 }}>{children}</div>
    </PageContainer>
  )
}

export default Layout
