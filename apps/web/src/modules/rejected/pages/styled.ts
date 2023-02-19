import { Card, styled } from '@mui/material'

export const FormContainer = styled(Card)`
  ${(props) => props.theme.breakpoints.down('md')} {
    padding: 10px;
  }
  padding: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
`

export const RootContainer = styled('div')`
  display: flex;
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const FormHeader = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(2)};
`
