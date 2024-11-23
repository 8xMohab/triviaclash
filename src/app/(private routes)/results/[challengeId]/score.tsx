'use client'
import { ChallengeSubsetType } from '@/lib/models/schemas/challenge'
import { validateTryParam } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Score = ({ challenge }: { challenge: ChallengeSubsetType }) => {
  const searchParams = useSearchParams()
  const tryParam = searchParams.get('try')
  const tryNumber = validateTryParam(tryParam || '', challenge.tries.length)
  const tryAnswers = challenge.tries[tryNumber]
  let score = 0
  challenge.questions.map(({ correct_answer }, index) => {
    if (correct_answer === tryAnswers[index]) score += 1
  })
  return (
    <div>
      Score: {score}/{challenge.questions.length}
    </div>
  )
}

export default Score
