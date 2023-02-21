import { Button, Card, styled } from '@mui/material'

export const MenuContainer = styled(Card)`
  border-radius: 12px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const MenuItem = styled(Button)(
  ({ isFocused }: { isFocused?: boolean }) => `
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
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
