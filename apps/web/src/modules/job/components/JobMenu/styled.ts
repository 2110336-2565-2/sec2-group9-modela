import { Button, styled } from '@mui/material'

export const MenuContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: -10px;

  ${(props) => props.theme.breakpoints.down('lg')} {
    margin-top: 45px;
    flex-direction: row;
    justify-content: space-between;
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: center;
    gap: 0px;
  }
`

export const SummaryContainer = styled('div')`
  ${(props) => props.theme.breakpoints.down('lg')} {
    margin: 10px 30px 0 30px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    margin: 8px 15px;
  }
`

export const StatusButton = styled(Button)`
  border-radius: 12px;
  width: 100%;
  font-size: 16px;
  ${(props) => props.theme.breakpoints.down('lg')} {
    width: 35%;
    margin: 10px 30px 0 30px;
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
    width: 90%;
    margin: 0;
  }
`
