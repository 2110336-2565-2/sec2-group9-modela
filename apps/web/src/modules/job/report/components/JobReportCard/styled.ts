import { Button, styled } from '@mui/material'

export const CardContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
  gap: 16px;
  width: 100%;
  height: fit-content;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 16px;
`

export const ButtonContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`

export const StyledButton = styled(Button)`
  color: white;
  border-radius: 10px;
`
