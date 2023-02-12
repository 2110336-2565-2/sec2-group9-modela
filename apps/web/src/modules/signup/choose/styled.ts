import { Card, styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: right;
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(3)};
  gap: ${({ theme }) => theme.spacing(3)};
`

export const CardButtonContainer = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacing(5)};
`

export const CardButtonSection = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`
