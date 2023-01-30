import Header from 'common/components/header'
import { useRouter } from 'next/router'
import React from 'react'

export default function JobDetail() {
  const router = useRouter()
  const { jid } = router.query

  return (
    <>
      <Header />
      <p>test: {jid}</p>
    </>
  )
}
