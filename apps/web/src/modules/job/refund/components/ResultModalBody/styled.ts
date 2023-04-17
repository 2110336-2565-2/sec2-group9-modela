import { styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const ContentContainer = styled('div')`
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
`
