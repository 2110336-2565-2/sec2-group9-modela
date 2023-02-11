import { styled } from '@mui/material'

export const SearchContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`

export const NotiContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 3rem;
  width: 20vw;
  gap: 1rem;
  ${(props) => props.theme.breakpoints.down('lg')} {
    display: none;
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`

export const JobContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 3rem;
  width: 45vw;
  gap: 1rem;
  ${(props) => props.theme.breakpoints.down('lg')} {
    width: 60vw;
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 95vw;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
  }
`

export const FilterBoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding-top: 3rem;
  width: 14vw;
  gap: 1rem;
  ${(props) => props.theme.breakpoints.down('lg')} {
    width: 19vw;
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`
export const FIlterPage = styled('div')`
  display: none;
  flex-direction: row;
  justify-content: center;
  padding-top: 3rem;
  width: 100%;
  height: 100%;
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
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-top: 3rem;
  width: 80vw;
  gap: 1rem;
`
