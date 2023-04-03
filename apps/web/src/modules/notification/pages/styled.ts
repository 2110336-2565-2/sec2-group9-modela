import { styled } from '@mui/material'

export const NotiContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 3rem;
  width: 45vw;
  gap: 1rem;
  padding-bottom: 3rem;
  ${(props) => props.theme.breakpoints.down('lg')} {
    width: 60vw;
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 95vw;
  }
`
export const PlaceFill = styled('div')`
  display: flex;
  width: 15vw;
  ${(props) => props.theme.breakpoints.down('lg')} {
    display: none;
  }
`
export const FilterBoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding-top: 3rem;
  width: 14vw;
  gap: 1rem;
  position: sticky;
  top: 48px;
  ${(props) => props.theme.breakpoints.down('lg')} {
    width: 19vw;
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`
