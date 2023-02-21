import { styled } from '@mui/material'

export const ModalContainer = styled('div')`
  margin: 40px 30px;
  width: 100%;

  ${(props) => props.theme.breakpoints.down('sm')} {
    margin: 25px 15px;
  }
`
