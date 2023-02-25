import { styled } from '@mui/material'

export const NavbarContainer = styled('div')`
  padding: 5px 24px;
  position: sticky;
  z-index: 99;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.main};

  display: flex;
  align-items: center;
  gap: 24px;
  color: white;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  height: 40px;
`

export const LoginButton = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
`
