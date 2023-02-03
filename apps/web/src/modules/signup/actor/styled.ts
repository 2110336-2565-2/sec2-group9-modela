import { Box, Card, styled } from '@mui/material'

export const FormContainer = styled(Card)`
  padding: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
`

export const RootContainer = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`