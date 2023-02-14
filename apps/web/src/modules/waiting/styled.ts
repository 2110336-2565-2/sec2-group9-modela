import { Card, Divider, styled } from '@mui/material'

export const RootContainer = styled('div')`
  padding: ${({ theme }) => theme.spacing(3)};
  gap: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  ${(props) => props.theme.breakpoints.down('md')} {
    justify-content: center;
    height: auto;
  }
  align-items: center;
  height: fit-content;
`

export const CardDivider = styled(Divider)`
  width: 100%;
`

export const CardContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing(2.5)};
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 400px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`
