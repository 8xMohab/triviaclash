import { auth } from '@/auth'
import { getChallenge } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'
import QuestionsResult from './results'

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


  return <QuestionsResult challenge={challenge} />
}

export default Results
