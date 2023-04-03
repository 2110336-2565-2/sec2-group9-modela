import { styled } from '@mui/material'

export const PageContainer = styled('form')`
  display: flex;
  margin: 50px;
  width: 100%;
  gap: 64px;
  align-items: flex-start;
  max-width: 1200px;

  ${(props) => props.theme.breakpoints.down('lg')} {
    flex-direction: column;
    margin: 0px;
    gap: 0px;
    align-items: stretch;
  }
`

export const TabletContainer = styled('div')`
  display: flex;
  gap: 64px;
  flex-grow: 1;
  height: 100%;

  ${(props) => props.theme.breakpoints.down('lg')} {
    margin: 25px 30px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    margin: 15px 15px;
  }
`

export const CardsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-grow: 1;

  ${(props) => props.theme.breakpoints.down('sm')} {
    gap: 16px;
  }
`
