import { Card, styled } from '@mui/material'

export const CardContainer = styled(Card)`
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 25vw;
  height: fit-content;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  justify-content: space-between;
`
