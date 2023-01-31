import { styled } from '@mui/material'

export const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 66px;
  position: absolute;
  width: 100%;
  height: 6vh;
  left: 0px;
  top: 0px;
  background: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 3px 3px rgba(0, 0, 0, 0.12),
    0px 1px 8px rgba(0, 0, 0, 0.2);
`

export const LeftGroup = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
`

export const RightGroup = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 0;
  align-items: center;
  gap: 50px;
`
