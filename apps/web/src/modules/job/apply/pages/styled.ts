import { Button, styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  width: 50vw;
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 90vw;
  }
`

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
  ${(props) => props.theme.breakpoints.down('md')} {
    padding: 8px;
  }
`

export const ButtonContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`

export const StyledButton = styled(Button)`
  color: white;
  border-radius: 10px;
`

export const AcceptButton = styled(StyledButton)`
  background-color: rgba(102, 163, 115, 1);
  &:hover {
    background-color: rgba(102, 163, 115, 0.7);
  }
`

export const RejectButton = styled(StyledButton)`
  background-color: rgba(170, 91, 91, 1);
  &:hover {
    background-color: rgba(170, 91, 91, 0.7);
  }
`
