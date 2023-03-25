import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import AcceptOfferModal from '../components/AcceptOfferModal'
import FilterContainer from '../components/FilterContainer'
import NotiCardContainer from '../components/NoticardContainer'
import RejectOfferModal from '../components/RejectOfferModal'
import useModalData from './hooks/useModalData'
import useNotiListData from './hooks/useNotiListData'
import { FilterBoxContainer, NotiContainer, PlaceFill } from './styled'

const NotificationPage = () => {
  const { user } = useUser()
  const { noti, state, setState, filterData, fetchData, hasMore } =
    useNotiListData()
  const {
    isAcceptModalOpen,
    isRejectModalOpen,
    handleAcceptCloseModal,
    handleRejectCloseModal,
    handleAcceptModalSubmit,
    handleRejectModalSubmit,
  } = useModalData()
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
      {/*<StatusChangeModal
        isOpen={isModalOpen}
        status={status!}
        handleClose={handleCloseModal}
        handleSubmit={handleStatusChange}
        />*/}
      <AcceptOfferModal
        isOpen={isAcceptModalOpen}
        handleClose={handleAcceptCloseModal}
        handleSubmit={handleAcceptModalSubmit}
        title={''}
      />
      <RejectOfferModal
        isOpen={isRejectModalOpen}
        handleClose={handleRejectCloseModal}
        handleSubmit={handleRejectModalSubmit}
        title={''}
      />
    </div>
  )
}

export default withGuard(NotificationPage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
