import { Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 14px 8px 14px;
`
export const ResumeDownloadButton = styled('a')`
  display: flex;
  width: fit-content;
  gap: 8px;
  align-items: center;
  text-decoration: none;
`

export const BodyContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`
