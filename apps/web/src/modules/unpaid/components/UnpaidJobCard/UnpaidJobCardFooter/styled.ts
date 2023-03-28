import { styled } from '@mui/material'

export const FooterRow = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 15px;
  padding-top: 12px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    gap: 9px;
    flex-wrap: wrap;
  }
`
export const SameDiv = styled('div')`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 5px;
  padding: 0px;
  margin-right: 5px;
`
