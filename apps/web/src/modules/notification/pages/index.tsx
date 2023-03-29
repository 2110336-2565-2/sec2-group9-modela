import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import AcceptOfferModal from '../components/AcceptOfferModal'
import FilterContainer from '../components/FilterContainer'
import FilterMobileContainer from '../components/FilterMobileContainer'
import NotiCardContainer from '../components/NoticardContainer'
import RejectOfferModal from '../components/RejectOfferModal'
import useModalData from './hooks/useModalData'
import useNotiListData from './hooks/useNotiListData'
import { FilterBoxContainer, NotiContainer, PlaceFill } from './styled'

const NotificationPage = () => {
  const { user } = useUser()
  const {
    noti,
    state,
    setState,
    filterData,
    fetchData,
    hasMore,
    open,
    close,
    isOpen,
    isDesktop,
  } = useNotiListData()
  const {
    isAcceptModalOpen,
    isRejectModalOpen,
    handleAcceptCloseModal,
    handleRejectCloseModal,
    handleAcceptModalSubmit,
    handleRejectModalSubmit,
    handleAcceptModalOpen,
    handleRejectModalOpen,
    setFocusId,
    title,
    setTitle,
  } = useModalData()
  useNavbarSearch(
    useCallback(() => {
      open()
    }, [open]),
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
      <NotiContainer
        sx={{
          display: isOpen && !isDesktop ? 'none' : 'flex',
        }}
      >
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
          {noti && (
            <NotiCardContainer
              userType={user?.type}
              openAcceptModal={handleAcceptModalOpen}
              openRejectModal={handleRejectModalOpen}
              setFocusId={setFocusId}
              setTitle={setTitle}
              {...noti}
            />
          )}
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
      <AcceptOfferModal
        isOpen={isAcceptModalOpen}
        handleClose={handleAcceptCloseModal}
        handleSubmit={handleAcceptModalSubmit}
        title={title}
      />
      <RejectOfferModal
        isOpen={isRejectModalOpen}
        handleClose={handleRejectCloseModal}
        handleSubmit={handleRejectModalSubmit}
        title={title}
      />
      {isOpen && (
        <FilterMobileContainer
          state={state}
          setState={setState}
          isFilterShow={isOpen}
          closeFilterPage={close}
          filterData={filterData}
          userType={user?.type}
        />
      )}
    </div>
  )
}

export default withGuard(NotificationPage, 'verified', [
  UserType.ACTOR,
  UserType.CASTING,
])
