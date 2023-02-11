import { styled } from '@mui/material'

export const FIlterPage = styled('div')`
  display: none;
  flex-direction: row;
  justify-content: center;
  padding-top: 3rem;
  width: 110%;
  height: 140%;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: none;
  }
`
export const FilterPageFilterBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-top: 10rem;
  margin: 3rem;
  width: 80vw;
  gap: 1rem;
`
