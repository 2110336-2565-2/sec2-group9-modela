import { styled } from '@mui/material'

export const PageContainer = styled('form')`
  display: flex;
  margin: 50px;
  width: 100%;
  gap: 64px;
  align-items: flex-start;
  justify-content: center;
  max-width: 1200px;

  ${(props) => props.theme.breakpoints.down('md')} {
    margin: 40px 30px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    margin: 25px 15px;
  }
`

export const JobCardContainer = styled('div')`
  width: 50vw;
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 90vw;
  }
`
