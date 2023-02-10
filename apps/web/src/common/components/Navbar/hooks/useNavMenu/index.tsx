import { UserType } from '@modela/dtos'
import {
  AccountCircleOutlined,
  ArticleOutlined,
  LoginOutlined,
  LogoutOutlined,
  NotificationsNoneOutlined,
  PostAddOutlined,
} from '@mui/icons-material'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

const useNavMenu = (isMobile: boolean) => {
  const router = useRouter()
  const { user } = useUser()

  const VERIFIED_MENU = useMemo(
    () => [
      {
        label: 'สร้างงาน',
        onClick: () => router.push(''),
        icon: <PostAddOutlined />,
        mobileOnly: true,
        focusKey: 'createJob',
        castingOnly: true,
      },
      {
        label: 'งานของฉัน',
        onClick: () => router.push(''),
        icon: <ArticleOutlined />,
        focusKey: 'jobs',
      },
      {
        label: 'การแจ้งเตือน',
        onClick: () => router.push(''),
        icon: <NotificationsNoneOutlined />,
        focusKey: 'notification',
      },
      {
        label: 'divider',
        desktopOnly: true,
        allowNotVerified: true,
        allowNotLoggedIn: true,
      },
      {
        label: 'โปรไฟล์',
        onClick: () => router.push(''),
        icon: <AccountCircleOutlined />,
        focusKey: 'profile',
      },
      {
        label: `สวัสดี คุณ ${user?.firstName}`,
        desktopOnly: true,
        allowNotVerified: true,
      },
      {
        label: 'ออกจากระบบ',
        onClick: () => {
          //TODO Implement logout logic
        },
        icon: <LogoutOutlined />,
        allowNotVerified: true,
      },
      {
        label: 'เข้าสู่ระบบ',
        onClick: () => router.push('/login'),
        icon: <LoginOutlined />,
        allowNotVerified: true,
        onlyNotLoggedIn: true,
      },
    ],
    [router, user?.firstName],
  )

  const getMenuByUser = useCallback(() => {
    if (!user)
      return VERIFIED_MENU.filter(
        (item) => item.allowNotLoggedIn || item.onlyNotLoggedIn,
      )
    if (!user.isVerified)
      return VERIFIED_MENU.filter(
        (item) => item.allowNotVerified && !item.onlyNotLoggedIn,
      )
    return VERIFIED_MENU.filter((item) => !item.onlyNotLoggedIn)
  }, [VERIFIED_MENU, user])

  const getMenuByRole = useCallback(() => {
    if (user?.type !== UserType.CASTING)
      return getMenuByUser().filter((item) => !item.castingOnly)
    return getMenuByUser()
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
