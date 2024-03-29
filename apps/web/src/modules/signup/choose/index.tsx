import {
  Button,
  Divider,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import Image from 'next/image'
import Link from 'next/link'
import ActorImage from 'public/actor.svg'
import CastingImage from 'public/casting.svg'

import {
  CardButtonContainer,
  CardButtonSection,
  CardContainer,
  HeaderContainer,
  ImageContainer,
  RootContainer,
} from './styled'

const ChooseSignup = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  return (
    <RootContainer>
      <HeaderContainer>
        <Typography color="primary" variant={isMobile ? 'h3' : 'h2'}>
          Modela
        </Typography>
        <Typography color="#00000080" variant="h5">
          Platform หางานสำหรับนักแสดง
        </Typography>
      </HeaderContainer>
      <CardContainer variant="outlined">
        <Typography variant="h5">ต้องการสมัครสมาชิกในฐานะ</Typography>
        <Divider sx={{ width: '100%' }} />
        <CardButtonContainer>
          <CardButtonSection>
            <ImageContainer>
              <Image src={ActorImage} alt="actor" fill />
            </ImageContainer>
            <Link
              passHref
              href="/signup/actor"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Button fullWidth variant="contained">
                <Typography variant="button">นักแสดง</Typography>
              </Button>
            </Link>
          </CardButtonSection>
          <CardButtonSection>
            <ImageContainer>
              <Image src={CastingImage} alt="casting" fill />
            </ImageContainer>
            <Link
              passHref
              href="/signup/casting"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Button fullWidth variant="contained">
                <Typography variant="button">ผู้กำกับ</Typography>
              </Button>
            </Link>
          </CardButtonSection>
        </CardButtonContainer>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          มีบัญชีอยู่แล้ว ?{' '}
          <Link href="/login" passHref style={{ textDecoration: 'none' }}>
            <Typography variant="subtitle1" color="primary" component="span">
              เข้าสู่ระบบ
            </Typography>
          </Link>
        </Typography>
      </CardContainer>
    </RootContainer>
  )
}

export default withGuard(ChooseSignup, 'notLoggedIn')
