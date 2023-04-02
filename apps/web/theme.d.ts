declare global {
  declare module '@mui/material/styles' {
    interface Palette {
      reject: Palette['primary']
    }

    interface PaletteOptions {
      reject?: PaletteOptions['primary']
    }
  }

  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      reject: true
    }
  }

  declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
      reject: true
    }
  }
}
