import { styled } from '@mui/material'

export const HeaderRow = styled('div')`
  display: flex;
  width: 100%;
  gap: 12px;
  height: fit-content;
  margin-bottom: 1rem;
  align-items: flex-start;
`

export const ProfileImageContainer = styled('div')`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-top: 4px;
  flex-shrink: 0;
`

export const TitleContainer = styled('div')`
  flex-grow: 1;
`
