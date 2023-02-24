import { styled } from '@mui/material'

export const MenuContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: -10px;
`

export const SummaryContainer = styled('div')`
  ${(props) => props.theme.breakpoints.down('lg')} {
    margin: 10px 30px 0 30px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    margin: 8px 15px;
  }
`
