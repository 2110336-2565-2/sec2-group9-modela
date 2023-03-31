import { styled } from '@mui/material'

export const JobContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  flex-direction: column;
  justify-content: right;
  padding-top: 3rem;
  width: 14vw;
  ${(props) => props.theme.breakpoints.down('lg')} {
    display: none;
  }
`
