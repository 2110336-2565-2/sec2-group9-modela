import MenuBar from 'common/components/MenuBar'
import useNavbarFocus from 'common/hooks/useNavbarFocus'

import { MENU_ITEM } from './constants'
import { JobCardContainer, PageContainer, SideDiv } from './styled'
import { TransactionLayoutProps } from './types'

const TransactionLayout = (props: TransactionLayoutProps) => {
  useNavbarFocus('transaction')

  const { focus, children } = props
  return (
    <PageContainer>
      <MenuBar menu={MENU_ITEM} sx={{ width: '17vw' }} focus={focus} />
      <JobCardContainer>{children}</JobCardContainer>
      <SideDiv />
    </PageContainer>
  )
}

export default TransactionLayout
