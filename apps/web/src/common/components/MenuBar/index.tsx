import React from 'react'

import { MenuContainer, MenuItem } from './styled'
import { MenuBarProps } from './types'

const MenuBar = ({ menu, focus, sx }: MenuBarProps) => {
  return (
    <MenuContainer variant="outlined" sx={sx}>
      {menu.map(({ icon, label, href }) => (
        <MenuItem href={href} isFocused={label === focus} key={label}>
          {icon} {label}
        </MenuItem>
      ))}
    </MenuContainer>
  )
}

export default MenuBar
