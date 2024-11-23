import { auth } from '@/auth'
import { getChallenge } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'

const Results = async ({
  params,
  searchParams,
}: {
  params: Promise<{ challengeId: string }>
  searchParams: Promise<{ try: string | undefined }>
}) => {
  const session = await auth()
  if (!session) notFound()
  const challengeId = (await params).challengeId
  if (!challengeId) return notFound()
  const ties = parseInt((await searchParams).try || '')

  const { error, challenge } = await getChallenge(session.user?.id, challengeId)
  if (error) return notFound()
  if (!challenge) return notFound()
  if (challenge.status === 'active') return notFound()

  return <div>{JSON.stringify(challenge.tries[ties - 1 || 0])}</div>
}

export default Results
