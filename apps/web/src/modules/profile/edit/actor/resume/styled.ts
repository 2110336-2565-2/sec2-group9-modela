import { Button, Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  ${(props) => props.theme.breakpoints.down('md')} {
    padding: 10px;
  }
  margin: 20px;
  margin-top: 40px;
  padding: 20px;
  width: 100%;
  height: fit-content;
  max-width: 600px;
  border-radius: 10px;
`

export const AddResumeButton = styled(Button)`
  align-self: start;
`
