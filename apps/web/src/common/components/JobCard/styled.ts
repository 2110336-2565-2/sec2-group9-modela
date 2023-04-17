import { styled, Typography } from '@mui/material'

export const CardContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
`

export const Description = styled(Typography)`
  color: rgba(0, 0, 0, 0.6);
  padding-bottom: 12px;
  word-break: break-word;
`
