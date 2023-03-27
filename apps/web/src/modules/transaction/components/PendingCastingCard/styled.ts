import { styled } from '@mui/material'

export const CardContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  height: fit-content;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 12px 16px;
  ${(props) => props.theme.breakpoints.down('lg')} {
    max-width: 800px;
  }
`

export const ContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 8px;
`

export const ActionContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
