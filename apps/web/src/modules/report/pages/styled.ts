import { styled } from '@mui/material'

export const RootContainer = styled('form')`
  display: flex;
  flex-direction: column;
  width: 40vw;
  border-radius: 10px;
  padding: 12px;
  gap: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin-top: 5vh;
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 95vw;
  }
  margin-bottom: 10vh;
`
