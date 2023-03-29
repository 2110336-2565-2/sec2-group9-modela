import { styled } from '@mui/material'

export const JobContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 3rem;
  width: 45vw;
  gap: 1.75rem;
  padding-bottom: 3rem;
  ${(props) => props.theme.breakpoints.down('lg')} {
    width: 60vw;
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 95vw;
  }
`
