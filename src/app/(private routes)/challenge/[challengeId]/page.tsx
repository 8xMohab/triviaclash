import React from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ challengeId: string }>
}) {
  const challengeId = (await params).challengeId

  return <div>Quiz is {challengeId}</div>
}
