import { styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  width: 50vw;
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 90vw;
  }
`
