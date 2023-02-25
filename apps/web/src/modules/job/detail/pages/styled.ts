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
    gap: 0px;
  }
`

export const JobCardContainer = styled('div')`
  flex-grow: 1;
  max-width: 800px;

  ${(props) => props.theme.breakpoints.down('lg')} {
    margin-top: 10px;
    padding: 20px;
    width: 100%;
    align-self: center;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 10px 15px;
  }
`
