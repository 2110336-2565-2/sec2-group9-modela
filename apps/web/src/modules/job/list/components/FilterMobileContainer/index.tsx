import { Button } from '@mui/material'
import useBackNavbar from 'common/hooks/useBackNavbar'
import { useMemo } from 'react'

import FilterContainer from '../FilterContainer'
import { FIlterPage, FilterPageFilterBox } from './styled'
import { FilterContainerProps } from './types'

export default function FilterMobileContainer(props: FilterContainerProps) {
  const { state, setState, isFilterShow, closeFilterPage, filterData } = props
  useBackNavbar(
    useMemo(
      () => ({
        title: 'ค้นหางาน',
        onBack: () => {
          closeFilterPage()
        },
      }),
      [],
    ),
  )
  return (
    <FIlterPage sx={{ display: isFilterShow ? 'flex' : 'none' }}>
      <FilterPageFilterBox>
        <FilterContainer state={state} setState={setState} isTitle={true} />
        <Button
          onClick={() => {
            filterData(state)
            closeFilterPage()
          }}
          variant="contained"
          sx={{ borderRadius: '12px', width: '25vw', height: '5vh' }}
        >
          ค้นหางาน
        </Button>
      </FilterPageFilterBox>
    </FIlterPage>
  )
}
