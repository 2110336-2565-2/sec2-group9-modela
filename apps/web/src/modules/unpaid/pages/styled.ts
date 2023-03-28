import { styled } from '@mui/material'

export const SearchContainer = styled('div')`
  padding-top: 3.5rem;
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
  padding-top: 2rem;
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
