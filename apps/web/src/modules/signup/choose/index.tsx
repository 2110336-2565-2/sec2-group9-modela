import { Button, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import ActorImage from 'public/actor.png'
import CastingImage from 'public/casting.png'

import {
  CardButtonContainer,
  CardButtonSection,
  CardContainer,
  RootContainer,
} from './styled'

const ChooseSignup = () => {
  return (
    <RootContainer>
      <Typography color="primary" variant="h3">
        Modela
      </Typography>
      <Typography color="#00000080" variant="h5">
        Platform หางานสำหรับนักแสดง
      </Typography>
      <CardContainer>
        <Typography variant="h5">ต้องการสมัครสมาชิกในฐานะ</Typography>
        <Divider sx={{ width: '100%' }} />
        <CardButtonContainer>
          <CardButtonSection>
            <Image src={ActorImage} alt="actor" />
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
            <Image src={CastingImage} alt="casting" />
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
            <Typography variant="subtitle1" color="primary">
              เข้าสู่ระบบ
            </Typography>
          </Link>
        </Typography>
      </CardContainer>
    </RootContainer>
  )
}

export default ChooseSignup
