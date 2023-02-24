import { Button, Card, styled, Theme } from '@mui/material'

export const MenuContainer = styled(Card)`
  border-radius: 12px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${(props) => props.theme.breakpoints.down('lg')} {
    gap: 24px;
    padding: 6px 24px;
    flex-direction: row;
    border-radius: 0px;
    width: 100%;
    border-right: none;
    border-left: none;
    overflow-x: auto;
    max-width: 100%;
  }
`

export const MenuItem = styled(Button)(
  ({ isFocused, theme }: { isFocused?: boolean; theme?: Theme }) => `
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  justify-content: flex-start;
  gap: 8px;

  ${theme!.breakpoints.down('lg')} {
    padding: 0px 7px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  ${
    isFocused &&
    `
    background-color: #C3DCF14D;
    pointer-events: none;
    `
  }
  &:hover {
    ${isFocused && 'background-color: #C3DCF14D;'}
  }
`,
)
