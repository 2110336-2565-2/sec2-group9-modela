import { useLayout } from 'common/context/LayoutContext'
import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/logo.svg'
import React from 'react'

import useNavMenu from '../../hooks/useNavMenu'
import { NavbarContainer, NavbarItem } from './styled'

const NavbarDesktop = () => {
  const { navbarFocus } = useLayout()
  const menu = useNavMenu(false)

  return (
    <NavbarContainer>
      <Link href="/" passHref style={{ display: 'flex' }}>
        <Image src={logo} alt="logo" width={108} height={48} />
      </Link>
      {menu.map(({ label, onClick, focusKey, icon, desktopIconOnly }, idx) => {
        if (label === 'divider')
          return <div style={{ flexGrow: 1 }} key={idx} />
        return (
          <NavbarItem
            focus={!!focusKey && navbarFocus === focusKey}
            onClick={onClick}
            key={idx}
            sx={{
              pointerEvents: onClick ? 'auto' : 'none',
            }}
          >
            {desktopIconOnly && icon}
            {label}
          </NavbarItem>
        )
      })}
    </NavbarContainer>
  )
}

export default NavbarDesktop
