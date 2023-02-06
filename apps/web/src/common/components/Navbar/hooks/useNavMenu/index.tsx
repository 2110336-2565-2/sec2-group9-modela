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
const useNavMenu = (isMobile: boolean) => {
  const router = useRouter()
  const user = useUser()

  const VERIFIED_MENU = [
    {
      label: 'สร้างงาน',
      onClick: () => router.push(''),
      icon: <PostAddOutlined />,
      mobileOnly: true,
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
  ]

  const getMenuByUser = () => {
    if (!user)
      return VERIFIED_MENU.filter(
        (item) => item.allowNotLoggedIn || item.onlyNotLoggedIn,
      )
    if (!user.isVerified)
      return VERIFIED_MENU.filter(
        (item) => item.allowNotVerified && !item.onlyNotLoggedIn,
      )
    return VERIFIED_MENU.filter((item) => !item.onlyNotLoggedIn)
  }

  const getMenuByScreenSize = (isMobile: boolean) => {
    if (isMobile) return getMenuByUser().filter((item) => !item.desktopOnly)
    return getMenuByUser().filter((item) => !item.mobileOnly)
  }

  return getMenuByScreenSize(isMobile)
}

export default useNavMenu
