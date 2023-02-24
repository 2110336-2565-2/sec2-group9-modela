import { Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  display: flex;
  justify-content: center;
  height: fit-content;
  padding: 16px;
  width: 100%;
  max-width: 500px;
  min-height: 300px;
  border-radius: 10px;
`

export const RootContainer = styled('div')`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin: 20px;
`

export const SideDiv = styled('div')`
  width: 15vw;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    display: none;
  }
`
