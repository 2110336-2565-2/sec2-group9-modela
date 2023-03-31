import { styled } from '@mui/material'

export const CardContainer = styled('div')`
  display: flex;
  gap: 16px;
  padding-left: 3vw;
  flex-direction: column;

  ${(props) => props.theme.breakpoints.down('lg')} {
    margin: 16px 0;
    padding-left: 0;
  }
`
