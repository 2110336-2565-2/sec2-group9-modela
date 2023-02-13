import { Card, styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10vw;
  width: 100%;
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
    text-align: center;
  }

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
  width: 100%;
  max-width: 490px;
  border-radius: 10px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    text-align: center;
  }
  padding: ${({ theme }) => theme.spacing(3)};
  gap: ${({ theme }) => theme.spacing(3)};
`

export const CardButtonContainer = styled('div')`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(5)};
`

export const CardButtonSection = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const ImageContainer = styled('div')`
  position: relative;
  width: 100%;
  padding-top: 100%;
`
