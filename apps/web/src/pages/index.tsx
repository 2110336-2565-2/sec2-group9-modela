import { Button, Typography } from '@mui/material'
import useNavbarFocus from 'common/hooks/useNavbarFocus'

export default function Web() {
  useNavbarFocus('jobs')
  return (
    <div>
      <Typography variant="body1">Web</Typography>
      <Button />
    </div>
  )
}
