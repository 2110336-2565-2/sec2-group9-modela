import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import FilterContainer from '../components/FilterContainer'
import NotiCardContainer from '../components/NoticardContainer'
import useNotiListData from './hooks/useNotiListData'
import { FilterBoxContainer, NotiContainer, PlaceFill } from './styled'

const NotificationPage = () => {
  const { user } = useUser()
  const { noti, state, setState, filterData, fetchData, hasMore } =
    useNotiListData()
  useNavbarSearch(
    useCallback(() => {
      console.log('TEST')
    }, []),
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'flex-start',
        gap: '3.5vw',
      }}
    >
      <PlaceFill />
      <NotiContainer>
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={hasMore}
          loader={
            <div
              className="loader"
              key={0}
              style={{
                display: 'flex',
                alignItems: 'column',
                justifyContent: 'center',
              }}
            >
              <CircularProgress color="primary" />
            </div>
          }
        >
          {noti && <NotiCardContainer userType={user?.type} {...noti} />}
        </InfiniteScroll>
      </NotiContainer>
      <FilterBoxContainer>
        <FilterContainer
          userType={user?.type}
          state={state}
          setState={setState}
          filterData={filterData}
        />
      </FilterBoxContainer>
    </div>
  )
}

export default withGuard(NotificationPage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
