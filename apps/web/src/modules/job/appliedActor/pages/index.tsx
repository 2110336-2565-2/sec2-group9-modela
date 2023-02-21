import { UserType } from '@modela/database'
import withGuard from 'common/hoc/withGuard'
import JobMenu from 'modules/job/components/JobMenu'
import React from 'react'

import ActorCard from '../components/ActorCard'

const AppliedActorPage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <JobMenu focus="actor" />
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <ActorCard
          actorId={1}
          firstName="Kamisato"
          middleName="<3"
          lastName="ayaka"
          resumeId={1}
          profileImageUrl="https://scontent.fbkk2-5.fna.fbcdn.net/v/t39.30808-6/243067731_1753991538324298_8549916390031069303_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGOiantr4gmA__aELbBell7z3COCiw7G_3PcI4KLDsb_aVljn1eDTloh_XRoaEiT1vKWCUIeLOsKth6PQUE03RL&_nc_ohc=WHo8vkvstu0AX_z-kTZ&_nc_ht=scontent.fbkk2-5.fna&oh=00_AfA74rjO2nkYU9T3j5jIDcL2Zq4VcszLZl1ui6qccfnJjw&oe=63F8F743"
        />
      </div>
    </div>
  )
}

export default withGuard(AppliedActorPage, 'verified', [UserType.CASTING])
