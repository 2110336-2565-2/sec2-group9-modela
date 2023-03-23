import { UserStatus } from '@modela/database'
import { UserType } from '@modela/dtos'
import {
  AccountBalanceWalletOutlined,
  AccountCircleOutlined,
  ArticleOutlined,
  LoginOutlined,
  LogoutOutlined,
  NotificationsNoneOutlined,
  PersonAddAltOutlined,
  PostAddOutlined,
} from '@mui/icons-material'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

const useNavMenu = (isMobile: boolean) => {
  const router = useRouter()
  const { user, reset } = useUser()
  const { handleError } = useErrorHandler()

  const handleLogout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout')
      reset()
      router.push('/login')
    } catch (err) {
      handleError(err)
    }
  }, [handleError, reset, router])

  const VERIFIED_MENU = useMemo(
    () => [
      {
        label: 'สร้างงาน',
        href: '/job/post',
        icon: <PostAddOutlined />,
        mobileOnly: true,
        focusKey: 'createJob',
        castingOnly: true,
      },
      {
        label: 'งานของฉัน',
        href: '/job/applied',
        icon: <ArticleOutlined />,
        focusKey: 'jobs',
        notAdmin: true,
      },
      {
        label: 'การแจ้งเตือน',
        href: '/',
        icon: <NotificationsNoneOutlined />,
        focusKey: 'notification',
        notAdmin: true,
      },

      // admin
      {
        label: 'คำขอสมัครสมาชิก',
        href: '/account',
        icon: <PersonAddAltOutlined />,
        focusKey: 'account',
        adminOnly: true,
      },
      {
        label: 'งานทั้งหมด',
        href: '/job',
        icon: <ArticleOutlined />,
        focusKey: 'jobs',
        adminOnly: true,
      },
      {
        label: 'รายการธุรกรรม',
        href: '/transaction',
        icon: <AccountBalanceWalletOutlined />,
        focusKey: 'transaction',
        adminOnly: true,
      },

      // right part
      {
        label: 'divider',
        desktopOnly: true,
        allowNotVerified: true,
        allowNotLoggedIn: true,
      },
      {
        label: 'โปรไฟล์',
        href: '/profile',
        icon: <AccountCircleOutlined />,
        focusKey: 'profile',
        notAdmin: true,
      },
      {
        label: `สวัสดี คุณ ${user?.firstName}`,
        desktopOnly: true,
        allowNotVerified: true,
      },
      {
        label: 'ออกจากระบบ',
        onClick: () => {
          handleLogout()
        },
        icon: <LogoutOutlined />,
        allowNotVerified: true,
        desktopIconOnly: true,
      },
      {
        label: 'เข้าสู่ระบบ',
        href: '/login',
        icon: <LoginOutlined />,
        allowNotVerified: true,
        onlyNotLoggedIn: true,
        desktopIconOnly: true,
      },
    ],
    [handleLogout, user?.firstName],
  )

  const getMenuByUser = useCallback(() => {
    if (!user)
      return VERIFIED_MENU.filter(
        (item) => item.allowNotLoggedIn || item.onlyNotLoggedIn,
      )
    if (user.status !== UserStatus.ACCEPTED)
      return VERIFIED_MENU.filter(
        (item) => item.allowNotVerified && !item.onlyNotLoggedIn,
      )
    return VERIFIED_MENU.filter((item) => !item.onlyNotLoggedIn)
  }, [VERIFIED_MENU, user])

  const getMenuByRole = useCallback(() => {
    let users = getMenuByUser()
    if (user?.type !== UserType.CASTING)
      users = users.filter((item) => !item.castingOnly)
    if (user?.type === UserType.ADMIN)
      users = users.filter((item) => !item.notAdmin)
    if (user?.type !== UserType.ADMIN)
      users = users.filter((item) => !item.adminOnly)

    return users
  }, [getMenuByUser, user?.type])

  const getMenuByScreenSize = useCallback(
    (isMobile: boolean) => {
      if (isMobile) return getMenuByRole().filter((item) => !item.desktopOnly)
      return getMenuByRole().filter((item) => !item.mobileOnly)
    },
    [getMenuByRole],
  )

  const result = useMemo(
    () => getMenuByScreenSize(isMobile),
    [getMenuByScreenSize, isMobile],
  )

  return result
}

export default useNavMenu
