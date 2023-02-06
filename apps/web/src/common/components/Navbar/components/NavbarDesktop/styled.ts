import { styled, Typography } from '@mui/material'

export const NavbarContainer = styled('div')`
  padding: 5px 66px;
  position: sticky;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.main};

  display: flex;
  align-items: center;
  gap: min(50px, 3%);
`

export const NavbarItem = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'focus',
})<{ focus?: boolean }>`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: ${(props) => (props.focus ? 500 : 300)};

  &:hover {
    cursor: pointer;
  }
`
