import { styled } from '@mui/material'

export const PageContainer = styled('form')`
  display: flex;
  margin: 50px;
  width: 100%;
  gap: 64px;
  align-items: flex-start;
  justify-content: center;
  max-width: 1200px;

  ${(props) => props.theme.breakpoints.down('lg')} {
    flex-direction: column;
    margin: 0;
    align-items: stretch;
    gap: 10px;
  }
`

export const JobCardContainer = styled('div')`
  flex-grow: 1;
  ${(props) => props.theme.breakpoints.down('lg')} {
    padding: 0 30px;
    width: 100%;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 0 15px;
  }
`
