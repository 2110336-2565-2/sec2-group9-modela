import { Card, styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10vw;
  padding: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

export const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;

  ${({ theme }) => theme.breakpoints.down('md')} {
    align-items: center;
    justify-content: center;
  }
`

export const CardContainer = styled(Card)`
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: right;
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(3)};
  gap: ${({ theme }) => theme.spacing(3)};
`

export const CardButtonContainer = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacing(5)};
`

export const CardButtonSection = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`
