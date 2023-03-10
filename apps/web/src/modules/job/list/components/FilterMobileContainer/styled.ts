import { styled } from '@mui/material'

export const FilterPage = styled('div')`
  display: none;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  background-color: white;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: none;
  }
`
export const FilterPageFilterBox = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 1rem;
  width: 80vw;
  gap: 1rem;
`
