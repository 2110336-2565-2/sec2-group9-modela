import { styled } from '@mui/material'

export const PageContainer = styled('div')`
  display: flex;
  width: 100%;
  margin: 20px;
  margin-top: 40px;
  gap: 36px;
  align-items: flex-start;
  justify-content: center;

  ${(props) => props.theme.breakpoints.down('lg')} {
    flex-direction: column;
    margin: 0;
    align-items: stretch;
    margin-top: 20px;
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
export const SideDiv = styled('div')`
  width: 17vw;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    display: none;
  }
`
