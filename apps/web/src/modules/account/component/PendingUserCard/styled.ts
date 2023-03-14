import { Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 100%;
  }
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 14px 8px 14px;
  height: fit-content;
  width: 40vw;
`
export const ResumeDownloadButton = styled('a')`
  display: flex;
  width: fit-content;
  gap: 8px;
  align-items: center;
  text-decoration: none;
`
