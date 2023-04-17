import { styled } from '@mui/material'

export const TitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ActionContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`

export const DetailsContainer = styled('div')`
  margin: 0 16px;
`

export const SendProofContainer = styled('form')`
  background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 550px;
  margin: 24px;
  height: fit-content;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`
