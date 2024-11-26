import { auth } from '@/auth'
import { getChallenge } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'
import QuestionsResult from './results'
import Score from './score'

const Results = async ({
  params,
}: {
  params: Promise<{ challengeId: string | undefined }>
  searchParams: Promise<{ try: string | undefined }>
}) => {
  const session = await auth()
  if (!session) notFound()

  const challengeId = (await params)?.challengeId
  if (!challengeId) return notFound()

  const { error, challenge } = await getChallenge(session.user?.id, challengeId)
  if (error) return notFound()
  if (!challenge) return notFound()
  if (challenge.status === 'active') return notFound()

  return (
    <main className='mt-16 space-y-8 mb-16'>
      <Score challenge={challenge} />
      <QuestionsResult challenge={challenge} />
    </main>
  )
}

export default Results
