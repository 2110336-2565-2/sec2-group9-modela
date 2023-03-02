import { Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 30px;
  width: 35vw;
  min-width: 450px;
  min-height: 300px;
  border-radius: 10px;
  gap: 16px;
`
export const ContentContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 100%;
  height: fit-content;
  gap: 16px;
  border: none;
`
export const SubContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: fit-content;
  gap: 16px;
  border: none;
`
export const RootContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 3.5vw;
  margin: 20px;
`
export const PlaceFill = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding-top: 3rem;
  width: 14vw;
  ${(props) => props.theme.breakpoints.down('lg')} {
    display: none;
  }
`
