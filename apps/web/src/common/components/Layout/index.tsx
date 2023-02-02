import { useLayout } from 'common/context/LayoutContext'
import React from 'react'

import Header from '../Header'
import { PageContainer } from './styled'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { isHideHeader, headerFocus } = useLayout()
  return (
    <PageContainer>
      {!isHideHeader && <Header focus={headerFocus} />}
      <div style={{ flex: 1 }}>{children}</div>
    </PageContainer>
  )
}

export default Layout
