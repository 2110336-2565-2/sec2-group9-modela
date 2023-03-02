import { Button } from '@mui/material'
import useBackNavbar from 'common/hooks/useBackNavbar'
import { useMemo } from 'react'

import FilterContainer from '../FilterContainer'
import { FilterPage, FilterPageFilterBox } from './styled'
import { FilterContainerProps } from './types'

const FilterMobileContainer = (props: FilterContainerProps) => {
  const {
    state,
    setState,
    isFilterShow,
    closeFilterPage,
    filterData,
    isAdmin,
  } = props
  useBackNavbar(
    useMemo(
      () => ({
        title: 'ค้นหางาน',
        onBack: () => {
          closeFilterPage()
        },
      }),
      [closeFilterPage],
    ),
  )
  return (
    <FilterPage
      sx={{ display: isFilterShow ? 'flex' : 'none', background: '#f5f5f5;' }}
    >
      <FilterPageFilterBox>
        <FilterContainer
          state={state}
          setState={setState}
          isTitle={true}
          filterData={filterData}
          isAdmin={isAdmin}
        />
        <Button
          onClick={() => {
            filterData(state)
            closeFilterPage()
          }}
          variant="contained"
          sx={{
            borderRadius: '12px',
            width: '100%',
            maxWidth: '300px',
            height: '5vh',
          }}
        >
          ค้นหางาน
        </Button>
      </FilterPageFilterBox>
    </FilterPage>
  )
}
export default FilterMobileContainer
