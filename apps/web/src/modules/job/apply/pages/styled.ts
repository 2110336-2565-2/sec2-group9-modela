import { styled } from '@mui/material'

export const RootContainer = styled('form')`
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  width: 40vw;
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 90vw;
  }
`

export const CardContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
  gap: 16px;
  width: 100%;
  height: fit-content;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 16px;
  ${(props) => props.theme.breakpoints.down('md')} {
    padding: 8px;
  }
`
