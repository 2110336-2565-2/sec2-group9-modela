import { styled } from '@mui/material'

export const CardsContainer = styled('div')`
  ${(props) => props.theme.breakpoints.down('md')} {
    padding: 15px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  gap: 1rem;
  margin-top: 2rem;
  flex-grow: 1;
`
