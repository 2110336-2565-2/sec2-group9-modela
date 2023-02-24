import { Theme, useMediaQuery } from '@mui/material'
import React from 'react'

import { MenuContainer, MenuItem } from './styled'
import { MenuBarProps } from './types'

const MenuBar = ({ menu, focus, sx }: MenuBarProps) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return (
    <MenuContainer variant="outlined" sx={sx}>
      {menu.map(({ icon, label, href }) => (
        <MenuItem href={href} isFocused={label === focus} key={label}>
          {!isTablet && icon} {label}
        </MenuItem>
      ))}
    </MenuContainer>
  )
}

export default MenuBar
