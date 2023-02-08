import { styled } from '@mui/material'

export const NotiContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 3rem;
  width: 20vw;
  gap: 1rem;
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`

export const JobContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 3rem;
  width: 40vw;
  gap: 1rem;
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 90vw;
  }
`

export const FilterBoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding-top: 3rem;
  width: 14vw;
  gap: 1rem;
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`
