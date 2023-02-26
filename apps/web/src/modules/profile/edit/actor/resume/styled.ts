import { Button, Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    margin-top: 40px;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 10px;
  }
  padding: 20px;
  width: 100%;
  height: fit-content;
  max-width: 650px;
  border-radius: 10px;
`

export const RootContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
  gap: 40px;
`

export const AddResumeButton = styled(Button)`
  align-self: start;
`
