import { Card, styled } from '@mui/material'

export const FormContainer = styled(Card)`
  padding: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
`

export const RootContainer = styled('form')`
  display: flex;
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`
