import { styled } from '@mui/material'

export const CardContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10vh;
  width: 100%;
  height: fit-content;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 12px;
`

export const CorporateRow = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`

export const DescriptionRow = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
