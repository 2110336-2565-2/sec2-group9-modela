import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import useNavbarSearch from 'common/hooks/useNavbarSearch'
import FilterMobileContainer from 'modules/job/appliedJob/components/FilterMobileContainer'
import SearchBox from 'modules/job/appliedJob/components/SearchBox'
import AcceptOfferModal from 'modules/notification/components/AcceptOfferModal'
import RejectOfferModal from 'modules/notification/components/RejectOfferModal'
import useModalData from 'modules/notification/pages/hooks/useModalData'
import { useCallback } from 'react'

import FilterContainer from '../components/FilterContainer'
import JobCardContainer from '../components/JobCardContainer'
import useJobListData from './hooks/useJobListData'
import {
  FilterBoxContainer,
  JobContainer,
  PlaceFill,
  SearchContainer,
} from './styled'

const AppliedJobPage = () => {
  const {
    job,
    filterData,
    state,
    setState,
    isOpen,
    open,
    close,
    isLoading,
    isDesktop,
  } = useJobListData()

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

  useNavbarFocus('jobs')
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '3.5vw',
        height: '100%',
      }}
    >
      <PlaceFill />
      <JobContainer
        sx={{
          display: isOpen && !isDesktop ? 'none' : 'flex',
        }}
      >
        <SearchContainer>
          <SearchBox
            state={state}
            filterData={filterData}
            setState={setState}
            labels={'ค้นหางานทั้งหมด'}
          />
        </SearchContainer>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {isLoading && (
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
          )}
          {!isLoading && (
            <JobCardContainer
              openAcceptModal={handleAcceptModalOpen}
              openRejectModal={handleRejectModalOpen}
              setFocusId={setFocusId}
              setTitle={setTitle}
              {...job}
            />
          )}
        </div>
      </JobContainer>
      <FilterBoxContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <FilterContainer
            state={state}
            setState={setState}
            isTitle={false}
            filterData={filterData}
          />
        </div>
      </FilterBoxContainer>

      {isOpen && (
        <FilterMobileContainer
          state={state}
          setState={setState}
          isFilterShow={isOpen}
          closeFilterPage={close}
          filterData={filterData}
        />
      )}

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
    </div>
  )
}

export default withGuard(AppliedJobPage, 'verified', [UserType.ACTOR])
