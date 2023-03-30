import { styled } from '@mui/material'

export const SearchContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`

export const JobContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export const FilterBoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding-top: 3rem;
  width: 14vw;
  gap: 1rem;
  ${(props) => props.theme.breakpoints.down('lg')} {
    width: 19vw;
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`

export const PlaceFill = styled('div')`
  display: flex;
  width: 20vw;
  ${(props) => props.theme.breakpoints.down('lg')} {
    display: none;
  }
`
