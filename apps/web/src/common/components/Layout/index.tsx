import { useLayout } from 'common/context/LayoutContext'
import React from 'react'

import Navbar from '../Navbar'
import { PageContainer } from './styled'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { isHideNavbar } = useLayout()
  return (
    <PageContainer>
      {!isHideNavbar && <Navbar />}
      <div style={{ flex: 1, alignItems: 'stretch', display: 'inline-flex' }}>
        {children}
      </div>
    </PageContainer>
  )
}

export default Layout
