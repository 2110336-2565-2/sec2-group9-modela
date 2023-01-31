import React from 'react'

import { PageContainer } from './styled'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  // TODO implement header (and footer if there is one)
  return (
    <PageContainer>
      Header
      <div style={{ flex: 1 }}>{children}</div>
      Footer
    </PageContainer>
  )
}

export default Layout
