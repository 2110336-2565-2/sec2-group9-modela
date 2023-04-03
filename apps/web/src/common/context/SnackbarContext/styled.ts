import { Alert, styled } from '@mui/material'
export const CustomAlert = styled(Alert)(
  ({ theme, severity }) =>
    typeof severity === 'string' &&
    `
      border: 1px solid;
      border-radius: 16px;
      padding: 8px;
      color: ${theme.palette[severity].main};
      border-color: ${theme.palette[severity].main}
    `,
)
