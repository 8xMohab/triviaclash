'use client'
import { ChallengeSubsetType } from '@/lib/models/schemas/challenge'
import { validateTryParam } from '@/lib/utils'
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { activateChallenge } from '@/lib/actions'

const Score = ({ challenge }: { challenge: ChallengeSubsetType }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tryParam = searchParams.get('try')
  const tryNumber = validateTryParam(tryParam || '', challenge.tries.length)
  if (challenge.tries.length === 0) return notFound()
  const tryAnswers = challenge.tries[tryNumber]
  let score = 0
  challenge.questions.map(({ correct_answer }, index) => {
    if (correct_answer === tryAnswers[index]) score += 1
  })
  const scorePercentage = score / challenge.questions.length
  let feedbackMessage

  switch (true) {
    case scorePercentage >= 0.9:
      feedbackMessage = "Congratulations! You've achieved an amazing score! 🎉"
      break
    case scorePercentage >= 0.5:
      feedbackMessage =
        'Good job! You did well, keep practicing to get even better! 👍'
      break
    default:
      feedbackMessage = "Don't worry, keep trying! You'll get there! 💪"
  }

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
  }
  return (
    <div>
      <Card className="md:w-96 text-center m-auto mb-16 space-y-4">
        <CardHeader className="space-y-4">
          <CardTitle>
            Score: {score}/{challenge.questions.length}
          </CardTitle>
          <CardDescription>{feedbackMessage}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex items-center justify-center flex-col">
          <label htmlFor="select-attempt">Select Attempt</label>
          <Select
            value={(tryNumber + 1).toString()}
            name="select-attempt"
            onValueChange={(value) =>
              router.push(pathname + '?' + createQueryString('try', value))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Attempt" />
            </SelectTrigger>
            <SelectContent>
              {challenge.tries.map((tryNum, index) => (
                <SelectItem
                  key={`tryParam:${index}`}
                  value={(index + 1).toString()}
                >
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link href="/challenge">
            <Button>Start New</Button>
          </Link>
          <Button
            variant="secondary"
            onClick={() => activateChallenge(challenge.id)}
          >
            Try Again
          </Button>
          <Link href="/home">
            <Button variant="outline" className="bg-card">
              Back Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Score
