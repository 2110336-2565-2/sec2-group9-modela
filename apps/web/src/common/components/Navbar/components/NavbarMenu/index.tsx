import { Drawer, Typography } from '@mui/material'
import { useLayout } from 'common/context/LayoutContext'
import Link from 'next/link'
import React from 'react'

import useNavMenu from '../../hooks/useNavMenu'
import NavbarProfile from '../NavbarProfile'
import { MenuItem } from './styled'
import { NavbarMenuProps } from './types'

const NavbarMenu = ({ isOpen, onClose }: NavbarMenuProps) => {
  const menu = useNavMenu(true)
  const { navbarFocus } = useLayout()

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: '12px 12px 0 0' } }}
    >
      <NavbarProfile />
      {menu.map(({ label, icon, onClick, focusKey, href }, idx) => {
        if (label === 'divider') return null
        return (
          <MenuItem
            key={idx}
            onClick={onClick}
            sx={{
              backgroundColor:
                !!focusKey && navbarFocus === focusKey ? '#C3DCF14D' : 'white',
            }}
          >
            {icon}
            <Typography variant="subtitle2">
              {typeof href !== 'undefined' ? (
                <Link
                  href={href}
                  passHref
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {label}
                </Link>
              ) : (
                <>{label}</>
              )}
            </Typography>
          </MenuItem>
        )
      })}
    </Drawer>
  )
}

export default NavbarMenu
