import { styled } from '@mui/material'

export const NavbarContainer = styled('div')`
  padding: 5px 24px;
  position: sticky;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.main};

  display: flex;
  align-items: center;
  gap: 24px;
  color: white;
`
