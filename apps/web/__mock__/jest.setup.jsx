import { ThemeProvider } from '@mui/material'
import theme from 'common/config/theme'

jest.doMock('common/hooks/useErrorHandler', () => ({
  useErrorHandler: () => ({ handleError: jest.fn() }),
}))

jest.doMock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

jest.doMock('@testing-library/react', () => {
  const jestActual = jest.requireActual('@testing-library/react')
  return {
    ...jestActual,
    render: (ui, options) => {
      const { container, ...rest } = jestActual.render(ui, {
        wrapper: ({ children }) => (
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ),
        ...options,
      })

      return {
        container: container.firstChild,
        ...rest,
      }
    },
  }
})
