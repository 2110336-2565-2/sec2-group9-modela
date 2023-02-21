import { styled } from '@mui/material'

export const PageContainer = styled('div')`
  display: flex;
  margin: 50px;
  width: 100%;
  gap: 64px;
  align-items: flex-start;

  ${(props) => props.theme.breakpoints.down('md')} {
    margin: 40px 30px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    margin: 25px 15px;
  }
`
export const CardsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex-grow: 1;

  ${(props) => props.theme.breakpoints.down('sm')} {
    gap: 24px;
  }
`
