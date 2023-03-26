import { Card, styled } from '@mui/material'

export const HeaderContainer = styled('div')`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`

export const CardContainer = styled(Card)`
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 70%;
  }
  border-radius: 12px;
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 40vw;
  max-width: 500px;
  height: fit-content;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  justify-content: space-between;
`

export const FooterContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`
