import { auth } from '@/auth'
import { getActiveChallenge } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'
import Questions from './questions'

export default async function Page({
  params,
}: {
  params: Promise<{ challengeId: string }>
}) {
  const session = await auth()
  if (!session) notFound()
  const challengeId = (await params).challengeId
  if (!challengeId) return notFound()

  const { error, challenge } = await getActiveChallenge(session.user?.id, challengeId)
  if (error) return notFound()
  if (!challenge) return notFound()
  if (challenge.status !== 'active') return notFound()

  return <Questions challenge={challenge} challengeId={challengeId} />
}
