import { styled } from '@mui/material'

export const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  align-items: flex-start;
  padding: 12px;
`

export const IconContainer = styled('div')`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`
