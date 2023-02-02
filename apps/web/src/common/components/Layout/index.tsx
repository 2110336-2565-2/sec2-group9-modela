import React from 'react'

import Header from '../Header'
import { PageContainer } from './styled'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <PageContainer>
      <Header />
      <div style={{ flex: 1 }}>{children}</div>
    </PageContainer>
  )
}

export default Layout
