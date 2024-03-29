import { styled, Typography } from '@mui/material'

export const NavbarContainer = styled('div')`
  padding: 5px 66px;
  position: sticky;
  z-index: 99;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.main};

  display: flex;
  align-items: center;
  gap: min(50px, 3%);
  box-shadow: ${({ theme }) => theme.shadows[3]};

  height: 60px;
`

export const NavbarItem = styled(Typography, {
  shouldForwardProp: (props) => props !== 'focus',
})<{ focus?: boolean }>`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: ${(props) => (props.focus ? 500 : 300)};
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    cursor: pointer;
  }
`
